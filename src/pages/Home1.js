import React, { useEffect } from "react";
import { Col, Button, Row } from "react-bootstrap";
import CardIcon from "../components/CardIcon";
import CardSlider from "../components/CardSlider";
import "./Home.css";
import MenuList from "../components/MenuList";
import CardBig from "../components/CardBig";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AOS from "aos";

export default function Home1() {
  const dataMenu = useSelector((state) => state.products.menus);
  const menu1 = dataMenu.filter((menu) => {
    return menu.nama === "Chicken Grilled";
  });
  const menu2 = dataMenu.filter((menu) => {
    return menu.nama === "Crispy Sandwiches";
  });
  const menu3 = dataMenu.filter((menu) => {
    return menu.nama === "Pizza";
  });
  console.log(dataMenu);

  useEffect(() => {
    AOS.init({
      duration: 2000,
    });
  }, []);

  return (
    <div>
      <div className="header-container">
        <Row style={{ height: "12rem" }}>
          <Col className=" d-flex align-items-center justify-content-center text-center text-md-start">
            <div className=" mt-5">
              <strong style={{ color: "white", fontSize: "60px" }}>
                Are you starving?
              </strong>{" "}
              <br />
              <p style={{ color: "#F17228" }}>
                <strong>
                  dengan hanya beberapa click! makanan datang mudah dan puas
                </strong>
              </p>
              <Link to="/menu">
                <Button
                  style={{ backgroundColor: "#F17228", border: "none" }}
                  type="button"
                >
                  <strong style={{ color: "white" }}>Pesan Sekarang</strong>
                </Button>
              </Link>
            </div>
          </Col>
          <Col className="mangkok d-flex align-items-center justify-content-center text-start">
            <img
              src="https://i.ibb.co/3h09x8h/Image.png"
              alt="mangkok"
              className=" pt-5"
            />
          </Col>
        </Row>
      </div>

      <div
        className="d-flex justify-content-center text-decoration-none mt-5"
        style={{ overflow: "hidden" }}
      >
        <div>
          <Row>
            <h1 data-aos={"flip-down"} style={{ color: "#FFB20E" }}>
              How does it works
            </h1>
          </Row>
          <Row className="d-flex justify-content-center row-cols-1 row-cols-lg-3 row-cols-md-2">
            <Col
              className="d-flex justify-content-center"
              data-aos={"fade-right"}
            >
              <CardIcon
                gambar={"menu.png"}
                title={"Choose order"}
                text={"Check over hundreds of menus to pick your favorite food"}
              />
            </Col>
            <Col className="d-flex justify-content-center" data-aos={"zoom-in"}>
              <CardIcon
                gambar={"payment.png"}
                title={"Pay advanced"}
                text={
                  "It's quick, safe, and simple. Select several methods of payment"
                }
              />
            </Col>
            <Col
              className="d-flex justify-content-center"
              data-aos={"fade-left"}
            >
              <CardIcon
                gambar={"donut.png"}
                title={"Enjoy meals"}
                text={"Food is made and delivered directly to your home."}
              />
            </Col>
          </Row>
        </div>
      </div>

      <div
        className="d-flex justify-content-evenly text-decoration-none mt-5"
        style={{ overflow: "hidden" }}
      >
        <div style={{ width: "60em" }}>
          <Row className="my-5">
            <h1>Popular food</h1>
          </Row>
          <Row>
            <div data-aos={"fade-left"}>
              <CardSlider />
            </div>
          </Row>
        </div>
      </div>

      <div className="d-flex justify-content-center mt-5">
        <div>
          <div className="menu-container">
            <MenuList displayData={8} />
          </div>
          <div>
            <Link to="/menu">
              <Button
                variant="primary"
                style={{ backgroundColor: "#F17228" }}
                className=" border-0"
              >
                More...
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div
        className="d-flex justify-content-evenly text-decoration-none mt-5"
        style={{ overflow: "hidden" }}
      >
        <div className="cardbig-container">
          <Row data-aos={"zoom-in-left"}>
            <CardBig
              position={"left"}
              className=" mb-5"
              foodName={menu1[0]?.nama}
              title={"Best deals"}
              text={
                "Get the best fried chicken smeared with a lip smacking lemon chili flavor. Check out best deals for fried chicken."
              }
              image={menu1[0]?.gambar}
              harga={menu1[0]?.harga}
              category={menu1[0]?.category.nama}
              kode={menu1[0]?.kode}
            />
          </Row>
          <Row data-aos={"zoom-in-right"}>
            <CardBig
              position={"right"}
              className=" mb-5"
              foodName={menu2[0]?.nama}
              title={"Best deals"}
              text={
                "Enjoy the large size of sandwiches. Complete perfect slice of sandwiches."
              }
              image={menu2[0]?.gambar}
              harga={menu2[0]?.harga}
              category={menu2[0]?.category.nama}
              kode={menu2[0]?.kode}
            />
          </Row>
          <Row data-aos={"zoom-in-left"}>
            <CardBig
              position={"left"}
              className=" mb-5"
              foodName={menu3[0]?.nama}
              title={"Best deals"}
              text={
                "Pair up with a friend and enjoy the hot and crispy pizza pops. Try it with the best deals."
              }
              image={menu3[0]?.gambar}
              harga={menu3[0]?.harga}
              category={menu3[0]?.category.nama}
              kode={menu3[0]?.kode}
            />
          </Row>
        </div>
      </div>

      <div
        style={{ height: "281px", overflow: "hidden" }}
        className="footer-top d-flex justify-content-center align-self-center"
      >
        <div className=" d-flex align-self-center">
          <div style={{ width: "30em" }}>
            <Row>
              <h1>Are you ready to order with the best deals?</h1>
            </Row>
            <Row>
              <div style={{ width: "100%" }} className=" mt-4">
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
