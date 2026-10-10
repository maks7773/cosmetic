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
          <div className="links">
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
          </div>
          <div className="cart-logo" onClick={() => props.setIsCartOpen(!props.isCartOpen)}>
            <img
              src="/710d9cf71f940ac47a8e8ef289f26d4b.jpg"
              className="cart-logo"
              alt=""
            />
            <span className="cart-count">{props.totalCount}</span>
          </div>
        </div>
      </div>
      <div className="ad">
        <div className="ad-text">
          <h1>Choose a Better You</h1>
          <p>Feel better with evangele, lalallala</p>
          <button className="go-shop">К Каталогу</button>
        </div>
      </div>
    </header>
  );
}

export default Header;
