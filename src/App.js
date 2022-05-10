import "./App.css";
import Home1 from "./pages/Home1";
import Navbar from "./components/Navbars";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { fetchData } from "./redux/menuSlice";
import Menu from "./pages/Menu";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get("https://api.jsonbin.io/b/6267596e25069545a3293fab")
      .then((data) => {
        let menus = {
          products: data.data.products,
          categories: data.data.categories
        }
        dispatch(fetchData(menus));

      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home1 />} />
        <Route path="/menu" element={<Menu />} />
      </Routes>
      
      <div style={{ overflow: "hidden"}} >
        <div >
          <Footer />
        </div>
      </div>
      
    </div>
  );
}

export default App;
