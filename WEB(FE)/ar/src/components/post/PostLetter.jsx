import React, { useRef, useState } from 'react'

import db from '../../database/DB_Manager';
import { addDoc, collection } from 'firebase/firestore';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/**
 * TODO:
 * PostLetter validation 검증 로직 마무리
 * PostLetter의 데이터가 잘 들어가는지 확인
 * 
 * 나머지 PostSuggest나 PostViwer에서 부족한 부분도 보충해야함.
 * 스타일 역시 디자인해야하고.
 * mui에서 컴포넌트로 디자인하기
 */

class Letter {
  /**
   * @param content the contents of a letter of one's heart
   * @param victim user's name
   * @param attacker the person who hit the user
   */
  constructor(attacker, content) {
    this.userId = Math.random().toString().slice(2);
    this.userName = 'username'
    this.attacker = attacker;
    this.content = content;
    this.date = new Intl.DateTimeFormat('kr', {dateStyle: 'full', timeStyle: 'short'}).format(new Date());
  }
}

const PostLetter = () => {
  const [letter, setLetter] = useState({
    attacker: "",
    content: "",
    err: ""
  })

  const onSaveLetter = async (attacker, content) => {
    const newLetter = new Letter(
      attacker,
      content
    )

    console.log({...newLetter})

    try {
      const docRef = await addDoc(collection(db, "post-letters"), {...newLetter});
      if (docRef.id) toast.success("🦄 슈웅 ! 마음의 편지를 보냈습니다.")
    } catch (e) {
      console.log(e);
    }
  }

  const onConfirmSave = () => {
    if (letter.attacker && letter.content) {
      onSaveLetter(letter.attacker, letter.content);
    }
  }

  const setLetterErrorMsg = (str) => {
    letter.err = str;
    return letter.err
  }

  const handleChange = (e) => {
    setLetter(prev => ({...prev, [e.target.name]:e.target.value}))
    console.log(letter);
  }

  const validateAttacker = () => {
    if (!letter.attacker) {
      return setLetterErrorMsg('정확히 누구인지 작성해주세요.');
    } else if (letter.attacker.length < 2) {
      return setLetterErrorMsg('이름은 최소 1자 이상입니다.')
    }
  }

  const validateContent = () => {
    if (!letter.content) {
      return setLetterErrorMsg('내용은 필수 기입란 입니다.')
    } else if (letter.content.length > 1000) {
      return setLetterErrorMsg('내용은 1000자 이내로 작성해야 합니다.')
    }
  }

  return(
    <>
    <div className="PostLetterInput">
      <input type="text" name="attacker" onChange={handleChange} placeholder='누가' required/>
      {validateAttacker() && <small role="alert">{validateAttacker()}</small>}
      
      <input
        name="content"
        onChange={handleChange}
        type="text"
        maxLength={1000}
        autoComplete="off"
        placeholder='1000자 이내로 작성해주세요!'
        required
      />
      {validateContent() && <small role="alert">{validateContent()}</small>}
      <button onClick={onConfirmSave}>전송</button>
      <ToastContainer/>
      </div>
    </>
  )
}

export default PostLetter;