import React, { useEffect, useState } from "react";
import { Card, Button, Form, Col, Row } from "react-bootstrap";
import { gql, useLazyQuery } from "@apollo/client";
import Cookie from "universal-cookie";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import ModalRegister from "../components/ModalRegister";

const QUERY_LOGIN = gql`
  query MyQuery($nama: String = "", $password: String = "") {
    user_user(
      where: { email: { _like: $nama }, password: { _like: $password } }
    ) {
      id
      alamat
      email
      nama
      telp
    }
  }
`;

export default function Login() {
  const [getDataUser, { data, loading, error }] = useLazyQuery(QUERY_LOGIN);
  let cookies = new Cookie();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const auth = cookies.get("auth");
  let navigate = useNavigate();
  const dataUser = data?.user_user[0];


  const handleSubmitLogin = async (e) => {
    e.preventDefault();

    await getDataUser({
      variables: {
        nama: email,
        password: password,
      },
    });

    if (data?.user_user.length === 0) {
      Swal.fire("maaf :(", "data pengguna tidak di temukan", "question");
    }
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  useEffect(() => {
    if (data?.user_user.length === 1) {
      cookies.set("userId", dataUser?.id, { path: "/" });
      cookies.set("auth", true, { path: "/" });
      Swal.fire("Berhasil!", "selamat datang di foodys!", "success");
      return navigate("/", { replace: true });
    }
  }, [dataUser]);

 

  return (
    <div
      style={{ height: "100vh", backgroundImage: "url('img//image-03.jpg')" }}
      className=" d-flex justify-content-center align-items-center"
    >
      <div>
        <Card style={{ width: "23rem" }}>
          <Card.Body>
            <Card.Title>Login</Card.Title>

            <Form onSubmit={handleSubmitLogin}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  onChange={handleChangeEmail}
                />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onChange={handleChangePassword}
                />
              </Form.Group>
              <Row >
                <Col>
                  <Button variant="primary" type="submit">
                    login
                  </Button>
                </Col>
              </Row>
            </Form>
            <ModalRegister />
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}
