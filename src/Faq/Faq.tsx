import { ChevronDown } from "lucide-react";
import "./Faq.css";
import { useState } from "react";


const questions = [
  {
    question: "Как оформить заказ?",
    answer:
      "Добавьте товары в корзину, нажмите «Оформить заказ» и заполните имя, телефон и адрес. Мы свяжемся с вами, чтобы подтвердить заказ.",
  },
  {
    question: "Как проходит доставка?",
    answer: "Здесь будет ответ: способы доставки, сроки и стоимость.",
  },
  {
    question: "Как можно оплатить заказ?",
    answer: "Здесь будет ответ: какие способы оплаты вы принимаете.",
  },
  {
    question: "Можно ли вернуть товар?",
    answer: "Здесь будет ответ: условия возврата и обмена.",
  },
];

function Faq() {
  
  const [ currentQuestion, setCurrentQuestion ] = useState<number | null>(null)

  return (
    <section id="faq" className="section faq">
      <h2 className="section-title">Частые вопросы</h2>

      <div className="faq-list">
        {questions.map((q, index) => {
          
          const isOpen = index === currentQuestion;

          return (
            <div className={isOpen ? "faq-item open" : "faq-item"} key={q.question}>
              
              <button className="faq-question" aria-expanded={isOpen} onClick={() => isOpen ? setCurrentQuestion(null) : setCurrentQuestion(index)}>
                <span>{q.question}</span>
                <ChevronDown size={20} strokeWidth={1.8} aria-hidden="true" />
              </button>
              {isOpen && <p className="faq-answer">{q.answer}</p>}
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Faq;
