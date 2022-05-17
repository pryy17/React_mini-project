import React, { useState } from "react";
import { Form, Button, Modal, Row, Col } from "react-bootstrap";
import { gql, useMutation, useQuery, useSubscription } from "@apollo/client";
import Swal from 'sweetalert2';

const QUERY_UPDATE_USER = gql`
mutation MyMutation($_eq: Int = "", $alamat: String = "", $telp: String = "") {
  update_user_user(where: {id_user: {_eq: $_eq}}, _set: {telp: $telp, alamat: $alamat}) {
    returning {
      alamat
      email
      id
      id_user
      nama
    }
  }
}
`;

const QUERY_UPDATE_STATUS = gql`mutation MyMutation($_eq: Int = "", $status: String = "") {
  update_pesanan_pesanans(where: {id: {_eq: $_eq}}, _set: {status: $status}) {
    returning {
      id
      id_user
      keterangan
      pesanan
      status
      total_harga
    }
  }
}
`;
export default function ModalPayment(props) {
  const [telp, setTelp] = useState(props.telp);
  const [alamat, setAlamat] = useState(props.alamat);
  const [telpError, setTelpError] = useState();
  const [show, setShow] = useState(false);
  const [updateUser, {error: userError}] = useMutation(QUERY_UPDATE_USER);
  const [updateStatus, {error: statusError}] = useMutation(QUERY_UPDATE_STATUS);
 
  const handleModalTogle = () => {
    if (show === false) {
      setShow(true);
    } else {
      setShow(false);
      
    }
  };

  const handleChangeAlamat = (e) => {
    setAlamat(e.target.value);
  }

  const handleChangeTelp = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    const pattern = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;
    setTelp(value);
  
    // validate noHandphone
    if (name === "telp") {
      if (!pattern.test(value)) {
        setTelpError("no handphone harus berupa angka dan kurang dari 14 karakter");
      } else {
        setTelpError("");
      }
    }
  };

  const handleSubmit = () => {
    updateUser({
      variables: {
        "_eq": props.userId,
        "telp": telp,
        "alamat": alamat
      }
    })

    updateStatus({
      variables: {
        "_eq": props.pesananId,
        "status": "proses"
      }
    })

    handleModalTogle();
    Swal.fire({
      title: 'Sabar',
      html: 'sedang mengirim data',
      timer: 3000,
      didOpen: () => {
        Swal.showLoading()
      },
      willClose: () => {
        Swal.fire(
          'Berhasil!',
          'Terima kasih sudah memesan di aplikasi kami',
          'success'
        )
      }
  })

  }

  return (
    <div>
      <Button
        style={{ backgroundColor: "#F17228", border: "none" }}
        onClick={()=>{
            handleModalTogle();
            // props.handleCloseModalHistory(false)
        }}
      >
        Payment
      </Button>

      <Modal show={show} onHide={handleModalTogle} style={{backgroundColor: "rgba(0, 0, 0, 0.589)"}}>
        <Modal.Header closeButton>
          <Modal.Title>Payment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
                <Form >
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>No.Telp</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder={props.telp}
                    autoFocus
                    name="telp"
                    onChange={handleChangeTelp}
                  />
                  <p className="errorMassage">{telpError}</p>
                </Form.Group>
                <Form.Group className="mb-3" controlId="">
                  <Form.Label>Alamat</Form.Label>
                  <Form.Control as="textarea" rows={3} placeholder={props.alamat} name="alamat" onChange={handleChangeAlamat} />
                </Form.Group>
              </Form>
  
            </Col>
            <Col className=" border-start">
              <div className="d-grid gap-2">
                <Button
                  style={{ backgroundColor: "#F17228", border: "none" }}
                  onClick={handleModalTogle}
                  disabled
                >
                  Gopay
                </Button>
              
                <Button
                  style={{ backgroundColor: "#F17228", border: "none" }}
                  onClick={handleModalTogle}
                  disabled
                >
                  OVO
                </Button>
              
                <Button
                  style={{ backgroundColor: "#F17228", border: "none" }}
                  onClick={handleSubmit}
                >
                  CASH
                </Button>
              </div>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </div>
  );
}
