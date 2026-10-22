import { Clock, MapPin, Send } from "lucide-react";
import "./Contacts.css";

// TODO: заменить заглушки в квадратных скобках на настоящие данные
function Contacts() {
  return (
    <section id="contacts" className="section contacts">
      <h2 className="section-title">Контакты</h2>

      <div className="contacts-card">
        <p className="contacts-lead">
          Есть вопрос или нужна помощь с выбором? Напишите нам — ответим и подскажем.
        </p>

        <ul className="contacts-list">
          <li>
            <Send size={20} strokeWidth={1.6} aria-hidden="true" />
            <div>
              <span className="contacts-label">Telegram</span>
              <a href="#" className="contacts-value">[ссылка на канал]</a>
            </div>
          </li>
          <li>
            <MapPin size={20} strokeWidth={1.6} aria-hidden="true" />
            <div>
              <span className="contacts-label">Город</span>
              <span className="contacts-value">[город]</span>
            </div>
          </li>
          <li>
            <Clock size={20} strokeWidth={1.6} aria-hidden="true" />
            <div>
              <span className="contacts-label">Отвечаем</span>
              <span className="contacts-value">[например, ежедневно 10:00–20:00]</span>
            </div>
          </li>
        </ul>

        <a href="#" className="contacts-btn">
          <Send size={16} strokeWidth={1.8} aria-hidden="true" />
          Написать в Telegram
        </a>
      </div>
    </section>
  );
}

export default Contacts;
