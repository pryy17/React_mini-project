import React from "react";
import { Navbar, Container, Nav, Button, Row, Col } from "react-bootstrap";
import ModalKeranjang from "./ModalKeranjang";
import ModalHistory from "./ModalHistory";
import { Link } from "react-router-dom";
export default function Navbars() {
  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
        <Container>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Navbar.Brand href="#home">
              <img src="img/logo.png" />
            </Navbar.Brand>
          </Link>
          <Row className="ms-auto">
            <Col className=" mt-1">
              {" "}
              <ModalKeranjang />{" "}
            </Col>
            <Col className=" mt-1">
              <ModalHistory />
            </Col>
            <Col>
              <Button variant="outline-warning">
                <strong>Login</strong>
              </Button>
            </Col>
            <Col>
              <Link to="/about" style={{ textDecoration: "none" }}>
              <Button variant="outline-warning">
                <strong>About</strong>
              </Button>
              </Link>
            </Col>
          </Row>
        </Container>
      </Navbar>
    </div>
  );
}
