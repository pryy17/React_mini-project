import { useSelector } from "react-redux";
import CardMenu from "./CardMenu";
import { Row, Col } from "react-bootstrap";
import Categories from "./Categories";
import { useEffect, useState } from "react";
import AOS from 'aos';

export default function MenuList(props) {
  const dataMenu = useSelector((state) => state.products.menus);
  const dataCategories = useSelector((state) => state.products.categories);
  const [dataFilter, setDataFilter] = useState(dataMenu);

  // menyimpan data menu dari redux ke dataFilter
  useEffect(()=>{
    setDataFilter(dataMenu);
  },[dataMenu])

  useEffect(() => {
    AOS.init({
    });
  }, []);

  // fungsi filter data menu
  const handleFilter = (category) => {
    if(category === "Makanan"){
      let menu = dataMenu.filter((menu)=>{
        return menu.category.nama === "Makanan"
      });
      setDataFilter(menu);
    }

    if(category === "Minuman"){
      let menu = dataMenu.filter((menu)=>{
        return menu.category.nama === "Minuman"
      });
      setDataFilter(menu);
    }

    if(category === "Cemilan"){
      let menu = dataMenu.filter((menu)=>{
        return menu.category.nama === "Cemilan"
      });
      setDataFilter(menu);
    }

  }

  const menus = dataFilter; 
  return (
    <div className=" d-grid">
      <div
        className="d-flex justify-content-center text-decoration-none my-5"
        style={{ overflow: "hidden" }}
      >
        <div>
          <Row className="my-5">
            <h1>Search by Food</h1>
          </Row>
          <Row className="d-flex justify-content-between row-cols-2 row-cols-sm-3">
            {dataCategories.map((data) => (
              <Col key={data.id} data-aos={"flip-right"}>
                {/* mengirim fungsi filterMenu ke categories  */}
                <Categories nama={data.nama} filterMenu={handleFilter}/>
              </Col>
            ))}
          </Row>
        </div>
      </div>

      <div
        className="d-flex justify-content-center text-decoration-none my-5"
        style={{ overflow: "hidden" }}
      >
        <div>
          <Row className="mb-3">
            <h1>Menu list</h1>
          </Row>
          <Row className="d-flex justify-content-center">
            {/* menampilkan menu sesuai categories */}
            {menus?.slice(0, props.displayData).map((menu) => (
              <Col className=" mb-4 d-flex justify-content-center" key={menu.id} data-aos={"zoom-in-up"}>
                <CardMenu
                  nama={menu.nama}
                  harga={menu.harga}
                  category={menu.category.nama}
                  image={menu.gambar}
                  jumlah={menu.jumlah}
                  kode={menu.kode}
                />
              </Col>
            ))
            }
            
          
          </Row>
        </div>
      </div>
    </div>
  );
}
