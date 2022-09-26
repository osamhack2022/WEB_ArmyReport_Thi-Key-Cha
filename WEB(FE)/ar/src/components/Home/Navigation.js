import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown'


const Navigation = () => {
  return (
    <>
      <Navbar bg="light" expand="lg">
      <Container>
        <div className="AR_Logo">
          <Nav.Link href="/">AR Logo</Nav.Link>
        </div>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/Calender">Calender</Nav.Link>
            <Nav.Link href="/Vacation">Vacation</Nav.Link>
            <Nav.Link href="/Post">Posting</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
      </Navbar>
    </>
    
  )
}

export default Navigation;