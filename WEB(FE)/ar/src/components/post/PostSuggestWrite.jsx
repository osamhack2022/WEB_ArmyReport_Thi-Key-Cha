import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify';
import db from '../../database/DB_Manager';
import { addDoc, collection } from 'firebase/firestore';
import styled from "styled-components";
import { Post } from './PostViewer';

const PostSuggestWrite = ({ user_id, user_data, coll }) => {
  const { register, handleSubmit, formState: { isSubmitting, isDirty, errors } } = useForm();

  const onSubmit = async (obj) => {
    await new Promise((delay) => setTimeout(delay, 1500)); // 중복 전송을 방지하기 위해 딜레이를 걸어줌

    const newSuggest = new Post(
      user_id,
      user_data.Username,
      null,
      String(obj.content),
      false,
      "건의사항"
    )
    
    try {
      // TODO: 테스트 중이라 post-suggests 컬렉션으로 지정 되어 있습니다.
      // 추후에 '사단-여단-대대-부대' 콜렉션으로 들어가 데이터를 저장해야 합니다.
      const docRef = await addDoc(collection(db, coll), {...newSuggest});
      if (docRef.id) toast.success("🚀 슈웅 ! 건의사항을 보냈습니다.")
    } catch (e) {
      console.log(e);
    }
  }

  return(
    <>
      <FormBackground>
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Textarea 
              id="outlined-basic" 
              label="건의사항" 
              variant="outlined" 
              type="text"
              placeholder='건의내용' 
              aria-invalid={!isDirty ? undefined : errors.content ? "true" : "false"} 
              {...register('content', {
                required: '내용은 필수 입력란입니다.',
                minLength: {
                  value: 30,
                  message: "최소 30자 이상은 작성해야 합니다."
              }})} />
            {errors.content && <small role="alert">{errors.content.message}</small>}
          <Button type="submit" disabled={isSubmitting}><strong>보내기</strong></Button>
        </Form>
      </FormBackground>
    </>
  )
}

const FormBackground = styled.div`
  width: 860px;
  height: 420px;
  border: 0;
  margin: 0 auto;
  border-radius: 30px;
  background-color: #574F7D;
`

export const Form = styled.form`
  width: 760px;
  margin: 0 auto;
  position: relative;
  padding: 30px 20px 20px 10px;
  text-algin: center;

  > small {
    color: orange;
  }
`

const Button = styled.button`
  width: 15%;
  color: white;
  height: 36px;
  background-color: #342F4B;
  border: 0;
  border-radius: 10px;
  margin: 0.25rem 0 0;
  text-align: center;
  cursor: pointer;

  &:hover {
    > strong {
      color: tomato;
    }
  }
`

const Textarea = styled.textarea`
  width: 760px;
  height: 300px;
  color: black;
  outline: none;
  padding: 10px 40px 11px 1.5rem;
  border: 1px solid black;
  box-sizing: border-box;
  border-radius: 30px;
`

export default PostSuggestWrite;