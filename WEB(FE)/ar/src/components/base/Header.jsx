import useHeader from './hooks/useHeader';
import styled from 'styled-components'
import HeaderMainMenu from './HeaderMainMenu'

function Header(props) {
  const { user } = useHeader();

  return (
    <>
      <Block>
        <HeaderInner className='in'>
          <HeaderMainMenu user={user} />
        </HeaderInner>
      </Block>
    </>
  )
}

const HeaderInner = styled.div`
  width: 1920px;
  margin: 0 auto;
  position: relative;
`

const Block = styled.div`
  position: fixed;
  top: 0;
  background: #222831;
  .in {
    height: 80px
  }
`

export default Header;