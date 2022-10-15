import React from 'react';
import styled from 'styled-components';

const PostLetterAside = () => {
  return (
    <>
      <PostLetterGuideLink href="https://brunch.co.kr/@steiner7188/41">
        <PostLetterAsideBlock>
          <TextGuide>
            <p>마음의 편지를 어떻게 쓰는지 모르겠다구요?</p>
            <p>아기 오구가 알려줄게요! ⚡</p>
          </TextGuide>
        </PostLetterAsideBlock>
      </PostLetterGuideLink>
    </>
  )
}

const PostLetterGuideLink = styled.a``;

const PostLetterAsideBlock = styled.div`
  padding: 1.65rem 15%;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  &:hover {
    background-color: #95ADBE;
  }
  cursor: pointer;
`

const PostLetterAsideImage = styled.img`
  position: absolute;
  top: 58%;
  width: 8rem;
`

const TextGuide = styled.div`
  font-size: 18px;
  line-height: 0.5rem;
  color: black;
`


export default PostLetterAside;