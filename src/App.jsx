import Home from "./components/Home";
import Header from "./components/Header";
import Movies from "./components/Movies";
import Series from "./components/Series";
import Card from "./components/Card";
import Detail from "./components/Detail";
import { Route, Routes, useLocation } from "react-router-dom";
import Cart from "./components/Cart";
import { CartProvider } from "./context/CartContext";
import { useEffect } from "react";
export default function App() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0); // this method is great for getting back to top when switching rendering with Link
  }, [pathname]);
  return (
    <>
      <CartProvider>
        <section className="min-h-100vh flex flex-col">
          <Header />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/Movies" element={<Movies />}></Route>
            <Route path="/Series" element={<Series />}></Route>
            <Route path="/Cart" element={<Cart />}></Route>
            <Route path="/Card" element={<Card />}></Route>
            <Route path="/Detail/:id" element={<Detail />}></Route>
          </Routes>
        </section>
      </CartProvider>
    </>
  )
}