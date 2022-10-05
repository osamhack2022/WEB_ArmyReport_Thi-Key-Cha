import React, { useRef, useState } from 'react'

import db from '../../database/DB_Manager';
import { getDoc, addDoc, collection } from 'firebase/firestore';

// interface ILetter {
//   userid: string,
//   attacker: string,
//   victim: string,
//   content: string,
//   createdAt: Date
// }

class Letter  {
  /**
   * @param content the contents of a letter of one's heart
   * @param victim user's name
   * @param attacker the person who hit the user
   */
  constructor(attacker="<who>", victim="<me>", content) {
    this.userid = Math.random();
    this.attacker = attacker;
    this.victim = victim;
    this.content = content;
    this.createdAt = new Intl.DateTimeFormat('kr', {dateStyle: 'full', timeStyle: 'short'}).format(new Date());
  }
}

const LetterInput = () => {
  const [letter, setLetter] = useState({
    attacker: "",
    victim: "",
    content: "",
  })

  const onAddLetter = async (attacker, victim, content) => {
    const newLetter = new Letter(
      attacker,
      victim,
      content
    )

    const docRef = await addDoc(collection(db, "posts", "letters", victim), {...newLetter});
    console.log("Document written with ID: ", docRef.id);
  }

  const onConfirm = async () => {
    if (victim && attacker && content) { // 마음의 편지의 내용이 공백이 아니라면
      try {
        await onAddLetter(attacker, victim, content);
      } catch (e) {
        console.log(e)
      }
    }
  }

  const handleChange = (e) => {
    setLetter(prev => ({...prev, [e.target.name]:e.target.value}))
  }

  console.log(letter);

  return(
    <>
    <div className="PostLetterInput">
      <input type="text" name="victim" onChange={handleChange} placeholder='작성자'/>
      <input type="text" name="attacker" onChange={handleChange} placeholder='누가'/>
      <input
        name="content"
        onChange={handleChange}
        type="text"
        maxLength={1000}
        autoComplete="off"
        placeholder='1000자 이내로 작성해주세요!'
        required
      />
      <button onClick={onConfirm}>
          전송
      </button>
      </div>
    </>
  )
}

export default LetterInput;