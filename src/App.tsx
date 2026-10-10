import { useEffect, useState } from "react";
import Header from "./Header/Header";
import "./App.css";
import Catalog from "./Catalog/Catalog";
import Cart from "./Cart/Cart";
import type { CartItem } from "./data/products";


function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [ isCartOpen, setIsCartOpen] = useState<boolean>(false)

  function onBuy(id: number) {
    const foundItem = cart.find((pr) => pr.id === id);
    if (foundItem) {
      const newCart = cart.map((pr) => {
        if (pr.id === id) {
          return {...pr, quantity: pr.quantity + 1}
          
        }
        return pr
      });
      setCart(newCart);
    } else {
      setCart([...cart, {id: id, quantity: 1}]);
    }
  }

  const totalCount = cart.reduce((ac, pr) => ac + pr.quantity,0)

  useEffect(() => console.log(cart),[cart])

  return (
    <>
      <Header totalCount = {totalCount} isCartOpen = {isCartOpen} setIsCartOpen = {setIsCartOpen} />
      <Cart isCartOpen = {isCartOpen} cart = {cart}/>
      <Catalog onBuy={onBuy} />
    </>
  );
}

export default App;
