import { Droplet, Gift, Heart, MessageCircle, ShoppingBag } from "lucide-react";
import "./Header.css";

type HeaderProps = {
  totalCount: number;
  isCartOpen: boolean;
  setIsCartOpen: (value: boolean) => void;
  totalFavCount: number;
  isFavOpen: boolean;
  setIsFavOpen: (value: boolean) => void
}

// TODO: проверить тексты в плашках вместе с владелицей магазина
const highlights = [
  {
    icon: Gift,
    title: "Оригинальная корейская косметика",
    text: "SKIN1004, Round Lab, Biodance, Medicube",
  },
  {
    icon: Droplet,
    title: "Очищение, увлажнение, маски",
    text: "Всё для ежедневного ухода за кожей",
  },
  {
    icon: MessageCircle,
    title: "Поможем с выбором",
    text: "Напишите нам — подскажем, что подойдёт",
  },
];

function Header(props: HeaderProps) {
  return (
    <>
      <header className="site-header">
        <div className="head-content">
          <a href="#top" className="brand-name">Evangele</a>
          <div className="links-head-content">
            <nav className="links">
              <a href="#catalog" className="header-link">
                Каталог
              </a>
              <a href="#about" className="header-link">
                О нас
              </a>
              <a href="#faq" className="header-link">
                FAQ
              </a>
              <a href="#contacts" className="header-link">
                Контакты
              </a>
            </nav>
            <div className="header-actions">
              <button
                className="fav-logo"
                aria-label="Открыть избранное"
                onClick={() => props.setIsFavOpen(!props.isFavOpen)}
              >
                <Heart size={21} strokeWidth={1.5} aria-hidden="true" />
                <span className="cart-count">{props.totalFavCount}</span>
              </button>
              <button
                className="cart-logo"
                aria-label="Открыть корзину"
                onClick={() => props.setIsCartOpen(!props.isCartOpen)}
              >
                <ShoppingBag size={21} strokeWidth={1.5} aria-hidden="true" />
                <span className="cart-count">{props.totalCount}</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <section className="hero" id="top">
        {/* Капли-пузырьки на фоне, чисто для красоты */}
        <span className="drop drop-1" aria-hidden="true" />
        <span className="drop drop-2" aria-hidden="true" />
        <span className="drop drop-3" aria-hidden="true" />
        <span className="drop drop-4" aria-hidden="true" />
        <span className="drop drop-5" aria-hidden="true" />

        <div className="hero-inner">
          <div className="ad-text">
            <h1 className="hero-title">Evangele</h1>
            <p className="hero-pill">Корейский уход за кожей</p>
            <p className="hero-tagline">
              Очищение, увлажнение и&nbsp;бережный уход каждый день
            </p>
            <a href="#catalog" className="go-shop">
              Смотреть каталог
            </a>
          </div>

          <ul className="hero-panels">
            {highlights.map((h) => {
              const Icon = h.icon;
              return (
                <li className="hero-panel" key={h.title}>
                  <span className="hero-panel-icon">
                    <Icon size={22} strokeWidth={1.3} aria-hidden="true" />
                  </span>
                  <span>
                    <span className="hero-panel-title">{h.title}</span>
                    <span className="hero-panel-text">{h.text}</span>
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
}

export default Header;
