import "./App.css";
import Home1 from "./pages/Home1";
import Navbar from "./components/Navbars";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { fetchData } from "./redux/menuSlice";

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
      <Home1 />
    </div>
  );
}

export default App;
