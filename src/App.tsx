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
import Fav from "./Fav/Fav";

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
  const [isFavOpen, setIsFavOpen] = useState<boolean>(false);
  const [favCart, setFavCart] = useState<number[]>(() => {
    const saved = localStorage.getItem("favCart");
    if (saved) {
      return JSON.parse(saved);
    } else {
      return [];
    }
  });

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
    localStorage.setItem("favCart", JSON.stringify(favCart));
  }, [cart, favCart]);

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

function onFav(id: number) {
  if (favCart.includes(id)) {
    setFavCart(favCart.filter((favId) => favId !== id));
  } else {
    setFavCart([...favCart, id]);
  }
}

  const totalCount = cart.reduce((ac, pr) => ac + pr.quantity, 0);
  const totalFavCount = favCart.length;

  return (
    <>
      <Header
        totalCount={totalCount}
        isCartOpen={isCartOpen}
        setIsCartOpen={setIsCartOpen}
        totalFavCount={totalFavCount}
        isFavOpen={isFavOpen}
        setIsFavOpen={setIsFavOpen}
      />
      <Fav favProducts={products.filter((pr) => favCart.includes(pr.id))} isFavOpen={isFavOpen} setIsFavOpen={setIsFavOpen} onFav={onFav} onBuy={onBuy}/>
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
        onFav={onFav}
        favCart={favCart}
      />
      <About />
      <Faq />
      <Contacts />
      <Footer />
    </>
  );
}

export default App;
