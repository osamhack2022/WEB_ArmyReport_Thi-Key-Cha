import React from 'react'
import styled from "styled-components";
import PostSuggestWrite from './PostSuggestWrite';
import baby_duck_suggest from '../../static/image/baby-duck-suggest.png'

const PostSuggest = ({ user_id, user_data, coll }) => {
  return(
    <>
      <Background>
        <PostSuggestInner>
          <div className="title-wrap">
            <Title>건의 사항</Title>
            <SubTitle>무분별한 비방이나 욕설은 자제해주세요.</SubTitle>
            <SubTitle>내부 운영 정책에 맞지 않는 글은 게시가 제한될 수 있어요.</SubTitle>
          </div>
          <PostSuggestSide>
            <img src={baby_duck_suggest} alt="" />
          </PostSuggestSide>
          <PostSuggestWrite user_id={user_id} user_data={user_data} coll={coll} />
        </PostSuggestInner>
      </Background>
    </>
  )
}

const Title = styled.h1`
  text-align: center;
  font-size: 36px;
`

const SubTitle = styled.p`
  text-align: center;
  font-size: 18px;
`

const Background = styled.div`
  margin-top: 100px;
  border-bottom: 1px solid black;
  border: 0;
`

const PostSuggestSide = styled.div`
  position: relative;
  text-align: center;
  
  > p {
    color: white;
    font-size: 18px;
    line-height: 0.5rem;
  }
`

const PostSuggestInner = styled.div`
  width: 1200px;
  margin: 0 auto;
  padding: 0.5rem;

  .title-wrap {
    line-height: 1.2rem;
  }
`

export default PostSuggest;