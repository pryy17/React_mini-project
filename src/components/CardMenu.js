import React from "react";
import { Card } from "react-bootstrap";
import ModalDetail from "./ModalDetail";
import { numberWithCommas } from "../utils/numberWithCommas";

export default function CardMenu(props) {

  
  return (
    <div>
      <Card  style={{ width: "12rem" }} className="border-0">
        <div style={{height : "12rem"}}>
          <Card.Img variant="top" src={`img/makanan/${props.image}`} className="rounded" style={{height : "200px", width: "200px"}} />
        </div>
        <Card.Body className="px-0">
          <Card.Title className=" text-start">{ props.nama }</Card.Title>
          <Card.Text className="text-start">
            Rp{numberWithCommas(props.harga)}
          </Card.Text>
          <Card.Text className=" text-start" style={{ color : "#F17228" }}>
            { props.category }
          </Card.Text>
        </Card.Body>
        {/* mengirim data ke modal detail */}
        <ModalDetail image={props.image} nama={props.nama} harga={props.harga} category={props.category} kode={props.kode} />
      </Card>
    </div>
  );
}
