import { useEffect, useState } from "react";
import Header from "./Header/Header";
import "./App.css";
import Catalog from "./Catalog/Catalog";
import Cart from "./Cart/Cart";
import About from "./About/About";
import Faq from "./Faq/Faq";
import Contacts from "./Contacts/Contacts";
import Footer from "./Footer/Footer";
import { type Product, type CartItem } from "./data/products";

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setisLoading] = useState<boolean>(true);
  const [isError, setisError] = useState<boolean>(false);
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem("savedCart");
    if (saved) {
      return JSON.parse(saved);
    } else {
      return [];
    }
  });
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  useEffect(() => {
    async function loadProducts() {
      try {
        const response = await fetch("/products.json");
        const data = await response.json();
        setProducts(data);
      } catch {
        setisError(true);
      } finally {
        setisLoading(false);
      }
    }
    loadProducts();
  }, []);

  useEffect(() => {
    localStorage.setItem("savedCart", JSON.stringify(cart));
  }, [cart]);

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

  function clearCart() {
    setCart([]);
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
        products={products}
      />
      <Catalog
        onBuy={onBuy}
        products={products}
        isLoading={isLoading}
        isError={isError}
      />
      <About />
      <Faq />
      <Contacts />
      <Footer />
    </>
  );
}

export default App;
