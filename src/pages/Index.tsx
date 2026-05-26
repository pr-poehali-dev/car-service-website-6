import React, { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/b9ca1be9-3d27-433f-8f4b-e8d3d5505d6f/files/a85c1155-c398-430f-819d-ab144810ae18.jpg";
const TIRE_IMAGE = "https://cdn.poehali.dev/projects/b9ca1be9-3d27-433f-8f4b-e8d3d5505d6f/files/f344ed71-2020-4a9e-9a5f-0bb0a2e989a8.jpg";
const AC_IMAGE = "https://cdn.poehali.dev/projects/b9ca1be9-3d27-433f-8f4b-e8d3d5505d6f/files/a051acb1-b0fd-4724-b98a-a9d635f1d135.jpg";

const services = [
  { icon: "Wrench", title: "Автосервис", desc: "Диагностика, ТО, ремонт двигателя и ходовой части. Опытные мастера с 15-летним стажем.", price: "от 800 ₽" },
  { icon: "Circle", title: "Шиномонтаж", desc: "Сезонная замена, балансировка, хранение шин. Работаем с любыми типами колёс.", price: "от 250 ₽" },
  { icon: "Wind", title: "Заправка кондиционеров", desc: "Дозаправка фреоном, чистка и антибактериальная обработка системы кондиционирования.", price: "от 1 500 ₽" },
  { icon: "Car", title: "Самосервис", desc: "Арендуй подъёмник и инструмент — чини свой автомобиль сам. Мастер рядом, поможет советом.", price: "от 500 ₽" },
  { icon: "Flame", title: "Сварка", desc: "Сварочные работы по кузову и выхлопной системе. Полуавтомат, аргон, электросварка — любая задача.", price: "от 100 ₽" },
  { icon: "Shield", title: "Кузовные работы", desc: "Рихтовка, покраска, полировка кузова. Убираем вмятины без покраски.", price: "от 2 000 ₽" },
];

const prices = [
  { category: "Шиномонтаж", items: [
    { name: "Снятие/установка колеса R13–R16", price: "250 ₽" },
    { name: "Снятие/установка колеса R17–R20", price: "350 ₽" },
    { name: "Балансировка 1 колеса", price: "150 ₽" },
    { name: "Ремонт прокола", price: "300 ₽" },
    { name: "Сезонная замена 4 колеса", price: "от 1 200 ₽" },
  ]},
  { category: "Кондиционеры", items: [
    { name: "Дозаправка фреоном R134a", price: "1 500 ₽" },
    { name: "Дозаправка фреоном R1234yf", price: "2 500 ₽" },
    { name: "Антибактериальная обработка", price: "800 ₽" },
    { name: "Полная замена фреона", price: "от 3 000 ₽" },
  ]},
  { category: "ТО и ремонт", items: [
    { name: "Замена масла (без материала)", price: "500 ₽" },
    { name: "Замена тормозных колодок", price: "от 800 ₽" },
    { name: "Диагностика ходовой", price: "600 ₽" },
    { name: "Компьютерная диагностика", price: "700 ₽" },
    { name: "Развал-схождение", price: "1 200 ₽" },
  ]},
];

const reviews = [
  { name: "Алексей М.", rating: 5, text: "Делал сезонную замену шин — всё быстро и качественно. Записался онлайн, не пришлось ждать. Рекомендую!", car: "Toyota Camry", date: "Март 2024" },
  { name: "Марина К.", rating: 5, text: "Заправили кондиционер за 40 минут, цена честная. Мастера объяснили всё доходчиво. Теперь только сюда!", car: "KIA Sportage", date: "Апрель 2024" },
  { name: "Дмитрий П.", rating: 5, text: "Отличный сервис! Делали развал-схождение — машина едет как новая. Цены ниже, чем у дилера, а качество не хуже.", car: "BMW 3 Series", date: "Май 2024" },
  { name: "Светлана Н.", rating: 5, text: "Помогли диагностировать странный звук в ходовой. Нашли проблему быстро, починили в тот же день. Спасибо!", car: "Hyundai Tucson", date: "Май 2024" },
  { name: "Роман В.", rating: 5, text: "Пять лет езжу только к ним. Всегда честно скажут, что нужно делать, а что подождёт. Ценю за порядочность.", car: "Lada Vesta", date: "Май 2024" },
  { name: "Ольга Д.", rating: 5, text: "Сделали полную диагностику перед длинной поездкой. Нашли и заменили изношенные детали. Доехали без проблем!", car: "Nissan X-Trail", date: "Май 2024" },
];

const timeSlots = ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30"];
const allServices = ["Шиномонтаж", "Заправка кондиционера", "Замена масла", "Диагностика", "Развал-схождение", "Тормоза", "Электрика", "Кузовные работы"];

const navLinks = [
  { id: "home", label: "Главная" },
  { id: "services", label: "Услуги" },
  { id: "about", label: "О нас" },
  { id: "prices", label: "Прайс" },
  { id: "gallery", label: "Галерея" },
  { id: "reviews", label: "Отзывы" },
  { id: "booking", label: "Запись" },
  { id: "contacts", label: "Контакты" },
];

function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function AnimatedSection({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, inView } = useInView();
  return (
    <div ref={ref} className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}
      style={{ transitionDelay: inView ? `${delay}ms` : "0ms" }}>
      {children}
    </div>
  );
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} style={{ color: i < rating ? "#E51A1A" : "#444" }}>★</span>
      ))}
    </div>
  );
}

