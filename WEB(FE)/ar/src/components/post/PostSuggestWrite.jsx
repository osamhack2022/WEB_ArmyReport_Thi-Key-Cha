import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify';
import db from '../../database/DB_Manager';
import { addDoc, collection } from 'firebase/firestore';
import styled from "styled-components";

/* mui materials */
import { Stack, Button, TextField, Box } from '@mui/material';
import { Post } from './PostViewer';

const PostSuggestWriteBlock = styled.div(`
`);

const PostSuggestWrite = ({ uid, udata, type }) => {
  const { register, handleSubmit, formState: { isSubmitting, isDirty, errors } } = useForm();

  const onSubmit = async (obj) => {
    await new Promise((delay) => setTimeout(delay, 1500)); // 중복 전송을 방지하기 위해 딜레이를 걸어줌

    const newSuggest = new Post(
      uid,
      udata.Username,
      null,
      String(obj.content),
      false,
      "건의사항"
    )
    
    try {
      // TODO: 테스트 중이라 post-suggests 컬렉션으로 지정 되어 있습니다.
      // 추후에 '사단-여단-대대-부대' 콜렉션으로 들어가 데이터를 저장해야 합니다.
      const docRef = await addDoc(collection(db, type), {...newSuggest});
      if (docRef.id) toast.success("🚀 슈웅 ! 건의사항을 보냈습니다.")
    } catch (e) {
      console.log(e);
    }
  }

  return(
    <>
      <PostSuggestWriteBlock>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box>
            <TextField id="outlined-basic" label="건의사항" variant="outlined" type="text" placeholder='건의사항' aria-invalid={!isDirty ? undefined : errors.content ? "true" : "false"} {...register('content', {
              required: '내용은 필수 입력입니다.',
              minLength: {
                value: 30,
                message: "최소 30자 이상은 작성해야 합니다."
              }
            })} />
          </Box>
        <Stack>
          {errors.content && <small role="alert">{errors.content.message}</small>}
          <Button type="submit" variant="contained">전송</Button>
        </Stack>
        </form>
      </PostSuggestWriteBlock>
    </>
  )
}

export default PostSuggestWrite;