import React from 'react';
import PostLetterWrite from './PostLetterWrite';
import PostLetterAside from './PostLetterAside';
import styled from "@emotion/styled";
import baby_ogu_write from '../../static/image/baby-ogu-write.png'

const PostLetter = ({ user_id, user_data, coll }) => {
  return (
    <>
      <Background>
        <PostLetterInner>
          <PostLetterSide>
            <p>아기 오구는</p>
            <p>무엇을 작성하고 있는 걸까요?</p>
            <img src={baby_ogu_write} alt="" />
          </PostLetterSide>
          <Description>
            <p>부조리 라는 것은, 우리의 잘못이 아니잖아요!</p>
            <p>반드시 고쳐져야할, 있으면 안될 병영생활중 하나 입니다.</p>
            <span>군 복무중 왠지 모를 불쾌함을 느끼셨다면 지금 바로 대처하세요.</span>
          </Description>
          <PostLetterWrite user_id={user_id} user_data={user_data} coll={coll} />
        </PostLetterInner>
      </Background>
      <PostLetterAside />
    </>
  )
}

const PostLetterSide = styled.div`
  position: absolute;
  left: 65%;
  max-width: 550px;
  text-align: center;
  
  > p {
    color: white;
    font-size: 24px;
    line-height: 0.5rem;
    font-family: 'ImcreSoojin'
  }
`

const Description = styled.div`
  color: white;
  font-size: 14px;
  line-height: 0.5rem;
  margin-bottom: 1.5rem;
`

const Background = styled.div`
  background: #574F7D;
  padding: 5rem;
  height: 500px;
`

const PostLetterInner = styled.div`
  width: 1200px;
  margin: 0 auto;
  padding: 0.5rem;
`

export default PostLetter;