const Index = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [booking, setBooking] = useState({ name: "", phone: "", service: "", date: "", time: "", comment: "" });
  const [bookingDone, setBookingDone] = useState(false);
  const [activePrice, setActivePrice] = useState(0);
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => { setTimeout(() => setHeroVisible(true), 100); }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map(n => document.getElementById(n.id));
      const scrollPos = window.scrollY + 120;
      for (let i = sections.length - 1; i >= 0; i--) {
        const s = sections[i];
        if (s && s.offsetTop <= scrollPos) { setActiveSection(navLinks[i].id); break; }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingDone(true);
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="min-h-screen" style={{ background: "#0A0A0A", color: "#F0F0F0", fontFamily: "'Golos Text', sans-serif" }}>

      {/* NAVBAR */}
      <nav style={{ background: "rgba(10,10,10,0.97)", borderBottom: "1px solid #1E1E1E" }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
          <button onClick={() => scrollTo("home")} className="flex items-center gap-2">
            <img
              src="https://cdn.poehali.dev/projects/b9ca1be9-3d27-433f-8f4b-e8d3d5505d6f/bucket/db00ceb2-667f-46b0-aa49-df64cd8b409c.png"
              alt="Логотип"
              className="h-9 w-auto object-contain"
              style={{ marginBottom: "-2px" }}
            />
            <span className="text-xl font-bold tracking-wider text-white" style={{ fontFamily: "'Oswald', sans-serif" }}>
              АВТОСЕРВИС <span style={{ color: "#E51A1A" }}>У РУСТАМА</span>
            </span>
          </button>

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map(link => (
              <button key={link.id} onClick={() => scrollTo(link.id)}
                className="px-3 py-2 text-sm font-medium rounded transition-colors"
                style={{ color: activeSection === link.id ? "#E51A1A" : "#888", fontFamily: "'Golos Text', sans-serif" }}>
                {link.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a href="tel:+79605333089" className="hidden md:flex items-center gap-2 text-sm font-medium transition-colors hover:text-white"
              style={{ color: "#E51A1A" }}>
              <Icon name="Phone" size={14} />
              +7 960 533 30-89
            </a>
            <button onClick={() => scrollTo("booking")}
              className="px-4 py-2 text-sm rounded-lg font-bold text-white transition-all hover:opacity-90"
              style={{ background: "#E51A1A", fontFamily: "'Oswald', sans-serif", color: "#FFFFFF" }}>
              ЗАПИСАТЬСЯ
            </button>
            <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden" style={{ color: "#888" }}>
              <Icon name={menuOpen ? "X" : "Menu"} size={22} />
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="lg:hidden px-4 py-4 flex flex-col gap-1" style={{ background: "#111", borderTop: "1px solid #2A2A2A" }}>
            {navLinks.map(link => (
              <button key={link.id} onClick={() => scrollTo(link.id)}
                className="text-left px-3 py-2 rounded text-sm font-medium"
                style={{ color: activeSection === link.id ? "#E51A1A" : "#BBB" }}>
                {link.label}
              </button>
            ))}
            <a href="tel:+79605333089" className="flex items-center gap-2 px-3 py-2 text-sm font-medium" style={{ color: "#E51A1A" }}>
              <Icon name="Phone" size={14} /> +7 960 533 30-89
            </a>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMAGE} alt="Автосервис" className="w-full h-full object-cover" style={{ opacity: 0.28 }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(100deg, #0A0A0A 50%, rgba(10,10,10,0.6) 100%)" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, #0A0A0A 0%, transparent 50%)" }} />
        </div>
        <div className="absolute" style={{ top: "30%", right: 0, width: 400, height: 400, background: "radial-gradient(circle, rgba(229,26,26,0.12) 0%, transparent 70%)" }} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 pt-24 pb-16">
          <div className="max-w-3xl">
            <div className={`inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full transition-all duration-700 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              style={{ background: "rgba(229,26,26,0.12)", border: "1px solid rgba(229,26,26,0.3)", transitionDelay: "100ms" }}>
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#E51A1A" }} />
              <span className="text-sm font-medium" style={{ color: "#E51A1A" }}>Работаем без выходных • 9:00 – 22:00</span>
            </div>

            <h1 className={`text-5xl md:text-7xl font-black mb-5 leading-none tracking-tight transition-all duration-700 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ fontFamily: "'Oswald', sans-serif", transitionDelay: "200ms" }}>
              ПРОФЕССИОНАЛЬНЫЙ
              <br />
              <span style={{ color: "#E51A1A" }}>АВТОСЕРВИС</span>
              <br />
              В ВАШЕМ ГОРОДЕ
            </h1>

            <p className={`text-lg md:text-xl mb-8 max-w-xl leading-relaxed transition-all duration-700 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              style={{ color: "#BBB", transitionDelay: "350ms" }}>
              Ремонт и обслуживание автомобилей, шиномонтаж, заправка кондиционеров. Быстро, качественно, с гарантией.
            </p>

            <div className={`flex flex-wrap gap-4 mb-14 transition-all duration-700 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              style={{ transitionDelay: "450ms" }}>
              <button onClick={() => scrollTo("booking")}
                className="flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-lg transition-all hover:scale-105"
                style={{ background: "#E51A1A", color: "#FFFFFF", fontFamily: "'Oswald', sans-serif", boxShadow: "0 8px 30px rgba(229,26,26,0.4)" }}>
                <Icon name="Calendar" size={20} />
                ЗАПИСАТЬСЯ ОНЛАЙН
              </button>
              <a href="tel:+79605333089"
                className="flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-lg transition-all hover:scale-105"
                style={{ border: "2px solid #E51A1A", color: "#E51A1A", fontFamily: "'Oswald', sans-serif" }}>
                <Icon name="Phone" size={20} />
                ПОЗВОНИТЬ
              </a>
            </div>

            <div className={`flex flex-wrap gap-10 transition-all duration-700 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              style={{ transitionDelay: "550ms" }}>
              {[
                { num: "15+", label: "лет опыта" },
                { num: "2 000+", label: "клиентов" },
                { num: "12", label: "мастеров" },
                { num: "100%", label: "гарантия" },
              ].map((s, i) => (
                <div key={i}>
                  <div className="text-3xl font-black" style={{ fontFamily: "'Oswald', sans-serif", color: "#E51A1A" }}>{s.num}</div>
                  <div className="text-sm" style={{ color: "#666" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 animate-bounce">
          <span className="text-xs" style={{ color: "#555" }}>листайте вниз</span>
          <Icon name="ChevronDown" size={18} className="text-[#555]" />
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="mb-14">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <span className="text-sm font-semibold tracking-widest uppercase mb-2 block" style={{ color: "#E51A1A" }}>Что мы делаем</span>
                <h2 className="text-4xl md:text-5xl font-black" style={{ fontFamily: "'Oswald', sans-serif" }}>НАШИ УСЛУГИ</h2>
              </div>
              <button onClick={() => scrollTo("prices")} className="flex items-center gap-1 text-sm font-medium transition-colors hover:text-white" style={{ color: "#E51A1A" }}>
                Смотреть прайс <Icon name="ArrowRight" size={16} />
              </button>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((svc, i) => (
              <AnimatedSection key={i} delay={i * 80}>
                <div className="group p-7 rounded-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer h-full"
                  style={{ background: "#111", border: "1px solid #2A2A2A" }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(229,26,26,0.5)")}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = "#2A2A2A")}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-colors"
                    style={{ background: "rgba(229,26,26,0.1)", border: "1px solid rgba(229,26,26,0.2)" }}>
                    <Icon name={svc.icon} size={22} className="text-[#E51A1A]" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 transition-colors" style={{ fontFamily: "'Oswald', sans-serif" }}>{svc.title}</h3>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: "#888" }}>{svc.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-lg" style={{ color: "#E51A1A", fontFamily: "'Oswald', sans-serif" }}>{svc.price}</span>
                    <button onClick={() => scrollTo("booking")} className="text-xs flex items-center gap-1 transition-colors hover:text-white" style={{ color: "#555" }}>
                      Записаться <Icon name="ArrowRight" size={12} />
                    </button>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 px-4" style={{ background: "#0D0D0D" }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <span className="text-sm font-semibold tracking-widest uppercase mb-3 block" style={{ color: "#E51A1A" }}>Наша история</span>
              <h2 className="text-4xl md:text-5xl font-black mb-6" style={{ fontFamily: "'Oswald', sans-serif" }}>
                15 ЛЕТ НА СТРАЖЕ<br /><span style={{ color: "#E51A1A" }}>ВАШЕГО АВТОМОБИЛЯ</span>
              </h2>
              <p className="leading-relaxed mb-5" style={{ color: "#BBB" }}>
                Автосервис «У Рустама» работает с 2009 года. За это время мы обслужили более 8 000 автомобилей и завоевали доверие тысяч клиентов. Наши мастера постоянно повышают квалификацию и работают с современным диагностическим оборудованием.
              </p>
              <p className="leading-relaxed mb-8" style={{ color: "#777" }}>
                Мы специализируемся на автомобилях всех марок — от отечественных до премиальных иномарок. Работаем честно: объясняем, что нужно делать и почему, не навязываем лишнего.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: "Award", text: "Сертифицированные мастера" },
                  { icon: "Clock", text: "Гарантия на все работы" },
                  { icon: "Shield", text: "Честная диагностика" },
                  { icon: "Truck", text: "Эвакуатор 24/7" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: "#151515", border: "1px solid #2A2A2A" }}>
                    <Icon name={item.icon} size={18} className="text-[#E51A1A] shrink-0" />
                    <span className="text-sm" style={{ color: "#BBB" }}>{item.text}</span>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection delay={150}>
              <div className="relative">
                <img src={TIRE_IMAGE} alt="Шиномонтаж" className="rounded-2xl w-full h-80 object-cover" />
                <div className="absolute -bottom-6 -left-6 rounded-2xl p-6 shadow-2xl" style={{ background: "#E51A1A" }}>
                  <div className="text-4xl font-black text-white" style={{ fontFamily: "'Oswald', sans-serif" }}>2 000+</div>
                  <div className="text-sm" style={{ color: "rgba(255,255,255,0.8)" }}>клиентов доверяют нам</div>
                </div>
                <div className="absolute top-4 right-4 rounded-xl p-4 backdrop-blur-sm" style={{ background: "rgba(17,17,17,0.9)", border: "1px solid #2A2A2A" }}>
                  <StarRating rating={5} />
                  <div className="text-white text-sm font-medium mt-1">4.9 / 5.0</div>
                  <div className="text-xs" style={{ color: "#666" }}>средний рейтинг</div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* PRICES */}
      <section id="prices" className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-12">
            <span className="text-sm font-semibold tracking-widest uppercase mb-2 block" style={{ color: "#E51A1A" }}>Прозрачное ценообразование</span>
            <h2 className="text-4xl md:text-5xl font-black" style={{ fontFamily: "'Oswald', sans-serif" }}>ПРАЙС-ЛИСТ</h2>
          </AnimatedSection>

          <AnimatedSection>
            <div className="flex flex-wrap gap-3 justify-center mb-8">
              {prices.map((cat, i) => (
                <button key={i} onClick={() => setActivePrice(i)}
                  className="px-6 py-3 rounded-xl font-medium text-sm transition-all"
                  style={{
                    fontFamily: "'Oswald', sans-serif",
                    background: activePrice === i ? "#E51A1A" : "#111",
                    color: activePrice === i ? "#FFFFFF" : "#BBB",
                    border: activePrice === i ? "1px solid #E51A1A" : "1px solid #2A2A2A",
                  }}>
                  {cat.category}
                </button>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <div className="max-w-2xl mx-auto">
              <div className="rounded-2xl overflow-hidden" style={{ background: "#111", border: "1px solid #2A2A2A" }}>
                <div className="px-6 py-4" style={{ background: "#E51A1A" }}>
                  <h3 className="font-black text-xl text-white" style={{ fontFamily: "'Oswald', sans-serif" }}>
                    {prices[activePrice].category}
                  </h3>
                </div>
                {prices[activePrice].items.map((item, i) => (
                  <div key={i} className="flex items-center justify-between px-6 py-4 transition-colors hover:bg-[#1A1A1A]"
                    style={{ borderBottom: i < prices[activePrice].items.length - 1 ? "1px solid #1E1E1E" : "none" }}>
                    <span className="text-sm" style={{ color: "#BBB" }}>{item.name}</span>
                    <span className="font-bold" style={{ color: "#E51A1A", fontFamily: "'Oswald', sans-serif" }}>{item.price}</span>
                  </div>
                ))}
                <div className="px-6 py-4" style={{ background: "#0D0D0D", borderTop: "1px solid #2A2A2A" }}>
                  <p className="text-xs" style={{ color: "#555" }}>* Цены указаны без учёта стоимости материалов. Уточняйте у мастера.</p>
                </div>
              </div>
              <div className="text-center mt-6">
                <button onClick={() => scrollTo("booking")}
                  className="px-8 py-3 rounded-xl font-bold transition-all hover:opacity-90"
                  style={{ fontFamily: "'Oswald', sans-serif", background: "#E51A1A", color: "#FFFFFF" }}>
                  ЗАПИСАТЬСЯ НА ОБСЛУЖИВАНИЕ
                </button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="py-24 px-4" style={{ background: "#0D0D0D" }}>
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-12">
            <span className="text-sm font-semibold tracking-widest uppercase mb-2 block" style={{ color: "#E51A1A" }}>Наша работа</span>
            <h2 className="text-4xl md:text-5xl font-black" style={{ fontFamily: "'Oswald', sans-serif" }}>ГАЛЕРЕЯ</h2>
          </AnimatedSection>

          <AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2 relative group overflow-hidden rounded-2xl">
                <img src={HERO_IMAGE} alt="Автосервис" className="w-full object-cover group-hover:scale-105 transition-transform duration-500" style={{ height: 320 }} />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.6), transparent)" }} />
                <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-white font-bold" style={{ fontFamily: "'Oswald', sans-serif" }}>Автосервис</span>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                {[
                  { img: TIRE_IMAGE, label: "Шиномонтаж" },
                  { img: AC_IMAGE, label: "Кондиционеры" },
                ].map((item, i) => (
                  <div key={i} className="relative group overflow-hidden rounded-2xl flex-1">
                    <img src={item.img} alt={item.label} className="w-full object-cover group-hover:scale-105 transition-transform duration-500" style={{ height: 148 }} />
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.6), transparent)" }} />
                    <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-white text-sm font-bold" style={{ fontFamily: "'Oswald', sans-serif" }}>{item.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-14">
            <span className="text-sm font-semibold tracking-widest uppercase mb-2 block" style={{ color: "#E51A1A" }}>Мнение клиентов</span>
            <h2 className="text-4xl md:text-5xl font-black mb-3" style={{ fontFamily: "'Oswald', sans-serif" }}>ОТЗЫВЫ</h2>
            <div className="flex items-center justify-center gap-3">
              <StarRating rating={5} />
              <span className="text-sm" style={{ color: "#666" }}>4.9 из 5 на основе 340+ отзывов</span>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {reviews.map((rev, i) => (
              <AnimatedSection key={i} delay={i * 70}>
                <div className="p-6 rounded-2xl transition-all duration-300 h-full flex flex-col"
                  style={{ background: "#111", border: "1px solid #2A2A2A" }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(229,26,26,0.3)")}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = "#2A2A2A")}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm" style={{ background: "#E51A1A", fontFamily: "'Oswald', sans-serif" }}>
                        {rev.name[0]}
                      </div>
                      <div>
                        <div className="font-semibold text-sm">{rev.name}</div>
                        <div className="text-xs" style={{ color: "#666" }}>{rev.car}</div>
                      </div>
                    </div>
                    <span className="text-xs" style={{ color: "#555" }}>{rev.date}</span>
                  </div>
                  <StarRating rating={rev.rating} />
                  <p className="text-sm leading-relaxed mt-3 flex-1" style={{ color: "#BBB" }}>"{rev.text}"</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* BOOKING */}
      <section id="booking" className="py-24 px-4" style={{ background: "#0D0D0D" }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <AnimatedSection>
              <span className="text-sm font-semibold tracking-widest uppercase mb-3 block" style={{ color: "#E51A1A" }}>Запись онлайн</span>
              <h2 className="text-4xl md:text-5xl font-black mb-4" style={{ fontFamily: "'Oswald', sans-serif" }}>
                ЗАПИСАТЬСЯ<br />НА ОБСЛУЖИВАНИЕ
              </h2>
              <p className="leading-relaxed mb-8" style={{ color: "#888" }}>
                Выберите услугу, удобное время — и мы вас ждём! Подтверждение придёт по SMS в течение 5 минут.
              </p>
              <div className="space-y-4">
                {[
                  { icon: "Clock", title: "Быстро", desc: "Запись занимает 2 минуты, ждать в очереди не нужно" },
                  { icon: "Bell", title: "Напомним", desc: "Отправим SMS-напоминание за час до визита" },
                  { icon: "RefreshCw", title: "Гибко", desc: "Можно перенести или отменить в любой момент" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 rounded-xl" style={{ background: "#111", border: "1px solid #2A2A2A" }}>
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: "rgba(229,26,26,0.12)", border: "1px solid rgba(229,26,26,0.2)" }}>
                      <Icon name={item.icon} size={18} className="text-[#E51A1A]" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm mb-1">{item.title}</div>
                      <div className="text-sm" style={{ color: "#777" }}>{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection delay={150}>
              {bookingDone ? (
                <div className="rounded-2xl p-10 text-center" style={{ background: "#111", border: "1px solid rgba(229,26,26,0.4)" }}>
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
                    style={{ background: "rgba(229,26,26,0.12)", border: "2px solid #E51A1A" }}>
                    <Icon name="CheckCircle" size={32} className="text-[#E51A1A]" />
                  </div>
                  <h3 className="text-2xl font-black mb-2" style={{ fontFamily: "'Oswald', sans-serif" }}>ЗАЯВКА ОТПРАВЛЕНА!</h3>
                  <p className="text-sm mb-1" style={{ color: "#888" }}>Мы свяжемся с вами в течение 5 минут</p>
                  <p className="text-sm mb-6" style={{ color: "#666" }}>и подтвердим запись по телефону</p>
                  <button onClick={() => { setBookingDone(false); setBooking({ name: "", phone: "", service: "", date: "", time: "", comment: "" }); }}
                    className="text-sm hover:underline" style={{ color: "#E51A1A" }}>
                    Создать ещё одну запись
                  </button>
                </div>
              ) : (
                <form onSubmit={handleBooking} className="rounded-2xl p-8 space-y-4" style={{ background: "#111", border: "1px solid #2A2A2A" }}>
                  <h3 className="text-xl font-black mb-2" style={{ fontFamily: "'Oswald', sans-serif" }}>ФОРМА ЗАПИСИ</h3>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs mb-2 block font-medium" style={{ color: "#777" }}>Ваше имя *</label>
                      <input required value={booking.name} onChange={e => setBooking({ ...booking, name: e.target.value })}
                        placeholder="Иван Иванов"
                        className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 outline-none transition-colors"
                        style={{ background: "#1A1A1A", border: "1px solid #2A2A2A" }}
                        onFocus={e => (e.target.style.borderColor = "#E51A1A")}
                        onBlur={e => (e.target.style.borderColor = "#2A2A2A")} />
                    </div>
                    <div>
                      <label className="text-xs mb-2 block font-medium" style={{ color: "#777" }}>Телефон *</label>
                      <input required value={booking.phone} onChange={e => setBooking({ ...booking, phone: e.target.value })}
                        placeholder="+7 (999) 000-00-00" type="tel"
                        className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 outline-none transition-colors"
                        style={{ background: "#1A1A1A", border: "1px solid #2A2A2A" }}
                        onFocus={e => (e.target.style.borderColor = "#E51A1A")}
                        onBlur={e => (e.target.style.borderColor = "#2A2A2A")} />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs mb-2 block font-medium" style={{ color: "#777" }}>Услуга *</label>
                    <select required value={booking.service} onChange={e => setBooking({ ...booking, service: e.target.value })}
                      className="w-full rounded-xl px-4 py-3 text-sm text-white outline-none transition-colors appearance-none cursor-pointer"
                      style={{ background: "#1A1A1A", border: "1px solid #2A2A2A" }}
                      onFocus={e => (e.target.style.borderColor = "#E51A1A")}
                      onBlur={e => (e.target.style.borderColor = "#2A2A2A")}>
                      <option value="" disabled>Выберите услугу</option>
                      {allServices.map(s => <option key={s} value={s} style={{ background: "#1A1A1A" }}>{s}</option>)}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs mb-2 block font-medium" style={{ color: "#777" }}>Дата *</label>
                      <input required type="date" min={today} value={booking.date} onChange={e => setBooking({ ...booking, date: e.target.value })}
                        className="w-full rounded-xl px-4 py-3 text-sm text-white outline-none transition-colors"
                        style={{ background: "#1A1A1A", border: "1px solid #2A2A2A", colorScheme: "dark" }}
                        onFocus={e => (e.target.style.borderColor = "#E51A1A")}
                        onBlur={e => (e.target.style.borderColor = "#2A2A2A")} />
                    </div>
                    <div>
                      <label className="text-xs mb-2 block font-medium" style={{ color: "#777" }}>Время *</label>
                      <select required value={booking.time} onChange={e => setBooking({ ...booking, time: e.target.value })}
                        className="w-full rounded-xl px-4 py-3 text-sm text-white outline-none transition-colors appearance-none cursor-pointer"
                        style={{ background: "#1A1A1A", border: "1px solid #2A2A2A" }}
                        onFocus={e => (e.target.style.borderColor = "#E51A1A")}
                        onBlur={e => (e.target.style.borderColor = "#2A2A2A")}>
                        <option value="" disabled>Выберите время</option>
                        {timeSlots.map(t => <option key={t} value={t} style={{ background: "#1A1A1A" }}>{t}</option>)}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs mb-2 block font-medium" style={{ color: "#777" }}>Комментарий</label>
                    <textarea value={booking.comment} onChange={e => setBooking({ ...booking, comment: e.target.value })}
                      placeholder="Марка и модель автомобиля, описание проблемы..." rows={3}
                      className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 outline-none transition-colors resize-none"
                      style={{ background: "#1A1A1A", border: "1px solid #2A2A2A" }}
                      onFocus={e => (e.target.style.borderColor = "#E51A1A")}
                      onBlur={e => (e.target.style.borderColor = "#2A2A2A")} />
                  </div>

                  <button type="submit"
                    className="w-full py-4 rounded-xl font-black text-lg transition-all hover:opacity-90 hover:scale-[1.01]"
                    style={{ fontFamily: "'Oswald', sans-serif", background: "#E51A1A", color: "#FFFFFF", boxShadow: "0 8px 25px rgba(229,26,26,0.3)" }}>
                    ЗАПИСАТЬСЯ НА ОБСЛУЖИВАНИЕ
                  </button>
                  <p className="text-xs text-center" style={{ color: "#444" }}>Нажимая кнопку, вы соглашаетесь на обработку персональных данных</p>
                </form>
              )}
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-14">
            <span className="text-sm font-semibold tracking-widest uppercase mb-2 block" style={{ color: "#E51A1A" }}>Как нас найти</span>
            <h2 className="text-4xl md:text-5xl font-black" style={{ fontFamily: "'Oswald', sans-serif" }}>КОНТАКТЫ</h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
            {[
              { icon: "MapPin", title: "Адрес", lines: ["Поперечная улица, 17А", "пос. Ковалёво, Ленинградская обл."], href: "https://yandex.ru/maps/?text=Поперечная+улица,+посёлок+Ковалёво,+Всеволожское+городское+поселение,+Ленинградская+область" },
              { icon: "Phone", title: "Телефон", lines: ["+7 960 533 30-89", "+7 960 533 30-89"], href: "tel:+79605333089" },
              { icon: "Clock", title: "Режим работы", lines: ["Пн–Вс: 9:00 – 22:00", "Без выходных"] },
            ].map((item, i) => (
              <AnimatedSection key={i} delay={i * 100}>
                <div className="p-7 rounded-2xl text-center transition-all"
                  style={{ background: "#111", border: "1px solid #2A2A2A" }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(229,26,26,0.4)")}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = "#2A2A2A")}>
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5"
                    style={{ background: "rgba(229,26,26,0.1)", border: "1px solid rgba(229,26,26,0.2)" }}>
                    <Icon name={item.icon} size={24} className="text-[#E51A1A]" />
                  </div>
                  <h3 className="font-black text-lg mb-3" style={{ fontFamily: "'Oswald', sans-serif" }}>{item.title}</h3>
                  {item.lines.map((line, j) => (
                    item.href
                      ? <a key={j} href={item.href} className="block transition-colors hover:text-white" style={{ color: "#BBB" }}>{line}</a>
                      : <p key={j} style={{ color: "#BBB" }}>{line}</p>
                  ))}
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection>
            <div className="rounded-2xl overflow-hidden flex items-center justify-center relative" style={{ background: "#111", border: "1px solid #2A2A2A", height: 280 }}>
              <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #1A1A1A, #0D0D0D)" }} />
              <div className="relative text-center">
                <Icon name="MapPin" size={40} className="text-[#E51A1A] mx-auto mb-3" />
                <p style={{ color: "#888" }} className="text-sm">Поперечная улица, 17А, пос. Ковалёво, Ленинградская обл.</p>
                <a href="https://yandex.ru/maps/?text=Поперечная+улица,+посёлок+Ковалёво,+Всеволожское+городское+поселение,+Ленинградская+область" target="_blank" rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-2 text-sm hover:underline" style={{ color: "#E51A1A" }}>
                  Открыть на карте <Icon name="ExternalLink" size={14} />
                </a>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-20 px-4 relative overflow-hidden" style={{ background: "#E51A1A" }}>
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl" style={{ background: "rgba(255,255,255,0.08)" }} />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full blur-3xl" style={{ background: "rgba(255,255,255,0.06)" }} />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4" style={{ fontFamily: "'Oswald', sans-serif" }}>
            ГОТОВЫ ПОМОЧЬ ВАШЕМУ АВТОМОБИЛЮ?
          </h2>
          <p className="text-lg mb-8" style={{ color: "rgba(255,255,255,0.8)" }}>
            Запишитесь прямо сейчас и получите бесплатную диагностику при первом визите
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button onClick={() => scrollTo("booking")}
              className="px-8 py-4 rounded-xl font-black text-lg transition-all hover:scale-105"
              style={{ background: "white", color: "#E51A1A", fontFamily: "'Oswald', sans-serif" }}>
              ЗАПИСАТЬСЯ ОНЛАЙН
            </button>
            <a href="tel:+79605333089"
              className="px-8 py-4 rounded-xl font-black text-lg transition-all hover:scale-105"
              style={{ border: "2px solid white", color: "white", fontFamily: "'Oswald', sans-serif" }}>
              ПОЗВОНИТЬ НАМ
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 px-4" style={{ background: "#050505", borderTop: "1px solid #1E1E1E" }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img
                  src="https://cdn.poehali.dev/projects/b9ca1be9-3d27-433f-8f4b-e8d3d5505d6f/bucket/db00ceb2-667f-46b0-aa49-df64cd8b409c.png"
                  alt="Логотип"
                  className="h-9 w-auto object-contain"
                  style={{ marginBottom: "-2px" }}
                />
                <span className="font-black text-xl" style={{ fontFamily: "'Oswald', sans-serif" }}>
                  АВТОСЕРВИС <span style={{ color: "#E51A1A" }}>У РУСТАМА</span>
                </span>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: "#555" }}>
                Профессиональный автосервис с 15-летним опытом. Качество, честность, гарантия.
              </p>
            </div>
            <div>
              <h4 className="font-black text-sm mb-4" style={{ fontFamily: "'Oswald', sans-serif", color: "#888" }}>УСЛУГИ</h4>
              <ul className="space-y-2">
                {["Автосервис", "Шиномонтаж", "Заправка кондиционеров", "Развал-схождение", "Электрика"].map(s => (
                  <li key={s}>
                    <button onClick={() => scrollTo("services")} className="text-sm transition-colors hover:text-white" style={{ color: "#555" }}>{s}</button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-black text-sm mb-4" style={{ fontFamily: "'Oswald', sans-serif", color: "#888" }}>КОНТАКТЫ</h4>
              <div className="space-y-3">
                <a href="tel:+79605333089" className="flex items-center gap-2 text-sm transition-colors hover:text-white" style={{ color: "#555" }}>
                  <Icon name="Phone" size={14} /> +7 960 533 30-89
                </a>
                <div className="flex items-center gap-2 text-sm" style={{ color: "#555" }}>
                  <Icon name="MapPin" size={14} /> ул. Автомобильная, 1
                </div>
                <div className="flex items-center gap-2 text-sm" style={{ color: "#555" }}>
                  <Icon name="Clock" size={14} /> Пн–Вс: 9:00 – 22:00
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 pt-6" style={{ borderTop: "1px solid #1E1E1E" }}>
            <p className="text-xs" style={{ color: "#444" }}>© 2024 Автосервис У Рустама. Все права защищены.</p>
            <p className="text-xs" style={{ color: "#333" }}>Нажимая «Записаться», вы принимаете политику конфиденциальности</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;