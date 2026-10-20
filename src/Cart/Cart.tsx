import { Minus, Plus, ShoppingBag, Trash2, X, CircleCheck } from "lucide-react";
import type { CartItem } from "../data/products";
import products from "../data/products";
import Checkout from "../Checkout/Checkout";
import "./Cart.css";
import { useState } from "react";

type CartProps = {
  isCartOpen: boolean;
  setIsCartOpen: (value: boolean) => void;
  deleteProduct: (id: number) => void;
  removeOneProduct: (id: number) => void;
  onBuy: (id: number) => void;
  cart: CartItem[];
  clearCart: () => void;
};

function Cart(props: CartProps) {
  const cartProducts = props.cart
    .map((cart_pr) => {
      const foundPr = products.find((pr) => pr.id === cart_pr.id);
      if (foundPr) {
        return { ...foundPr, quantity: cart_pr.quantity };
      }
    })
    .filter((pr) => pr !== undefined);

  const totalPrice = cartProducts.reduce(
    (ac, pr) => ac + pr.price * pr.quantity,
    0,
  );
  const [isCheckout, setIsCheckout] = useState<boolean>(false);
  const [isSent, setIsSent] = useState<boolean>(false);

  function closeCart() {
    props.setIsCartOpen(false);
    setIsSent(false);
    setIsCheckout(false);
  }

  if (props.isCartOpen === false) return null;
  let content;
  if (isSent) {
    content = (
      <div className="checkout-success">
        <CircleCheck size={52} strokeWidth={1.3} aria-hidden="true" />
        <p className="checkout-success-title">Спасибо, заказ принят!</p>
        <p className="checkout-success-text">
          Мы свяжемся с вами в ближайшее время, чтобы подтвердить заказ.
        </p>

        <button
          className="checkout-submit"
          onClick={() => closeCart()}
        >
          Продолжить покупки
        </button>
      </div>
    );
  } else if (cartProducts.length === 0) {
    content = (
      <div className="cart-empty">
        <ShoppingBag size={44} strokeWidth={1.3} aria-hidden="true" />
        <p className="cart-empty-title">Корзина пуста</p>
        <p className="cart-empty-text">
          Загляните в каталог — там много интересного
        </p>
        <button
          className="cart-empty-btn"
          onClick={() => closeCart()}
        >
          Перейти в каталог
        </button>
      </div>
    );
  } else if (isCheckout) {
    content = (
      <Checkout
        totalPrice={totalPrice}
        setIsCheckout={setIsCheckout}
        cartProducts={cartProducts}
        
        clearCart={props.clearCart}
        setIsSent={setIsSent}
      />
    );
  } else {
    content = (
      <>
        {cartProducts.map((pr) => {
          return (
            <div className="cart-item" key={pr.id}>
              <img src={pr.img} alt={pr.name} className="incart-img" />
              <div className="cart-item-info">
                <h3>{pr.name}</h3>
                <p>{pr.price} ₽</p>
                <div className="qty">
                  <button
                    className="qty-btn"
                    aria-label="Убрать одну штуку"
                    onClick={() => props.removeOneProduct(pr.id)}
                  >
                    <Minus size={14} strokeWidth={2} aria-hidden="true" />
                  </button>
                  <span className="qty-value">{pr.quantity}</span>

                  <button
                    className="qty-btn"
                    aria-label="Добавить одну штуку"
                    onClick={() => props.onBuy(pr.id)}
                  >
                    <Plus size={14} strokeWidth={2} aria-hidden="true" />
                  </button>
                </div>
              </div>
              <div className="cart-item-actions">
                <p>{pr.price * pr.quantity} ₽</p>
                <button
                  className="delete-btn"
                  onClick={() => props.deleteProduct(pr.id)}
                >
                  <Trash2 size={14} strokeWidth={1.8} aria-hidden="true" />
                  Удалить
                </button>
              </div>
            </div>
          );
        })}
        <div className="cart-total">
          <span className="cart-total-label">Итого</span>
          <span className="cart-total-price">{totalPrice} ₽</span>
          {/* TODO: открыть форму заказа */}
          <button
            className="cart-checkout-btn"
            onClick={() => setIsCheckout(true)}
          >
            Оформить заказ
          </button>
        </div>
      </>
    );
  }

  return (
    <div
      className="cart-overlay"
      onClick={() => closeCart()}
    >
      <div className="cart-window" onClick={(e) => e.stopPropagation()}>
        <div className="cart-header">
          <h2>Корзина</h2>
          <button
            className="cart-close"
            aria-label="Закрыть корзину"
            onClick={() => closeCart()}
          >
            <X size={20} strokeWidth={1.8} aria-hidden="true" />
          </button>
        </div>

        {content}
      </div>
    </div>
  );
}

export default Cart;
