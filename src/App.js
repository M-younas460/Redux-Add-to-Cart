import Nav from "./components/nav/nav";
import Products from "./components/products/products";
import Cart from "./components/cart/cart";
import { Routes, Route } from "react-router-dom";
import Checkout from "./components/checkout/Checkout";
import Admin from "./components/admin/Admin";
function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </>
  );
}

export default App;
