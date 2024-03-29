import React, { useState } from "react";
import { Modal, Col } from "react-bootstrap";
import { gql, useQuery, useSubscription } from "@apollo/client";
import { Row } from "react-bootstrap";
import ModalPayment from "./ModalPayment";
import { numberWithCommas } from "../utils/numberWithCommas";
import Cookie from 'universal-cookie';

const DATA_PESANAN = gql`
  subscription MySubscription($_eq: Int = "") {
    pesanan(where: { id_user: { _eq: $_eq } }) {
      id
      id_user
      keterangan
      pesanan
      status
      price
    }
  }
`;
const QUERY_USER = gql`
  query MyQuery($_eq: Int = 10) {
    user(where: { id: { _eq: $_eq } }) {
      alamat
      telp
      id
    }
  }
`;

export default function ModalHistory() {
  let cookies = new Cookie();
  const userId = cookies.get('userId');
  const { data, loading, error } = useSubscription(DATA_PESANAN, {
    variables: { _eq: userId },
  });
  const { data: dataUser} = useQuery(QUERY_USER, { variables: { _eq: userId } });
  const [lgShow, setLgShow] = useState(false);
  const pesanan = data;
  const user = dataUser?.user;

  const handleModalTogle = () => {
    if (lgShow === false) {
      setLgShow(true);
    } else {
      setLgShow(false);
    }
  };

  // fungsi menampilkan status pesanan
  const handleStatusPayment = (status, pesananId) => {
    if (status === "menunggu pembayaran") {
      return user?.map((user) => <ModalPayment pesananId={pesananId} key={user.id} userId={user.id} alamat={user.alamat} telp={user.telp} />);
    } else {
      return <img src="img/cooking.png" style={{ width : "50px" }} alt="cooking" />;
    }
  };

  return (
    <div>
      <img
        src="img/icon/iconPerson.png"
        alt="person"
        onClick={handleModalTogle}
        style={{ cursor: "pointer" }}
      />
      <Modal
        size="lg"
        show={lgShow}
        onHide={() => handleModalTogle()}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">Pesanan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* head keranjang */}
          <Row className=" border-bottom mb-4">
            <Col className=" d-flex align-self-center justify-content-center">
              <p>
                <strong>Kode pesanan</strong>
              </p>
            </Col>
            <Col className=" d-flex align-self-center justify-content-center">
              <p>
                <strong>Pesanan</strong>
              </p>
            </Col>
            <Col
              
              className=" d-flex align-self-center justify-content-center"
            >
              <p>
                <strong>Keterangan</strong>
              </p>
            </Col>
            <Col className=" d-flex align-self-center justify-content-center">
              <p>
                <strong>Total</strong>
              </p>
            </Col>
            <Col className=" d-flex align-self-center justify-content-center">
              <p>
                <strong>status</strong>
              </p>
            </Col>
            <Col className=" d-flex align-self-center justify-content-center">
              <p>
                <strong></strong>
              </p>
            </Col>
          </Row>

          {/* body keranjang */}
          {pesanan?.pesanan.map((pesanan) => (
            <Row className=" mb-3" key={pesanan.id}>
              <Col className=" d-flex align-self-center justify-content-center border-end">
                <p>{pesanan.id}</p>
              </Col>
              <Col className=" d-flex align-self-center justify-content-center border-end">
                <p>{pesanan.pesanan}</p>
              </Col>
              <Col
                className=" d-flex align-self-center justify-content-center border-end"
              >
                <p>{pesanan.keterangan}</p>
              </Col>
              <Col className=" d-flex align-self-center justify-content-center border-end">
                <p>Rp.{numberWithCommas(pesanan.price)}</p>
              </Col>
              <Col className=" d-flex align-self-center justify-content-center border-end">
                <p>{pesanan.status}</p>
              </Col>
              <Col className=" d-flex align-self-center justify-content-center border-end">
                  {handleStatusPayment(pesanan.status, pesanan.id)}
              </Col>
            </Row>
          ))}
        </Modal.Body>
      </Modal>
    </div>
  );
}
