import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const ModalBox = styled(Box)`
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
`

const Button = styled(Link)`
  
`

const AuthRegisterModal = ({ handleClose, open, to }) => {

  return (
    <>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ModalBox>
          <h4>아기오구가 <br /></h4> <h4>진심으로 축하해주네요!</h4>
          <h3>응애 님이시군요!</h3> <br />
          <p>아래 버튼을 눌러 메인페이지로 이동하세요.</p> 
        </ModalBox>
        <Button to={to} onClick={handleClose}>홈으로</Button>
      </Modal>
    </>
  )
}

export default AuthRegisterModal;