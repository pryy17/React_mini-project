import React, {useEffect} from "react";
import './About.css';
import AOS from 'aos';

export default function About() {


  useEffect(() => {
    AOS.init({
      duration: 2000
    });
  }, []);

  return (
    <div className="about-body">
      <main className="tm-container masonry" style={{ backgroundColor: "#FFB20E" }}>
        <div
          className="item tm-bg-white tm-block tm-block-left"
          style={{ backgroundColor: "#FFB20E" }}
          data-aos={"fade-right"}
        >
          <p className="tm-hero-text" data-aos={"fade-right"}>
          <h1>ABOUT</h1>
            “foodys adalah restoran yang menawarkan berbagai 
            macam makanan dan minuman khas lokal maupun internasional . 
            foodys restoran berusaha memberikan pelayanan yang nyaman para customernya karena foodys, 
            easy to order food.”
          </p>
          <header className="tm-block-brand" >
            <div data-aos={"fade-right"} className="tm-bg-primary-dark tm-block-brand-inner" style={{ backgroundColor: "#F17228"}}>
              <i className="fas fa-braille fa-3x" />
              <h1 className="tm-brand-name">foodys</h1>
            </div>
          </header>
        </div>
        <div className="item" data-aos={"zoom-in-right"}>
          <img src="img/image-01.jpg" alt="Image" className="tm-img-left" />
        </div>
        <div
          className="item tm-bg-secondary tm-text-white tm-block tm-block-wider tm-block-pad tm-block-left-2"
          style={{ backgroundColor: "#F17228"}}
          data-aos={"fade-right"}
        >
          <i className="fas fa-award fa-4x tm-block-icon" />
          <p>
          di era teknologi saat ini restauran kami berfokus pada pelayanan digital dimana pelanggan dapat terlebih dahulu memesan menu bisa makan di tempat atau di antar
          </p>
          <div className="tm-text-right" >
            <a href="#" className="tm-btn tm-btn-small tm-btn-primary tm-mt" style={{ backgroundColor: "white", color: "#F17228", textDecoration: "none"}}>
              order now
            </a>
          </div>
        </div>
        <div className="item" >
          <img src="img/image-04.jpg" alt="Image" className="tm-img-left" data-aos={"zoom-in-left"}/>
        </div>
        <div
          className="tm-footer"
          id="tmFooter"
          
        >
        </div>
        <div className="item" data-aos={"zoom-in-left"}>
          <img src="img/image-02.jpg" alt="Image" />
        </div>
        <div
          className="item tm-block-right"
          
        >
          <div data-aos={"fade-left"} className="tm-block-right-inner tm-bg-primary-light tm-text-white tm-block tm-block-wider tm-block-pad"  style={{ backgroundColor: "#F17228"}}>
            <header>
              <h2 className="">foodys</h2>
            </header>
            <p>
            merupakan salah satu restoran Indonesia bercita rasa tinggi yang menyajikan aneka sajian khas Nusantara, tak terkecuali jajanan pasar.
            </p>
            <p className="tm-mt tm-mb-small">
             Untuk menu ya tentunya sudah bisa dibilang halal dan ada berbagai berbagai varian menu khas
            </p>
            {/* */}
          </div>
        </div>
        <div className="item" data-aos={"zoom-in-left"} >
          <img src="img/image-03.jpg" alt="Image" />
        </div>
        <div
          className="item tm-bg-white tm-block tm-form-section"
          
        >
          <div className="tm-form-container tm-block-pad tm-pb-0">
            
          </div>
          <div className="tm-form-section-tag">
            <div className="tm-bg-secondary tm-text-white tm-block-pad tm-form-section-tag-inner" style={{ backgroundColor: "white"}}>
              <header>
                <img src="img/logo.png" />
              </header>
              <p>
                
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
