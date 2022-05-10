import React, {useEffect, useState, useRef} from "react";
import CardMenu from "./CardMenu";
import { useSelector } from "react-redux";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const animation = { duration: 5000};
export default function CardSlider() {
  const menu = useSelector((state) => state.products.menus);

  let settings = {
    dots: true,
    speed: 500,
    slidesToShow: 4.5,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 1500,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 4.3,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  
  
  return (
    <div>
      <Slider className="slider-card" {...settings}>
        {
          menu.slice(0, 6).map((menu) => (
            <div key={menu.id}>
              <CardMenu
                nama ={menu.nama}
                harga={menu.harga}
                category={menu.category.nama}
                image={menu.gambar}
                kode={menu.kode}
              />
            </div>
          ))
        }
      </Slider>
    </div>
  );
}
