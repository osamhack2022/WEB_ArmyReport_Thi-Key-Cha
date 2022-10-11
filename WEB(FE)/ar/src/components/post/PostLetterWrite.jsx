import React, { useState } from 'react'
import db from '../../database/DB_Manager';
import { addDoc, collection } from 'firebase/firestore';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Stack, Button, Box, TextField } from '@mui/material';
import { UserActions } from '../../app/slice/UserSlice';
import { Post } from './PostViewer';

const PostLetterWrite = ({ uid, udata, type }) => {
  const [letter, setLetter] = useState({
    attacker: "",
    content: "",
    err: ""
  })
  
  const onSaveLetter = async (attacker, content) => {
    await new Promise((delay) => setTimeout(delay, 1500)); // 중복 전송을 방지하기 위해 딜레이를 걸어줌

    const newLetter = new Post(
      uid,
      udata.Username,
      '마음의 편지',
      attacker,
      content,
      false
    )

    try {
      // TODO: 테스트 중이라 post-letters 컬렉션으로 지정 되어 있습니다.
      // 추후에 '사단-여단-대대-부대' 콜렉션으로 들어가 데이터를 저장해야 합니다.
      const docRef = await addDoc(collection(db, type), {...newLetter});
      if (docRef.id) toast.success("💌 팔랑 ~ 마음의 편지를 보냈습니다.")
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
      <Box sx={{ '& > :not(style)': { m: 1 } }}>
        <div className="PostLetterInput">
          <TextField
            id="outlined-size-small"
            type="text"
            name="attacker"
            onChange={handleChange}
            label="누가 그랬나요?"
            placeholder="예) 계급 홍길동"
            size="small"
          />
          {validateAttacker() && <small className="error" role="alert">{validateAttacker()}</small>}
          <TextField
            id="outlined-size-normal"
            name="content"
            onChange={handleChange}
            type="text"
            maxLength={1000}
            autoComplete="off"
            placeholder='1000자 이내로 작성해주세요!'
            label="마음의 편지"
          />
          {validateContent() && <small className="error" role="alert">{validateContent()}</small>}
          <Stack>
            <Button onClick={onConfirmSave} variant="contained">전송</Button>
          </Stack>
        </div>
      </Box>
    </>
  )
}

export default PostLetterWrite;