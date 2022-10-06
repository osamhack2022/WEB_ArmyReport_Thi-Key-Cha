import React, { useRef, useState } from 'react'

import db from '../../database/DB_Manager';
import { addDoc, collection } from 'firebase/firestore';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Post } from './PostViewer';

/**
 * TODO:
 * PostLetter validation 검증 로직 마무리
 * PostLetter의 데이터가 잘 들어가는지 확인
 * 
 * 나머지 PostSuggest나 PostViwer에서 부족한 부분도 보충해야함.
 * 스타일 역시 디자인해야하고.
 * mui에서 컴포넌트로 디자인하기
 */

class Letter extends Post  {
  /**
   * @param content the contents of a letter of one's heart
   * @param victim user's name
   * @param attacker the person who hit the user
   */
  constructor(attacker, victim, content) {
    super(victim, content);
    this.attacker = attacker;
  }
}

const PostLetter = () => {
  const [letter, setLetter] = useState({
    attacker: "",
    victim: "",
    content: "",
  })

  const onSaveLetter = async (attacker, victim, content) => {
    const newLetter = new Letter(
      attacker,
      victim,
      content
    )

    try {
      const docRef = await addDoc(collection(db, "post-letters"), {...newLetter});
      if (docRef.id) toast.success("🦄 슈웅 ! 마음의 편지를 보냈습니다.")
    } catch (e) {
      console.log(e);
    }
  }

  const onConfirmSave = () => {
    if (letter.victim && letter.attacker && letter.content) { // 마음의 편지의 내용이 공백이 아니라면
      onSaveLetter(letter);
    }
  }

  const handleChange = (e) => {
    setLetter(prev => ({...prev, [e.target.name]:e.target.value}))
  }

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
      <button onClick={onConfirmSave}>
          전송
      </button>
      <ToastContainer/>
      </div>
    </>
  )
}

export default PostLetter;