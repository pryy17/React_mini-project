import React, { useState } from "react";
import { Modal, Button, Col } from "react-bootstrap";
import { gql, useMutation, useSubscription } from "@apollo/client";
import { Row } from "react-bootstrap";
import { FiTrash2 } from "react-icons/fi"
import Swal from 'sweetalert2';
import ModalEditKeranjang from "./ModalEditKeranjang";
import { numberWithCommas } from "../utils/numberWithCommas";

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

const INSERT_PESANAN = gql`mutation MyMutation($id_user: Int = "", $keterangan: String = "", $pesanan: String = "", $status: String = "", $total_harga: Int = 10) {
  insert_pesanan_pesanans(objects: {id_user: $id_user, keterangan: $keterangan, pesanan: $pesanan, status: $status, total_harga: $total_harga}) {
    returning {
      pesanan
      keterangan
      id_user
    }
  }
}`;

const DELETE_ALL_KERANJANG = gql`
mutation MyMutation($id_user: Int = "", $keterangan: String = "", $pesanan: String = "", $status: String = "", $total_harga: Int = 10, $_eq: Int = 10) {
  delete_pesanan_keranjang(where: {id_user: {_eq: $_eq}}) {
    returning {
      nama
      id_user
      harga
    }
  }
}
`;

export default function ModalKeranjang() {
  
  const [ deleteKeranjang, { error: errorDelete }] = useMutation(DELETE_KERANJANG);
  const [ deleteAllKeranjang, { error: errorAllDelete}] = useMutation(DELETE_ALL_KERANJANG);
  const [listMenu, setListMenu] = useState();
  const [listKeterangan, setListKeterangan] = useState();
  const { data, loading, error: errorSubsciption} = useSubscription( SUBSCIPTION_DATA,{ variables: {"id": 1}});
  const [insertPesanan, {loading : pesananLoading, error: pesananError}] = useMutation(INSERT_PESANAN);
  const [lgShow, setLgShow] = useState(false);
  const keranjang = data;
  
 
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
  }

  const handleModalTogle = () => {
    if (lgShow === false) {
      setLgShow(true);
    } else {
      setLgShow(false);
      
    }
    
  };

  const handleInsertDataPesanan = () => {
    // totalharga pesanan
    let harga = []; 
    keranjang.pesanan_keranjang.map((item)=> harga.push(item.harga));
    let totalHarga = harga.reduce((a, b) => a + b);
    
    //list Pesanan
    let pesananArr = [];
    keranjang.pesanan_keranjang.map((item)=> pesananArr.push(`${item.nama}(${item.jumlah})`));
    let listPesanan = pesananArr.reduce((a, b) => `${a}, ${b}`);

    // list keterangan
    let keteranganArr = [];
    keranjang.pesanan_keranjang.map((item)=> keteranganArr.push(item.keterangan));
    let listKeterangan = keteranganArr.reduce((a, b) => `${a}, ${b},`);
    
    let data = {
      id_user : 1,
      total_harga : totalHarga,
      status: "menunggu pembayaran",
      pesanan: listPesanan,
      keterangan: listKeterangan,
    }
  
   insertPesanan({
      variables : {
       "id_user": 1,
       "pesanan": listPesanan,
       "keterangan": listKeterangan,
       "total_harga": totalHarga,
       "status": "menunggu pembayaran"
     }
    });

    deleteAllKeranjang({
      variables: {
        "_eq": 1
      }
    })

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
          'Pesanan kamu telah di terima mohon untuk melakukan pembayaran',
          'success'
        )
        
      }
  })
  }
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
                <img src={`img/makanan/${keranjang.gambar}`} alt="keranjang" style={{ width: "100%"}} />
              </div>
            </Col>
            <Col className=" d-flex align-self-center justify-content-center border-end">
              <p>{keranjang.nama}</p>
            </Col>
            <Col className=" d-flex align-self-center justify-content-center border-end">
              <p>{keranjang.jumlah}</p>
            </Col>
            <Col className=" d-flex align-self-center justify-content-center border-end">
              <p>Rp.{ numberWithCommas(keranjang.harga) }</p>
            </Col>
            <Col className=" d-flex align-self-center justify-content-center pb-3 border-end">
                <div style={{ cursor: "pointer" }}>
                  <ModalEditKeranjang id={keranjang.id} keterangan={keranjang.keterangan} image={keranjang.gambar} nama={keranjang.nama} harga={keranjang.harga} jumlah={keranjang.jumlah} />
                </div>
            </Col>
            <Col className=" d-flex align-self-center justify-content-center pb-3">
              <div onClick ={() => {handleDelete(keranjang.id)}} style={{ cursor: "pointer" }}>
                <FiTrash2 />
              </div>
            </Col>
          </Row>
          ))      
          }  
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleInsertDataPesanan}>
            Checkout
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
