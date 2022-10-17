import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Baby_Ogu_Congrate from '../../static/image/baby-ogu-birthday.png'

const Inner = styled(Box)`
  position: absolute;
  top: 0;
  left: 0;
`
  
const Container = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  width: 600px;  
  height: 400px;
  background-color: white;
  border-radius: 30px;
  border: 10px solid #574F7D;
  box-sizing: border-box;
  text-align: center;


  .baby-ogu-message {
    top: -70px;
    z-index: 1;
    position: relative;
    h4 {
      font-weight: 900;
      font-size: 18px;
      line-height: 14px;
      color: white;
    }
  }

  h3 {
    font-weight: 500;
    font-size: 28px;
  }

  p {
    font-size: 14px;
    line-height: 1px;
  }
`

const BabyOgu = styled.img`
  position: relative;
  top: -40px;
`

const BabyOguBlock = styled.div`
  width: 100%;
  height: 200px;
  background: #574F7D;
`
  
const Button = styled(Link)`
  background: #574F7D;
  border-radius: 100px;
  padding: 5px 15px;
  font-size: 18px;
  color: white;
`

const AuthRegisterModal = ({ handleClose, open, user, to }) => {
  return (
    <>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Inner>
          <Container>
            <BabyOguBlock>         
              <BabyOgu src={Baby_Ogu_Congrate} />
              <div className="baby-ogu-message">
                <h4>아기오구가</h4>
                <h4>진심으로 축하해주네요!</h4>
              </div>
            </BabyOguBlock>
            <h3><strong>{user}</strong> 님이시군요!</h3>
            <p>아래 버튼을 눌러 메인페이지로 이동하세요.</p> 
            <Button to={to} onClick={handleClose}>홈으로</Button>
          </Container>
        </Inner>
      </Modal>
    </>
  )
}

export default AuthRegisterModal;