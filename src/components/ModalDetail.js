import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { FaMinusSquare, FaPlusSquare } from "react-icons/fa";
import { gql, useMutation } from "@apollo/client";
import Swal from 'sweetalert2';
import { numberWithCommas } from "../utils/numberWithCommas";
import Cookie from 'universal-cookie';

const ADD_KERANJANG = gql`
mutation MyMutation($category: String = "", $gambar: String = "", $harga: Int = "", $id_user: Int = "", $jumlah: Int = "", $kode: String = "", $nama: String = "", $keterangan: String = "") {
  insert_keranjang(objects: {id_user: $id_user, name: $nama, price: $harga, img: $gambar, jumlah: $jumlah, keterangan: $keterangan}) {
    returning {
      id
      id_user
      img
      jumlah
      keterangan
      name
      price
    }
  }
}
`;

export default function ModalDetail(props) {
  const [lgShow, setLgShow] = useState(false);
  const [totalHarga, setTotalHarga] = useState(props.harga);
  const [jumlahMenu, setJumlahMenu] = useState(1);
  const [keterangan, setKeterangan] = useState("biasa aja");
  const [addKeranjang, { loading: addLoading, error: addError }] = useMutation(ADD_KERANJANG);
  let cookies = new Cookie();
  const userId = cookies.get('userId');
  
  
  const handleModalTogle = () => {
    if (lgShow === false) {
      setLgShow(true);
    } else {
      setLgShow(false);
    }
  };

  useEffect(() => {
    // merubah data totalHarga realtime 
    setTotalHarga(props.harga * jumlahMenu);
  }, [jumlahMenu]);

  useEffect(() => {
    if(addLoading){
      Swal.fire({
          title: 'Sabar',
          html: 'memasukan pesanan ke keranjang',
          timer: 3000,
          didOpen: () => {
            Swal.showLoading()
          },
          willClose: () => {
            Swal.fire(
              'Berhasil!',
              'Pesanan kamu telah di masukan ke keranjang!',
              'success'
            )

            handleModalTogle();
          }
      })
    } 
    
  },[addLoading]);
 

  const handleChange = (e) => {
    setKeterangan(e.target.value);
  };

  const handlePlus = () => {
    setJumlahMenu(jumlahMenu + 1);
  };
  const handleMin = () => {
    if (jumlahMenu === 1) {
      setJumlahMenu(1);
    } else {
      setJumlahMenu(jumlahMenu - 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    if(userId === undefined) {
      Swal.fire("maaf :(", "login terlebih dahulu", "error");
    }else {
      e.preventDefault();
      addKeranjang({
        variables: {
          "category": props.category,
          "gambar": props.image,
          "harga": totalHarga,
          "id_user": userId,
          "jumlah": jumlahMenu,
          "kode" : props.kode,
          "nama": props.nama,
          "keterangan": `${props.nama} : ${keterangan}`
        },
      });
    }

   

    // console.log({
    //   "category": props.category,
    //     "gambar": props.image,
    //     "harga": totalHarga,
    //     "id_user": 1,
    //     "jumlah": jumlahMenu,
    //     "kode" : `${props.kode}`,
    //     "nama": props.nama,
    //     "keterangan" : keterangan
    // })

    // console.log(props)
  };

  return (
    <div className="d-grid gap-2">
      <Button
        onClick={() => {
          handleModalTogle();
        }}
        variant="primary"
        style={{ backgroundColor: "#F17228" }}
        className=" border-0"
      >
        Pesan
      </Button>
      <Modal
        size="lg"
        show={lgShow}
        onHide={() => handleModalTogle()}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            {props.nama}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <img
                variant="top"
                src={`img/makanan/${props.image}`}
                className="rounded"
                style={{ width: "100%" }}
                alt="detailImage"
              />
            </Col>
            <Col>
              <Form onSubmit={handleSubmit}>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>
                    <strong>Harga :</strong>
                  </Form.Label>
                  <Row style={{ width: "50%", textAlign: "left" }}>
                    <Col>Rp.{numberWithCommas(totalHarga) }</Col>
                  </Row>
                  <Form.Label>
                    <strong>Jumlah Pesanan :</strong>
                  </Form.Label>
                  <Row style={{ width: "50%" }}>
                    <Col
                      onClick={handleMin}
                      className=" d-flex align-self-center"
                    >
                      <FaMinusSquare />
                    </Col>
                    <Col>{jumlahMenu}</Col>
                    <Col
                      onClick={handlePlus}
                      className=" d-flex align-self-center"
                    >
                      <FaPlusSquare />{" "}
                    </Col>
                  </Row>
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label>keterangan</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder={keterangan}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleModalTogle}>
                    Close
                  </Button>
                  <Button variant="primary" type="submit">
                    Pesan
                  </Button>
                </Modal.Footer>
              </Form>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </div>
  );
}
