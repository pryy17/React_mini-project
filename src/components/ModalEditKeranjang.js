import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { FaMinusSquare, FaPlusSquare } from "react-icons/fa";
import { gql, useMutation } from "@apollo/client";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { FiEdit} from "react-icons/fi";

const UPDATE_KERANJANG = gql`
mutation MyMutation($id: Int = "", $keterangan: String = "", $jumlah: Int = 10, $harga: Int = 10) {
    update_pesanan_keranjang(where: {id: {_eq: $id}}, _set: {keterangan: $keterangan, jumlah: $jumlah, harga: $harga}) {
      returning {
        id
        nama
      }
    }
  }  
`;

export default function ModalEditKeranjang(props) {
  const [lgShow, setLgShow] = useState(false);
  const [jumlahMenu, setJumlahMenu] = useState(props.jumlah);
  const [totalHarga, setTotalHarga] = useState(props.harga);
  const [keterangan, setKeterangan] = useState(props.keterangan);
  const [updateKeranjang, { loading: updateLoading, update: addError }] = useMutation(UPDATE_KERANJANG);
  
  const handleModalTogle = () => {
    if (lgShow === false) {
      setLgShow(true);
    } else {
      setLgShow(false);
    }
  };

  useEffect(() => {
    setTotalHarga((props.harga/props.jumlah) * jumlahMenu);
  }, [jumlahMenu]);
  

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    Swal.fire({
      title: 'Sabar',
      html: 'sedang mengubah pesanan',
      timer: 3500,
      didOpen: () => {
        Swal.showLoading()
      },
      willClose: () => {
        Swal.fire(
          'Berhasil!',
          'Pesanan kamu telah di update',
          'success'
        )
      }
    })
    setLgShow(false);
    await updateKeranjang({
        variables: {
            "keterangan": `${props.nama} : ${keterangan}`,
            "jumlah": jumlahMenu,
            "harga": totalHarga,
            "id": props.id
        },
      });
  };

  return (
    <div className="d-grid gap-2">
      <div onClick={handleModalTogle}>
        < FiEdit />
        </div>
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
                    <Col>Rp.{totalHarga}</Col>
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
                    Update
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
