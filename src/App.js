import Nav from "./components/nav/nav";
import Products from "./components/products/products";
import Cart from "./components/cart/cart";
import { Routes, Route } from "react-router-dom";
import Checkout from "./components/checkout/Checkout";
function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />

      </Routes>
    </>
  );
}

export default App;
