import React, { useEffect, useState } from "react";
import { Modal, Button, Col } from "react-bootstrap";
import { gql, useMutation, useQuery, useSubscription } from "@apollo/client";
import { Row } from "react-bootstrap";
import { FiEdit, FiTrash2 } from "react-icons/fi"
import Swal from 'sweetalert2';
import ModalEditKeranjang from "./ModalEditKeranjang";




const DATA_KERANJANG = gql`
query MyQuery($_eq: Int = "") {
  pesanan_keranjang(where: {id_user: {_eq: $_eq}}) {
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
`;

const SUBSCIPTION_DATA = gql`
subscription MySubscription($id: Int = "") {
  pesanan_keranjang(where: {id_user: {_eq: $id}}) {
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
  // const { data, loading, error, refetch } = useQuery(
  //   DATA_KERANJANG,
  //   { 
  //     variables: {
  //     "_eq": 1
  //     },
  //   });
  
  const { data, loading, error} = useSubscription(
      SUBSCIPTION_DATA,
      { 
        variables: {
        "id": 1
        },
      });

  const [lgShow, setLgShow] = useState(false);
  const keranjang = data;
  
  useEffect(()=> {
    // refetch()
  })
  console.log(error);
  const handleDelete = async (idKeranjang) => {
    Swal.fire(
      'Delete',
      'pesanan berhasil di hapus',
      'success'
    )
    await deleteKeranjang({
      variables: {
        "_eq": idKeranjang,
      },

    })
    
    // refetch()
  }

  
  console.log(error)
  const handleModalTogle = () => {
    if (lgShow === false) {
      setLgShow(true);
    } else {
      setLgShow(false);
      
    }
    // refetch();
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
                <div>
                  <ModalEditKeranjang  id={keranjang.id} keterangan={keranjang.keterangan} image={keranjang.gambar} nama={keranjang.nama} harga={keranjang.harga} jumlah={keranjang.jumlah} />
                </div>
            </Col>
            <Col className=" d-flex align-self-center justify-content-center pb-3">
              <div onClick ={() => {handleDelete(keranjang.id)}} >
                <FiTrash2 />
              </div>
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
