import React from "react";
import { Col, Button, Row, Card } from "react-bootstrap";

export default function CardIcon(props) {
  return (
    <div>
      <Card style={{ width: "12rem" }} className=" border-0">
        <div style={{height : "13em"}}>
          <Card.Img variant="top" src={`img/icon/${props.gambar}`} />
        </div>
        <Card.Body className=" pb-0">
          <Card.Title>{props.title}</Card.Title>
          <Card.Text>{props.text}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}
