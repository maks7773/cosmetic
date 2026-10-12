import { Trash2, X } from "lucide-react";
import type { CartItem } from "../data/products";
import products from "../data/products";
import "./Cart.css"

type CartProps = {
  isCartOpen: boolean;
  cart: CartItem[];
};

function Cart(props: CartProps) {
  const cartProducts = props.cart.map((cart_pr) => {
    const foundPr = products.find((pr) => pr.id === cart_pr.id);
    if (foundPr) {
      return { ...foundPr, quantity: cart_pr.quantity };
    }
  }).filter((pr) => pr !== undefined);
  return <>
  {props.isCartOpen ? <div className="cart-overlay">
    <div className="cart-window">
      <div className="cart-header">
        <h2>Корзина</h2>
        {/* TODO: закрыть корзину по клику */}
        <button className="cart-close" aria-label="Закрыть корзину">
          <X size={20} strokeWidth={1.8} aria-hidden="true" />
        </button>
      </div>
      {cartProducts.map((pr) => {
        return (
          <div className="cart-item" key={pr.id}>
            <img src={pr.img} alt={pr.name} className="incart-img" />
            <div className="cart-item-info">
              <h3>{pr.name}</h3>
              <p>{pr.price} ₽</p>
              <p>{pr.quantity} шт.</p>
            </div>
            <div className="cart-item-actions">
              <p>{pr.price * pr.quantity} ₽</p>
              {/* TODO: удалить товар из корзины */}
              <button className="delete-btn">
                <Trash2 size={14} strokeWidth={1.8} aria-hidden="true" />
                Удалить
              </button>
            </div>
          </div>
        )
      })}
    </div>
  </div> : null}
  </>;
}

export default Cart;
