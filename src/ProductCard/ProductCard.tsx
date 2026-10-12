import { ShoppingBag } from "lucide-react";
import type { propsProductCard } from "../data/products";
import "./ProductCard.css";

function ProductCard(props: propsProductCard) {
  return (
    <div className="card">
      <div className="product-img-wrap">
        <img src={props.img} className="product-img" alt={props.name} loading="lazy" />
      </div>
      <h2 className="product-name">{props.name}</h2>
      <div className="cost-btn">
        <p className="cost">{props.price} ₽</p>
        <button className="in-cart" onClick={() => props.onBuy(props.id)}>
          <ShoppingBag size={16} strokeWidth={1.8} aria-hidden="true" />
          В корзину
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
