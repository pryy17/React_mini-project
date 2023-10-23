import { Button, Modal, Form, Row, Col } from 'react-bootstrap';
import React, { useState, useEffect } from 'react'
import { gql, useMutation } from "@apollo/client";
import Swal from "sweetalert2";

const INSERT_USER = gql`mutation MyMutation($email: String = "", $nama: String = "", $password: String = "") {
  insert_user(objects: {nama: $nama, password: $password, email: $email}) {
    returning {
      nama
      email
    }
  }
}
`;


export default function ModalRegister() {
  const [setDataUser , {data, error, loading}] = useMutation(INSERT_USER);   
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [username, setUserName] = useState();

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleChangeUsername = (e) => {
    setUserName(e.target.value);
  };

  
  const handleSubmitRegister = async (e) => {
    e.preventDefault()
    await setDataUser({
      variables : {
        
        "nama": username,
        "password": password,
        "email": email
      }
    })
    
    if(error === undefined){
      Swal.fire("succes!", "register berhasil", "success");
      setEmail("");
      setPassword("");
      setUserName("");
    }else{
      Swal.fire("maaf :(", "register gagal", "error");
    }

    setShow(false);

  }
  
  return (
    <div>
      <p onClick={handleShow} style={{color: "blue", cursor: "pointer"}}>
        belum punya akun? daftar di sini 
      </p>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form onSubmit={handleSubmitRegister}>
              <Form.Group className="mb-3" controlId="formNama">
                <Form.Label>username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="enter username"
                  onChange={handleChangeUsername}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="registerEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  onChange={handleChangeEmail}
                  required
                />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="registerPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onChange={handleChangePassword}
                  required
                />
              </Form.Group>
              <Row >
                <Col>
                  <Button variant="primary" type="submit">
                    Register
                  </Button>
                </Col>
              </Row>
            </Form>
        </Modal.Body>
      </Modal>
    </div>
  )
}
