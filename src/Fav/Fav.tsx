import { Heart, ShoppingBag, X } from "lucide-react";
import type { Product } from "../data/products";
import "./Fav.css";

type FavProps = {
  favProducts: Product[]; // товары, которые лежат в избранном
  isFavOpen: boolean;
  setIsFavOpen: (value: boolean) => void;
  onFav: (id: number) => void; // убрать из избранного
  onBuy: (id: number) => void; // положить в корзину
};

function Fav(props: FavProps) {
  if (props.isFavOpen === false) return null;

  return (
    <div className="cart-overlay" onClick={() => props.setIsFavOpen(false)}>
      <div className="cart-window" onClick={(e) => e.stopPropagation()}>
        <div className="cart-header">
          <h2>Избранное</h2>
          <button
            className="cart-close"
            aria-label="Закрыть избранное"
            onClick={() => props.setIsFavOpen(false)}
          >
            <X size={20} strokeWidth={1.8} aria-hidden="true" />
          </button>
        </div>

        {props.favProducts.length === 0 ? (
          <div className="cart-empty">
            <Heart size={44} strokeWidth={1.3} aria-hidden="true" />
            <p className="cart-empty-title">Здесь пока пусто</p>
            <p className="cart-empty-text">Нажимайте на сердечко у товаров, чтобы сохранить их сюда</p>
            <button className="cart-empty-btn" onClick={() => props.setIsFavOpen(false)}>
              Перейти в каталог
            </button>
          </div>
        ) : (
          props.favProducts.map((pr) => (
            <div className="fav-item" key={pr.id}>
              <img src={pr.img} alt={pr.name} className="incart-img" />
              <div className="fav-item-info">
                <h3>{pr.name}</h3>
                <p>{pr.price} ₽</p>
              </div>
              <div className="fav-item-actions">
                <button className="fav-to-cart" onClick={() => props.onBuy(pr.id)}>
                  <ShoppingBag size={15} strokeWidth={1.8} aria-hidden="true" />
                  В корзину
                </button>
                <button
                  className="fav-remove"
                  aria-label="Убрать из избранного"
                  onClick={() => props.onFav(pr.id)}
                >
                  <Heart size={18} strokeWidth={1.8} fill="currentColor" aria-hidden="true" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Fav;
