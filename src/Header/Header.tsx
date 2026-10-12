import { ArrowRight, ShoppingBag } from "lucide-react";
import "./Header.css";

type HeaderProps = {
  totalCount: number;
  isCartOpen: boolean;
  setIsCartOpen: (value: boolean) => void;
}

function Header(props: HeaderProps) {
  return (
    <header>
      <div className="head-content">
        <h1 className="brand-name">Evangele</h1>
        <div className="links-head-content">
          <nav className="links">
            <a href="" className="header-link">
              Каталог
            </a>
            <a href="" className="header-link">
              О Нас
            </a>
            <a href="" className="header-link">
              FAQ
            </a>
            <a href="" className="header-link">
              Контакты
            </a>
          </nav>
          <button
            className="cart-logo"
            aria-label="Открыть корзину"
            onClick={() => props.setIsCartOpen(!props.isCartOpen)}
          >
            <ShoppingBag size={22} strokeWidth={1.6} aria-hidden="true" />
            <span className="cart-count">{props.totalCount}</span>
          </button>
        </div>
      </div>
      <div className="ad">
        <div className="ad-text">
          <h1>Choose a Better You</h1>
          <p>Feel better with evangele, lalallala</p>
          <button className="go-shop">
            К Каталогу
            <ArrowRight size={16} strokeWidth={1.8} aria-hidden="true" />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
