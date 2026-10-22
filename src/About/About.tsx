import { Heart, Package, Sparkles } from "lucide-react";
import "./About.css";

// TODO: заменить тексты на настоящие (сейчас это заглушки)
const features = [
  {
    icon: Sparkles,
    title: "Подбираем с заботой",
    text: "Здесь будет текст о том, как вы выбираете косметику для магазина.",
  },
  {
    icon: Package,
    title: "Аккуратно упаковываем",
    text: "Здесь будет текст об упаковке и отправке заказов.",
  },
  {
    icon: Heart,
    title: "Всегда на связи",
    text: "Здесь будет текст о том, как вы помогаете с выбором.",
  },
];

function About() {
  return (
    <section id="about" className="section about">
      <h2 className="section-title">О нас</h2>
      <p className="about-lead">
        Evangele — здесь будет короткий рассказ о магазине: кто вы, с чего всё
        началось и почему вам можно доверять.
      </p>

      <div className="about-features">
        {features.map((f) => {
          const Icon = f.icon;
          return (
            <div className="about-feature" key={f.title}>
              <div className="about-icon">
                <Icon size={22} strokeWidth={1.6} aria-hidden="true" />
              </div>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default About;
