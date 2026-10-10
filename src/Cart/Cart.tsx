import type { CartItem } from "../data/products";
import products from "../data/products";

type CartProps = {
  isCartOpen: boolean;
  cart: CartItem[];
};

function Cart(props: CartProps) {
  const cartProducts = props.cart.map((cart_pr) => {
    const foundPr = products.find((pr) => pr.id === cart_pr.id)
    if (foundPr) {
        return {...foundPr, quantity: cart_pr.quantity}
    }
  })
  return <>{props.isCartOpen ? <div>Корзина</div> : null}</>;
}

export default Cart