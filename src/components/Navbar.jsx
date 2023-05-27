import { useState } from "react";
import { Button, Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import classes from "../styles/Nav.module.css";
import Modal from "./Modal";

export default function Mynav() {
  const [modalShow, setModalShow] = useState(true);
  const handleShow = () => {
    setModalShow(true);
  };

  const handleHide = () => {
    setModalShow(false);
  };
  return (
    <>
      <Navbar expand="lg" className={classes.nav} variant="dark">
        <Container>
          <Navbar.Brand>Combinatorial Game Visualizer</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="me-auto">
              <Nav.Link onClick={() => handleShow()}>Instructions</Nav.Link>
              <Nav.Link href="#link">Rules</Nav.Link>
              <NavDropdown title="Games" id="game">
                <NavDropdown.Item href="#action/3.1">Nim</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Misere Nim
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  StairCase Nim
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav>
              <Button className="btn">Configure</Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Modal show={modalShow} onHide={() => handleHide()}></Modal>
    </>
  );
}
