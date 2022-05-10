import React from "react";
import { Navbar, Container, Nav, Button, Row, Col } from "react-bootstrap";
import ModalKeranjang from "./ModalKeranjang";

export default function Navbars() {
  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
        <Container>
          <Navbar.Brand href="#home">foodys</Navbar.Brand>
          <Row className="ms-auto">
            <Col className=" mt-1">
              {" "}
              <ModalKeranjang />{" "}
            </Col>
            <Col className=" mt-1">
              <img src="img/icon/iconPerson.png" alt="person" />
            </Col>
            <Col>
              <Button variant="outline-warning">
                <strong>Login</strong>
              </Button>
            </Col>
          </Row>
        </Container>
      </Navbar>
    </div>
  );
}
