import React from 'react';
import styled from 'styled-components';

const FooterBlock = styled.div`
  text-align: center;
  justify-content: center;
  height: 50px;
  span {
    
  }
`

const Footer = () => {
  return (
    <>
      <FooterBlock>
        <p>&copy; 2022 ThiKeyCha Army-Report All rights reserved.</p>
      </FooterBlock>
    </>
  )
}

export default Footer;