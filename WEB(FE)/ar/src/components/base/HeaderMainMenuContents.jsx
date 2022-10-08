import { Link } from 'react-router-dom';
import styled from 'styled-components'

const BlockContents = styled.div`
  width: 100%;
  position: fixed;
  left: 0;
  .text {
    padding: 5px 0;
    font-size: 13px;
    cursor: pointer;
    color: white;
    list-style: none;
    &:hover {
      text-decoration: underline;
    }
  }
`

const ItemContents = styled.div`
  background-color: #222831;
  ul {
    padding: 20px 0;
    display: flex;
  }
  .inner {
    width: 1920px;
    margin: 0 auto;
    position: relative;
  }
`

function HeaderMainMenuContents({ user }) {
  return (
    <>
      <BlockContents>
        <ItemContents>
          <ul className="inner">
            <li className='text'>마음의 편지</li>
            <li className='text'>건의사항</li>
            <li className='text'>종합</li>
          </ul>
        </ItemContents>
      </BlockContents>
    </>
  )
}

export default HeaderMainMenuContents;