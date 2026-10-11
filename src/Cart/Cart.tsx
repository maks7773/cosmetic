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
  {props.isCartOpen ? <div className="cart-window">
    {cartProducts.map((pr) => {
      return (
        <div className="cart-item" key={pr.id}>
          <img src={pr.img} alt="" className="incart-img" />
          <div className="cart-item-info">
            <h3>{pr.name}</h3>
            <p>{pr.price}</p>
            <p>{pr.quantity}</p>
          </div>
          <div className="cart-item-actions">
            <p>{pr.price * pr.quantity}</p>
            <button className="delete-btn">Удалить</button>
          </div>
        </div>
      )
    })}
  </div> : null}
  </>;
}

export default Cart;
