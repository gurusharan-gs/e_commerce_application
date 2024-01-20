import "./App.css";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Shoppage from "./pages/Shoppage";
import ProductDetails from "./pages/ProductDetails";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/collections/all" element={<Shoppage />} />
        <Route path="/collections/all/:id" element={<ProductDetails />} />
      </Routes>
    </div>
  );
}

export default App;
