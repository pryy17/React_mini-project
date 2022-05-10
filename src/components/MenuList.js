import { useSelector } from "react-redux";
import CardMenu from "./CardMenu";
import { Row, Col } from "react-bootstrap";
import Categories from "./Categories";

export default function MenuList(props) {
  const dataMenu = useSelector((state) => state.products.menus);
  const dataCategories = useSelector((state) => state.products.categories);
  

  const menus = dataMenu; 
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
          <Row className="d-flex justify-content-between">
            {dataCategories.map((data) => (
              <Col key={data.id}>
                <Categories nama={data.nama} />
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
          <Row className="d-flex justify-content-between">
            {menus?.slice(0, props.displayData).map((menu) => (
              <Col className=" mb-4 d-flex justify-content-center" key={menu.id}>
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
