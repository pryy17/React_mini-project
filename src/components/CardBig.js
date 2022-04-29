import React from 'react'
import {Button, Col, Row } from 'react-bootstrap';
import './CardBig.css';

export default function CardBig(props) {

if(props.position === "left") {
    return (
        <div  className="card-big mb-5" style={{borderRadius: "17px"}}>
            <div>
                <Row style={{ height: "19em"}} className=" p-0 m-0 overflow-hidden">
                    <Col className=' text-start mx-5 align-self-center'>
                        <div>
                            <Row>
                                <h1 className=' p-0'>{props.title} <strong>{props.foodName}</strong></h1>
                            </Row>
                            <Row>
                                <p className=' p-0'>{props.text}</p>
                            </Row>
                            <Row>
                                <Button variant="primary" style={{ backgroundColor : "#F17228"}} className=" border-0">Pesan</Button>
                            </Row>
                        </div>
                    </Col>
                    <Col md={7} style={{ overflow : "hidden"}}>
                        <div style={{ overflow : "hidden", height: "19em"}}>
                            <img src={`img/makanan/${props.image}`} style={{ width: "37em"}} />
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    )
} else {
    return (
        <div  className="card-big mb-5" style={{borderRadius: "17px"}}>
            <div>
                <Row style={{ height: "19em"}} className=" p-0 m-0 overflow-hidden">
                    <Col md={7} className=" p-0 m-0 overflow-hidden">
                        <div style={{ backgroundColor: "red", height: "100%", }}>
                            <img />
                        </div>
                    </Col>
                    <Col className=' text-start mx-5 align-self-center'>
                        <div>
                            <Row>
                                <h1 className=' p-0'>Best deals <strong>Crispy sandwiches</strong></h1>
                            </Row>
                            <Row>
                                <p className=' p-0'>Enjoy the large size of sandwiches. Complete perfect slice of sandwiches.</p>
                            </Row>
                            <Row>
                                <Button variant="primary" style={{ backgroundColor : "#F17228"}} className=" border-0">Pesan</Button>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    )
}


}
