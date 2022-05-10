import React from 'react'
import { Col, Row } from 'react-bootstrap'
import './footer.css';

export default function Footer() {
  return (
    <div style={{ height: "285px", backgroundColor: "#212121", color: "white"}} className="d-flex justify-content-center align-self-center">
        <div className="d-flex align-self-center" style={{width: "100%"}}>
            <div className=" mt-5" style={{width: "100%"}}>
            <Row className=" container-footer row-col-2" style={{width: "40%"}}>
                <Col>
                    <div className='footer-content opacity-75'>
                    <p className='footer-title'><strong>Company</strong></p>
                        <p>About us</p>
                        <p>Team </p>
                        <p>Careers</p>
                        <p>Blog</p>
                    </div>
                </Col>
                <Col >
                    <div className='footer-content opacity-75'>
                    <p className='footer-title'><strong>Contact</strong></p>
                        <p>Help & Support </p>
                        <p>Partner with us </p>
                        <p>Ride with us</p>
                    </div>
                </Col>
                <Col>
                    <div className='footer-content opacity-75'>
                    <p className='footer-title'><strong>Legal</strong></p>
                    <p>Terms & Conditions </p>
                    <p>Refund & Cancellation </p>
                    <p>Privacy Policy </p>
                    <p>Cookie Policy </p>
                    </div>
                </Col>
            </Row>
            <Row className='copyright'>
                <div>
                    <p>All rights Reserved <strong>© Foodys, 2022</strong></p>
                </div>
            </Row>
            </div>
        </div>
    </div>
  )
}
