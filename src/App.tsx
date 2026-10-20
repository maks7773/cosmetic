import { useEffect, useState } from "react";
import Header from "./Header/Header";
import "./App.css";
import Catalog from "./Catalog/Catalog";
import Cart from "./Cart/Cart";
import type { CartItem } from "./data/products";

function App() {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem("savedCart")
    if (saved) {
      return JSON.parse(saved)
    } else {
      return []
    }
  });
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem("savedCart", JSON.stringify(cart))
  }, [cart])

  function onBuy(id: number) {
    const foundItem = cart.find((pr) => pr.id === id);
    if (foundItem) {
      const newCart = cart.map((pr) => {
        if (pr.id === id) {
          return { ...pr, quantity: pr.quantity + 1 };
        }
        return pr;
      });
      setCart(newCart);
    } else {
      setCart([...cart, { id: id, quantity: 1 }]);
    }
  }

  function removeOneProduct(id: number) {
    const foundItem = cart.find((pr) => pr.id === id);

    if (foundItem && foundItem.quantity > 1) {
      const newCart = cart.map((pr) => {
        if (pr.id === id) {
          return { ...pr, quantity: pr.quantity - 1 };
        }
        return pr;
      });
      setCart(newCart);
    } else {
      const newCart = cart.filter((pr) => pr.id !== id);
      setCart(newCart);
    }
  }

  function deleteProduct(id: number) {
    const newCart = cart.filter((pr) => pr.id !== id);
    setCart(newCart);
  }

  function clearCart () {
    setCart([])
  }

  const totalCount = cart.reduce((ac, pr) => ac + pr.quantity, 0);

  return (
    <>
      <Header
        totalCount={totalCount}
        isCartOpen={isCartOpen}
        setIsCartOpen={setIsCartOpen}
      />
      <Cart
        isCartOpen={isCartOpen}
        setIsCartOpen={setIsCartOpen}
        deleteProduct={deleteProduct}
        removeOneProduct={removeOneProduct}
        onBuy={onBuy}
        cart={cart}
        clearCart={clearCart}
      />
      <Catalog onBuy={onBuy} />
    </>
  );
}

export default App;
