import React from "react";
import { Col, Button, Row, Card } from "react-bootstrap";
import CardIcon from "../components/CardIcon";
import CardMenu from "../components/CardMenu";
import CardSlider from "../components/CardSlider";
import "./Home.css";
import { useSelector, useDispatch } from "react-redux";
import { tampil } from "../redux/menuSlice";
import Categories from "../components/Categories";
import MenuList from "../components/MenuList";
import CardBig from "../components/CardBig";

export default function Home1() {
  const dispatch = useDispatch();

  return (
    <div>
      <div className="header-container">
        <Row style={{ height: "12rem" }}>
          <Col className=" d-flex align-items-center justify-content-center text-center text-md-start">
            <div>
              <strong style={{ color: "white", fontSize: "60px" }}>
                Are you starving?
              </strong>{" "}
              <br />
              <p>dengan hanya beberapa click, bayar dan kenyang</p>
              <Button type="button" className="btn btn-light">
                <strong>Pesan Sekarang</strong>
              </Button>
            </div>
          </Col>
          <Col className="mangkok d-flex align-items-center justify-content-center text-start">
            <img src="img/image.png" alt="mangkok" className=" pt-5" />
          </Col>
        </Row>
      </div>

      <div
        className="d-flex justify-content-center text-decoration-none mt-5"
        style={{ overflow: "hidden" }}
      >
        <div>
          <Row>
            <h1>How does it works</h1>
          </Row>
          <Row className="d-flex justify-content-center row-cols-1 row-cols-lg-3 row-cols-md-2">
            <Col className="d-flex justify-content-center">
              <CardIcon
                gambar={"menu.png"}
                title={"Choose order"}
                text={"Check over hundreds of menus to pick your favorite food"}
              />
            </Col>
            <Col className="d-flex justify-content-center">
              <CardIcon
                gambar={"payment.png"}
                title={"Pay advanced"}
                text={
                  "It's quick, safe, and simple. Select several methods of payment"
                }
              />
            </Col>
            <Col className="d-flex justify-content-center">
              <CardIcon
                gambar={"donut.png"}
                title={"Enjoy meals"}
                text={"Food is made and delivered directly to your home."}
              />
            </Col>
          </Row>
        </div>
      </div>

      <div className="d-flex justify-content-evenly text-decoration-none mt-5">
        <div style={{ overflow: "hidden", width: "60em" }}>
          <Row className="my-5">
            <h1>Popular food</h1>
          </Row>
          <Row className="d-flex justify-content-center">
            <div className="cardSlider d-flex justify-content-center">
              <CardSlider />
            </div>
          </Row>
        </div>
      </div>

      <div className="d-flex justify-content-evenly text-decoration-none mt-5">
        <div style={{ overflow: "hidden", width: "60em" }}>
          <MenuList />
        </div>
      </div>

      <div className="d-flex justify-content-evenly text-decoration-none mt-5">
        <div style={{ width: "60em" }}>
          <CardBig
            position={"left"}
            className=" mb-5"
            foodName={"Crispy sandwiches"}
            title={"Best deals"}
            text={
              "Enjoy the large size of sandwiches. Complete perfect slice of sandwiches."
            }
            image={"crispy sandwiches.png"}
          />
          <CardBig
            position={"right"}
            className=" mb-5"
            foodName={"Crispy sandwiches"}
            title={"Best deals"}
            text={
              "Enjoy the large size of sandwiches. Complete perfect slice of sandwiches."
            }
          />
          <CardBig
            position={"left"}
            className=" mb-5"
            foodName={"Crispy sandwiches"}
            title={"Best deals"}
            text={
              "Enjoy the large size of sandwiches. Complete perfect slice of sandwiches."
            }
          />
        </div>
      </div>

      <div
        style={{ height: "285px" }}
        className="footer-top d-flex justify-content-center align-self-center"
      >
        <div className=" d-flex align-self-center">
          <div style={{ width: "30em" }}>
            <Row>
              <h1>Are you ready to order with the best deals?</h1>
            </Row>
            <Row>
              <div style={{ width: "100%" }}>
                <Button
                  variant="primary"
                  style={{ backgroundColor: "#F17228" }}
                  className=" border-0"
                  >
                  Tunggu apa lagi pesan sekarang
                </Button>
              </div>
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
}
