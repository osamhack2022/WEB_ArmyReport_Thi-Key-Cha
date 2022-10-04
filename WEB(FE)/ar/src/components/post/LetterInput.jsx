import React, { useRef, useState } from 'react'

const LetterInput = () => {
  const db = [];

  const [letterContent, setLetterContent] = useState('');
  const [letterList, setLetterList] = useState([{
    content: ''
  }]);

  const onSaveLetter = (content) => {
    const { userId, userName } = db;

    setLetterList((letterList) => {
      return [...letterList, content]
    })
  }

  const onConfirmSave = async () => {
    if (letterContent) { // 마음의 편지의 내용이 공백이 아니라면
      try {
        await onSaveLetter(letterContent)
      } catch (e) {
        console.log(e)
      }
    }
  }

  const onChangeContent = (e) => {
    setLetterContent(e.target.value) // 마음의 편지의 내용을 저장
  }

  return(
    <>
    <div className="PostLetterInput">
      <input
        onChange={onChangeContent}
        type="text"
        maxLength={1000}
        autoComplete="off"
        placeholder='1000자 이내로 작성해주세요!'
        required
      />
      <button onClick={onConfirmSave}>
          전송
      </button>
      </div>
    </>
  )
}

export default LetterInput;