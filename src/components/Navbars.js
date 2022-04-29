import React from "react";
import {Navbar, Container, Nav, Button} from "react-bootstrap";

export default function Navbars() {
  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
        <Container>
          <Navbar.Brand href="#home">foodys</Navbar.Brand>
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Item className=" me-3 mt-1" ><img src="img/icon/iconChart.png" alt="cart" /></Nav.Item>
              <Nav.Item className=" me-3 mt-1" ><img src="img/icon/iconPerson.png" alt="person" /></Nav.Item>
              <Nav.Item><Button variant="outline-warning"><strong>Login</strong></Button></Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
