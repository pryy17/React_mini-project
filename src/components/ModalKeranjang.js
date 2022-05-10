import React, { useEffect, useState } from "react";
import { Modal, Button, Col } from "react-bootstrap";
import { gql, useMutation, useQuery, useSubscription } from "@apollo/client";
import { Row } from "react-bootstrap";
import { FiEdit, FiTrash2 } from "react-icons/fi"

const DATA_KERANJANG = gql`
subscription MySubscription2($_eq: Int = "") {
  user_user {
    keranjangs(where: {id_user: {_eq: $_eq}}) {
      category
      gambar
      harga
      id
      id_user
      jumlah
      keterangan
      kode
      nama
    }
  }
}
`;

const DELETE_KERANJANG = gql`
mutation MyMutation($_eq: Int = "") {
  delete_pesanan_keranjang(where: {id: {_eq: $_eq}}) {
    returning {
      nama
      kode
    }
  }
}
`;

export default function ModalKeranjang() {
  const [ deleteKeranjang, { loading: loadingDelete, error: errorDelete, data: dataDelete,}] = useMutation(DELETE_KERANJANG);

  const useGetData = (userId) => {
    const { data, loading } = useSubscription(
      DATA_KERANJANG,
      { 
        variables: {
        "_eq": userId
        } 
      });
    console.log(data);
    return data;
  };

  const handleDelete = (idKeranjang) => {
    deleteKeranjang({
      variables: {
        "_eq": idKeranjang,
      },
    })
  }


  const [lgShow, setLgShow] = useState(false);
  const keranjang = useGetData(1);
  console.log(keranjang)
  const handleModalTogle = () => {
    if (lgShow === false) {
      setLgShow(true);
    } else {
      setLgShow(false);
    }
  };

  return (
    <div>
      <img
        onClick={handleModalTogle}
        style={{ cursor: "pointer" }}
        src="img/icon/iconChart.png"
        alt="cart"
      />
      <Modal
        size="lg"
        show={lgShow}
        onHide={() => handleModalTogle()}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Keranjang
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* head keranjang */}
          <Row className=" border-bottom mb-4">
            <Col className=" d-flex align-self-center justify-content-center">
              <div>
                <p><strong>Gambar</strong></p>
              </div>
            </Col>
            <Col className=" d-flex align-self-center justify-content-center">
              <p><strong>Nama</strong></p>
            </Col>
            <Col className=" d-flex align-self-center justify-content-center">
              <p><strong>Jumlah</strong></p>
            </Col>
            <Col className=" d-flex align-self-center justify-content-center">
              <p><strong>Harga</strong></p>
            </Col>
            <Col className=" d-flex align-self-center justify-content-center">
              <p><strong>Edit Pesanan</strong></p>
            </Col>
            <Col className=" d-flex align-self-center justify-content-center">
              <p><strong>Hapus</strong></p>
            </Col>
          </Row>

          {/* body keranjang */}
          {
          keranjang?.pesanan_keranjang.map((keranjang)=>(
            <Row className=" mb-3" key={keranjang.id}>
            <Col style={{ overflow : "hidden"}}>
              <div style={{ overflow : "hidden", height: "100%"}}>
                <img src={`img/makanan/${keranjang.gambar}`} style={{ width: "100%"}} />
              </div>
            </Col>
            <Col className=" d-flex align-self-center justify-content-center border-end">
              <p>{keranjang.nama}</p>
            </Col>
            <Col className=" d-flex align-self-center justify-content-center border-end">
              <p>{keranjang.jumlah}</p>
            </Col>
            <Col className=" d-flex align-self-center justify-content-center border-end">
              <p>Rp.{keranjang.harga}</p>
            </Col>
            <Col className=" d-flex align-self-center justify-content-center pb-3 border-end">
                <div onClick ={() => {handleDelete(keranjang.id)}} >
                  < FiEdit />
                </div>
            </Col>
            <Col className=" d-flex align-self-center justify-content-center pb-3">
              <FiTrash2 />
            </Col>
          </Row>
          ))      
          }  
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalTogle}>
            Close
          </Button>
          <Button variant="primary" onClick={handleModalTogle}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
