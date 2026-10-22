import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <span className="footer-brand">Evangele</span>
        <nav className="footer-links">
          <a href="#catalog">Каталог</a>
          <a href="#about">О нас</a>
          <a href="#faq">FAQ</a>
          <a href="#contacts">Контакты</a>
        </nav>
        <span className="footer-copy">© {new Date().getFullYear()} Evangele</span>
      </div>
    </footer>
  );
}

export default Footer;
