import React from 'react';
import styled from 'styled-components';

const PostLetterAside = () => {
  return (
    <>
      <PostLetterGuideLink href="https://brunch.co.kr/@steiner7188/41">
        <PostLetterAsideBlock>
          <TextLogo>
            <p role='img'>&#128238;</p>
          </TextLogo>
          <TextGuide>
            <h3>마음의 편지를 어떻게 쓰는지 모르겠다구요?</h3>
            <p>자유를 꿈꾸는 선생님이 작성한 <strong>마음의 편지 제대로 쓰는 법</strong> 매거진을 확인해보세요!</p>
          </TextGuide>
        </PostLetterAsideBlock>
      </PostLetterGuideLink>
    </>
  )
}

const PostLetterGuideLink = styled.a``;

const PostLetterAsideBlock = styled.div`
  padding: 3rem 15%;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  text-align: center;
  cursor: pointer;

  &:hover {
    strong {
      background-color: #95ADBE;
      color: white;
    }
  }
`

const TextLogo = styled.div`
  font-size: 32px;
  line-height: 1.2rem;
  p {
    color: #D9D9D9;
  }
`

const TextGuide = styled.div`
  line-height: 0.9rem;
  color: black;

  > h3 {
    font-weight: 900;
    font-size: 24px;
  }

  > p {
    font-size: 14px;
    font-weight: 400;
  }
`


export default PostLetterAside;