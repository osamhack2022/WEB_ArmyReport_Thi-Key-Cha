import React, { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { ToastContainer, toast } from 'react-toastify';
import { Post } from './PostViewer'
import { addDoc, collection, db } from 'firebase/firestore';

class Suggest extends Post {
  contructor(name, content) {
    super(name, content);
  }
}

const PostSuggest = () => {
  const { register, handleSubmit, formState: { isSubmitting, isDirty, errors } } = useForm();

  const onSubmit = async (content) => {
    await new Promise((delay) => setTimeout(delay, 1000)); // 중복 전송을 방지하기 위해 딜레이를 걸어줌
    const s = new Suggest('남경찬', content)
    
    try {
      const docRef = await addDoc(collection(db, "post-suggests"), {...s});
      if (docRef.id) toast.success("🦄 슈웅 ! 건의사항을 보냈습니다.")
    } catch (e) {
      console.log(e);
    }
  }

  return(
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="content">건의 내용</label>
        <input type="text" placeholder='건의사항' aria-invalid={!isDirty ? undefined : errors.content ? "true" : "false"} {...register('content', {
          required: '건의 내용은 필수 입력입니다.',
          minLength: {
            value: 30,
            message: "최소 30자 이상은 작성해야 합니다."
          }
        })}/>
        {errors.content && <small role="alert">{errors.content.message}</small>}
        <button type='submit'>전송</button>
      </form>
      <ToastContainer/>
    </>
  )
}

export default PostSuggest;