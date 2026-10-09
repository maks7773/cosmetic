import type { propsProductCard } from "../data/products";
import "./ProductCard.css";

function ProductCard(props: propsProductCard) {
  return (
    <div className="card">
      <img src={props.img} className="product-img" alt="" />
      <h2 className="product-name">{props.name}</h2>
      <div className="cost-btn">
        <p className="cost">{props.price} ₽</p>
        <button className="in-cart">В корзину</button>
      </div>
    </div>
  );
}

export default ProductCard;
