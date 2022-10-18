import React from 'react'
import styled from "styled-components";
import PostSuggestWrite from './PostSuggestWrite';
import baby_duck_suggest from '../../static/image/baby-ogu-good.png'

const PostSuggest = ({ user_id, user_data, coll }) => {
  return(
    <>
      <Background>
        <PostSuggestInner>
          <div className="title-wrap">
            <Title>건의 사항</Title>
            <span>부대 생활에 불편함이 있나요? <br /> 아래 있는 건의함을 통해 여러분의 생각을 마음껏 표출해주세요! </span>
          </div>
          <PostSuggestWrite user_id={user_id} user_data={user_data} coll={coll} />
        </PostSuggestInner>
      </Background>
    </>
  )
}

const Title = styled.h1`
  text-align: center;
  font-size: 36px;
  font-weight: 900;
`

const Background = styled.div`
  margin-top: 100px;
  border-bottom: 1px solid black;
  border: 0;
`

const PostSuggestInner = styled.div`
  width: 1200px;
  margin: 0 auto;
  padding: 0.5rem;

  .title-wrap {
    line-height: 1.5rem;
    text-align: center;
    margin-bottom: 20px;
    span {
      font-size: 18px;
    }
  }
`

export default PostSuggest;