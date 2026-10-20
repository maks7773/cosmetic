import { ArrowLeft } from "lucide-react";
import "./Checkout.css";
import { useState } from "react";
import type { Product } from "../data/products";

type CheckoutProps = {
  totalPrice: number;
  setIsCheckout: (value: boolean) => void;
  cartProducts: (Product & { quantity: number })[];
  
  clearCart: () => void;
  setIsSent: (value: boolean) => void
};

function Checkout(props: CheckoutProps) {
  
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [adress, setAdress] = useState<string>("");
  const [com, setCom] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  function handleSumbit(e: React.FormEvent<HTMLFormElement>) {
    setIsSubmitted(true);
    e.preventDefault();
    if (name.trim() && phone.trim() && adress.trim()) {
      console.log({
        name,
        phone,
        adress,
        com,
        products: props.cartProducts,
        total: props.totalPrice,
      });
      props.setIsSent(true);
      props.clearCart()
    }
  }

 

  return (
    <form className="checkout" noValidate onSubmit={handleSumbit}>
      {/* TODO: вернуться к списку товаров */}
      <button
        type="button"
        className="checkout-back"
        onClick={() => props.setIsCheckout(false)}
      >
        <ArrowLeft size={16} strokeWidth={1.8} aria-hidden="true" />
        Назад к товарам
      </button>

      <h3 className="checkout-title">Оформление заказа</h3>

      <div className="field">
        <label htmlFor="checkout-name">Имя *</label>
        <input
          id="checkout-name"
          type="text"
          autoComplete="name"
          placeholder="Анна"
          value={name}
          className={isSubmitted && name.trim() === "" ? "invalid" : ""}
          onChange={(e) => setName(e.target.value)}
        />
        {isSubmitted && name.trim() === "" && (
          <p className="field-error">Введите имя</p>
        )}
      </div>

      <div className="field">
        <label htmlFor="checkout-phone">Телефон *</label>
        <input
          id="checkout-phone"
          type="tel"
          autoComplete="tel"
          placeholder="+7 900 000-00-00"
          value={phone}
          className={isSubmitted && phone.trim() === "" ? "invalid" : ""}
          onChange={(e) => setPhone(e.target.value)}
        />
        {isSubmitted && phone.trim() === "" && (
          <p className="field-error">Введите номер</p>
        )}
      </div>

      <div className="field">
        <label htmlFor="checkout-address">Адрес доставки *</label>
        <input
          id="checkout-address"
          type="text"
          autoComplete="street-address"
          placeholder="Город, улица, дом, квартира"
          value={adress}
          className={isSubmitted && adress.trim() === "" ? "invalid" : ""}
          onChange={(e) => setAdress(e.target.value)}
        />
        {isSubmitted && adress.trim() === "" && (
          <p className="field-error">Введите адрес</p>
        )}
      </div>

      <div className="field">
        <label htmlFor="checkout-comment">Комментарий</label>
        <textarea
          id="checkout-comment"
          rows={3}
          placeholder="Например, удобное время доставки"
          value={com}
          onChange={(e) => setCom(e.target.value)}
        />
      </div>

      <div className="checkout-footer">
        <div className="checkout-sum">
          <span>К оплате</span>
          <span className="checkout-sum-price">{props.totalPrice} ₽</span>
        </div>
        {/* TODO: при отправке проверить поля и вывести заказ в консоль */}
        <button type="submit" className="checkout-submit">
          Подтвердить заказ
        </button>
      </div>
    </form>
  );
}

export default Checkout;
