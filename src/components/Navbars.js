import React from "react";
import { Navbar, Container, Nav, Button, Row, Col, NavDropdown } from "react-bootstrap";
import ModalKeranjang from "./ModalKeranjang";
import ModalHistory from "./ModalHistory";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { gql, useQuery } from "@apollo/client";

const DATA_USER = gql`
  query MyQuery($id: Int = 10) {
    user_user(where: { id: { _eq: $id } }) {
      nama
    }
  }
`;

export default function Navbars() {
  let cookies = new Cookies();
  const auth = cookies.get("auth");
  const userId = cookies.get("userId");
  const { data, error } = useQuery(DATA_USER, { variables: { id: userId } });
  let navigate = useNavigate();
  const dataUser = data?.user_user[0];
  console.log(dataUser?.nama);

  const handleLogout = ()=>{
    cookies.remove("userId", { path: "/" });
    cookies.remove("auth", { path: "/" });
    return navigate("/login", { replace: true });
  }
  const handleUser = (isAuth) => {
    console.log(isAuth)
    if (isAuth) {
      return (
        <Col>
        <NavDropdown title={dataUser?.nama} id="basic-nav-dropdown">
          <NavDropdown.Item>
              <Button variant="outline-warning" onClick={handleLogout}>
                <strong>Logout</strong>
              </Button>
          </NavDropdown.Item>
        </NavDropdown>
        </Col>
      );
    } else {
      return (
        <Col>
          <Link to="/login" style={{ textDecoration: "none" }}>
            <Button variant="outline-warning">
              <strong>Login</strong>
            </Button>
          </Link>
        </Col>
      );
    }
  };
  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
        <Container>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Navbar.Brand>
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
            {handleUser(auth)}
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
