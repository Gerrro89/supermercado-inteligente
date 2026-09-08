import { useMemo, useState } from "react";
import {
  ArrowRight,
  BadgePercent,
  BarChart3,
  Brain,
  Calculator,
  Check,
  ChevronRight,
  CircleDollarSign,
  CircleHelp,
  ClipboardCheck,
  Clock3,
  Gift,
  Hand,
  Lightbulb,
  Minus,
  Plus,
  RotateCcw,
  ShoppingBasket,
  Sparkles,
  Tags,
  Target,
  Trophy,
  Users,
  WalletCards,
  X,
} from "lucide-react";

type Phase = "inicio" | "exploracion" | "reto" | "resultado";
type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  discount: number;
  fraction: string;
  color: string;
  emoji: string;
  accent: string;
};

type Cart = Record<string, number>;

const ART_DIRECTION = "/manus-storage/supermercado-art-direction_c0308afd.png";
const STICKERS = "/manus-storage/supermercado-grocery-stickers_3fd9fb45.png";

const products: Product[] = [
  { id: "queso", name: "Queso campesino", category: "Lácteos", price: 8000, discount: 25, fraction: "1/4", color: "blue", emoji: "🧀", accent: "#f7c34a" },
  { id: "leche", name: "Leche entera", category: "Lácteos", price: 4500, discount: 10, fraction: "1/10", color: "sky", emoji: "🥛", accent: "#6cc4de" },
  { id: "manzanas", name: "Manzanas rojas", category: "Frutas", price: 6000, discount: 20, fraction: "1/5", color: "red", emoji: "🍎", accent: "#ef5947" },
  { id: "cereal", name: "Cereal de colores", category: "Despensa", price: 9500, discount: 20, fraction: "1/5", color: "orange", emoji: "🥣", accent: "#ef9b3e" },
  { id: "jugo", name: "Jugo de naranja", category: "Bebidas", price: 5000, discount: 25, fraction: "1/4", color: "lime", emoji: "🍊", accent: "#9fc437" },
  { id: "pan", name: "Pan artesanal", category: "Panadería", price: 3500, discount: 0, fraction: "0", color: "yellow", emoji: "🥖", accent: "#df9a3b" },
];

const money = (value: number) => `$${value.toLocaleString("es-CO")}`;
const percentDecimal = (percent: number) => (percent / 100).toLocaleString("es-CO", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

function getProduct(id: string) {
  return products.find((product) => product.id === id) ?? products[0];
}

function Stepper({ phase }: { phase: Phase }) {
  const steps = [
    { id: "inicio", label: "Aterriza", number: "01" },
    { id: "exploracion", label: "Explora", number: "02" },
    { id: "reto", label: "Compra", number: "03" },
    { id: "resultado", label: "Reflexiona", number: "04" },
  ];
  const activeIndex = steps.findIndex((step) => step.id === phase);
  return (
    <div className="stepper" aria-label="Progreso de la actividad">
      {steps.map((step, index) => (
        <div className={`step ${index <= activeIndex ? "is-active" : ""} ${index === activeIndex ? "is-current" : ""}`} key={step.id}>
          <span className="step-number">{index < activeIndex ? <Check size={13} strokeWidth={3} /> : step.number}</span>
          <span className="step-label">{step.label}</span>
          {index < steps.length - 1 && <span className="step-line" />}
        </div>
      ))}
    </div>
  );
}

function Badge({ children, tone = "blue" }: { children: React.ReactNode; tone?: "blue" | "lime" | "orange" | "red" }) {
  return <span className={`badge badge-${tone}`}>{children}</span>;
}

function GameHeader({ phase, onReset }: { phase: Phase; onReset: () => void }) {
  return (
    <header className="topbar">
      <div className="brand-lockup">
        <div className="brand-mark"><ShoppingBasket size={21} strokeWidth={2.4} /></div>
        <div>
          <div className="brand-name">El Supermercado <span>Inteligente</span></div>
          <div className="brand-kicker">Laboratorio de decisiones · Matemáticas</div>
        </div>
      </div>
      <div className="topbar-actions">
        <div className="pair-chip"><Users size={14} /> Trabajo en parejas</div>
        <button className="icon-button" onClick={onReset} aria-label="Reiniciar actividad" title="Reiniciar actividad"><RotateCcw size={17} /></button>
      </div>
    </header>
  );
}

function Intro({ onStart }: { onStart: () => void }) {
  return (
    <section className="intro-layout fade-in">
      <div className="intro-copy">
        <Badge tone="lime"><Sparkles size={13} /> Misión de hoy · 01</Badge>
        <h1>Compra con cabeza,<br /><em>no con prisa.</em></h1>
        <p className="intro-lede">Conviértanse en compradores estratégicos: estimen, calculen y decidan cómo gastar un saldo limitado de la forma más inteligente.</p>
        <div className="intro-actions">
          <button className="primary-button" onClick={onStart}>Entrar al supermercado <ArrowRight size={17} /></button>
          <div className="time-note"><Clock3 size={15} /> Actividad sugerida · 20 min</div>
        </div>
        <div className="skill-row">
          <div className="skill-item"><div className="skill-icon blue"><BadgePercent size={17} /></div><span>Porcentajes</span></div>
          <div className="skill-item"><div className="skill-icon orange"><BarChart3 size={17} /></div><span>Variaciones</span></div>
          <div className="skill-item"><div className="skill-icon lime"><Calculator size={17} /></div><span>Cálculo mental</span></div>
        </div>
      </div>
      <div className="intro-visual">
        <div className="visual-caption"><span className="caption-dot" /> Una compra, muchas decisiones</div>
        <div className="hero-image-frame">
          <img src={ART_DIRECTION} alt="Ilustración de un supermercado con símbolos matemáticos" />
          <div className="floating-sticker sticker-top"><span>25%</span><small>de descuento</small></div>
          <div className="floating-sticker sticker-bottom"><span>1/4</span><small>parte del precio</small></div>
        </div>
        <div className="visual-footer"><span>Piensa primero.</span><span>Calcula después.</span><span>Decide mejor.</span></div>
      </div>
      <div className="intro-side-note">
        <div className="side-note-icon"><Target size={18} /></div>
        <div><strong>Meta de aprendizaje</strong><p>Resolver problemas de compras usando fracciones, decimales y porcentajes.</p></div>
      </div>
    </section>
  );
}

function Exploration({ onContinue }: { onContinue: () => void }) {
  const [estimate, setEstimate] = useState<string | null>(null);
  const [variation, setVariation] = useState<string | null>(null);
  const estimateOptions = [
    { id: "pequeno", title: "Pequeño", copy: "Tal vez ahorra $500", icon: "↘" },
    { id: "mediano", title: "Mediano", copy: "Tal vez ahorra $2.000", icon: "→" },
    { id: "grande", title: "Grande", copy: "Tal vez ahorra $4.000", icon: "↗" },
  ];
  return (
    <section className="phase-shell fade-in">
      <div className="phase-heading">
        <div><Badge tone="orange"><Lightbulb size={13} /> Fase 01 · Exploración</Badge><h2>Antes de calcular, <em>estima.</em></h2><p>Observa la oferta y conversa con tu pareja. ¿Qué cambió: el precio, la cantidad o la relación entre ambos?</p></div>
        <div className="phase-time"><Clock3 size={15} /> 05 min</div>
      </div>
      <div className="exploration-grid">
        <div className="offer-card">
          <div className="offer-top"><span className="offer-label">Oferta de la semana</span><Badge tone="red"><BadgePercent size={13} /> 25% OFF</Badge></div>
          <div className="offer-product"><div className="product-orb cheese-orb">🧀</div><div><span className="tiny-label">Lácteos · 500 g</span><h3>Queso campesino</h3><div className="price-shift"><span className="old-price">{money(8000)}</span><ArrowRight size={16} /><strong>{money(6000)}</strong></div></div></div>
          <div className="offer-dots"><span /><span /><span /><span /></div>
          <div className="offer-question"><CircleHelp size={16} /><span>Sin calcular todavía, ¿este descuento te parece…?</span></div>
          <div className="estimate-row">{estimateOptions.map((option) => <button key={option.id} className={`estimate-card ${estimate === option.id ? "selected" : ""}`} onClick={() => setEstimate(option.id)}><span className="estimate-icon">{option.icon}</span><strong>{option.title}</strong><small>{option.copy}</small>{estimate === option.id && <span className="selected-check"><Check size={12} /></span>}</button>)}</div>
        </div>
        <div className="math-card">
          <div className="math-card-top"><div><span className="tiny-label">Lo que queremos describir</span><h3>¿Cómo bajó el precio?</h3></div><div className="fraction-badge"><span>1</span><i /><span>4</span></div></div>
          <div className="relation-board"><div><strong>{money(8000)}</strong><span>precio inicial</span></div><div className="relation-arrow"><ArrowRight size={19} /><small>− {money(2000)}</small></div><div><strong>{money(6000)}</strong><span>precio final</span></div></div>
          <div className="equivalence-line"><span>25%</span><b>=</b><span>1/4</span><b>=</b><span>0,25</span></div>
          <div className="answer-prompt"><strong>Elige una forma de describir la variación:</strong><div className="answer-options"><button className={variation === "absoluta" ? "selected" : ""} onClick={() => setVariation("absoluta")}><span className="answer-letter">A</span><span><strong>Bajó $2.000</strong><small>Variación absoluta</small></span>{variation === "absoluta" && <Check size={15} />}</button><button className={variation === "relativa" ? "selected correct" : ""} onClick={() => setVariation("relativa")}><span className="answer-letter">B</span><span><strong>Bajó 25%</strong><small>Variación relativa</small></span>{variation === "relativa" && <Check size={15} />}</button></div></div>
          <button className="primary-button full" disabled={!estimate || !variation} onClick={onContinue}>Ahora sí, vamos a comprar <ChevronRight size={17} /></button>
          <p className="helper-line"><Calculator size={13} /> La calculadora se usa solo para verificar, no para reemplazar tu razonamiento.</p>
        </div>
      </div>
    </section>
  );
}

function ProductCard({ product, quantity, onAdd }: { product: Product; quantity: number; onAdd: () => void }) {
  return <article className={`product-card product-${product.color}`}>
    <div className="product-card-top"><span className="category-label">{product.category}</span>{product.discount > 0 && <span className="discount-pill">-{product.discount}%</span>}</div>
    <div className="product-emoji" style={{ background: `linear-gradient(145deg, ${product.accent}33, ${product.accent}88)` }}>{product.emoji}</div>
    <h3>{product.name}</h3>
    <div className="product-price-row"><div><span className="product-price">{money(product.price * (1 - product.discount / 100))}</span><span className="product-before">{product.discount ? money(product.price) : "Precio justo"}</span></div><button className="add-button" onClick={onAdd} aria-label={`Agregar ${product.name}`}><Plus size={17} />{quantity > 0 && <b>{quantity}</b>}</button></div>
    <div className="product-equivalence">{product.discount ? <><BadgePercent size={12} /> {product.discount}% = {product.fraction} = {percentDecimal(product.discount)}</> : <><Tags size={12} /> Sin descuento</>}</div>
  </article>;
}

function Challenge({ cart, setCart, onCheckout }: { cart: Cart; setCart: React.Dispatch<React.SetStateAction<Cart>>; onCheckout: () => void }) {
  const budget = 30000;
  const cartItems = Object.entries(cart).filter(([, quantity]) => quantity > 0);
  const stats = useMemo(() => {
    const base = cartItems.reduce((sum, [id, quantity]) => sum + getProduct(id).price * quantity, 0);
    const total = cartItems.reduce((sum, [id, quantity]) => sum + getProduct(id).price * (1 - getProduct(id).discount / 100) * quantity, 0);
    return { base, total, savings: base - total, count: cartItems.reduce((sum, [, quantity]) => sum + quantity, 0) };
  }, [cartItems]);
  const addProduct = (id: string) => setCart((current) => ({ ...current, [id]: (current[id] ?? 0) + 1 }));
  const removeProduct = (id: string) => setCart((current) => ({ ...current, [id]: Math.max((current[id] ?? 0) - 1, 0) }));
  const remaining = budget - stats.total;
  const ready = stats.count >= 3 && remaining >= 0;
  return <section className="phase-shell fade-in challenge-shell">
    <div className="phase-heading challenge-heading"><div><Badge tone="blue"><ShoppingBasket size={13} /> Fase 02 · Reto de compra</Badge><h2>Llena tu canasta <em>con estrategia.</em></h2><p>Tienes un saldo limitado. Elige al menos 3 productos, encuentra descuentos equivalentes y cuida el cambio.</p></div><div className="budget-chip"><WalletCards size={17} /><div><small>Saldo de la pareja</small><strong>{money(budget)}</strong></div></div></div>
    <div className="challenge-layout">
      <div className="aisle-panel"><div className="aisle-toolbar"><div><span className="tiny-label">Pasillo matemático</span><strong>Elige tus productos</strong></div><div className="aisle-art"><img src={STICKERS} alt="Stickers ilustrados de alimentos" /></div></div><div className="product-grid">{products.map((product) => <ProductCard key={product.id} product={product} quantity={cart[product.id] ?? 0} onAdd={() => addProduct(product.id)} />)}</div></div>
      <aside className="receipt-panel"><div className="receipt-head"><div className="receipt-title"><div className="receipt-icon"><ShoppingBasket size={17} /></div><div><strong>Tu canasta</strong><span>{stats.count} {stats.count === 1 ? "producto" : "productos"}</span></div></div><Badge tone={stats.savings > 0 ? "lime" : "blue"}>{stats.savings > 0 ? `ahorras ${money(stats.savings)}` : "en construcción"}</Badge></div><div className="receipt-paper">{cartItems.length === 0 ? <div className="empty-cart"><div className="empty-basket"><ShoppingBasket size={24} /></div><strong>Tu canasta está vacía</strong><span>Agrega productos del pasillo para empezar a calcular.</span></div> : <>{cartItems.map(([id, quantity]) => { const product = getProduct(id); const lineTotal = product.price * (1 - product.discount / 100) * quantity; return <div className="receipt-line" key={id}><div className="receipt-line-title"><span>{product.emoji}</span><div><strong>{product.name}</strong><small>{quantity} × {money(product.price * (1 - product.discount / 100))}</small></div></div><div className="receipt-line-actions"><strong>{money(lineTotal)}</strong><button onClick={() => removeProduct(id)} aria-label={`Quitar ${product.name}`}><Minus size={12} /></button></div></div> })}<div className="receipt-divider" /><div className="receipt-subline"><span>Precio sin descuentos</span><span>{money(stats.base)}</span></div><div className="receipt-subline savings"><span><Gift size={13} /> Ahorro inteligente</span><span>− {money(stats.savings)}</span></div><div className="receipt-total"><span>Total a pagar</span><strong>{money(stats.total)}</strong></div></>}</div><div className={`budget-meter ${remaining < 0 ? "over" : ""}`}><div className="meter-label"><span>Saldo restante</span><strong>{money(remaining)}</strong></div><div className="meter-track"><span style={{ width: `${Math.min((stats.total / budget) * 100, 100)}%` }} /></div></div><button className="primary-button full" disabled={!ready} onClick={onCheckout}>{ready ? "Pasar por caja" : stats.count < 3 ? `Agrega ${3 - stats.count} producto${3 - stats.count === 1 ? "" : "s"} más` : "Ajusta tu presupuesto"}<ArrowRight size={16} /></button>{stats.count > 0 && stats.savings === 0 && <p className="helper-line warn"><Lightbulb size={13} /> Busca una oferta para que tu decisión sea más inteligente.</p>}</aside>
    </div>
  </section>;
}

function Results({ cart, onRestart }: { cart: Cart; onRestart: () => void }) {
  const stats = useMemo(() => Object.entries(cart).reduce((acc, [id, quantity]) => { const product = getProduct(id); const base = product.price * quantity; const total = product.price * (1 - product.discount / 100) * quantity; return { base: acc.base + base, total: acc.total + total, count: acc.count + quantity }; }, { base: 0, total: 0, count: 0 }), [cart]);
  const savings = stats.base - stats.total;
  const grade = stats.count >= 4 && savings >= 4000 ? "Compra experta" : savings > 0 ? "Buena decisión" : "Primer intento";
  const firstDiscounted = Object.entries(cart).find(([id, quantity]) => quantity > 0 && getProduct(id).discount > 0)?.[0] ?? Object.keys(cart)[0] ?? "queso";
  const example = getProduct(firstDiscounted);
  return <section className="phase-shell fade-in result-shell"><div className="result-hero"><div className="result-mark"><Trophy size={28} /></div><Badge tone="lime"><Sparkles size={13} /> Ticket de salida</Badge><h2>{grade}. <em>Tu decisión tiene sentido.</em></h2><p>Ahora puedes explicar no solo cuánto ahorraste, sino qué representa ese ahorro respecto al precio original.</p></div><div className="result-grid"><div className="result-score-card"><span className="tiny-label">Resumen de tu compra</span><div className="score-number">{money(savings)}</div><span className="score-label">ahorro total · {stats.count} productos</span><div className="score-bar"><span style={{ width: `${Math.min((savings / 5000) * 100, 100)}%` }} /></div><div className="score-foot"><span>Precio original <b>{money(stats.base)}</b></span><span>Total pagado <b>{money(stats.total)}</b></span></div></div><div className="reflection-card"><div className="reflection-head"><Brain size={18} /><strong>Tu explicación matemática</strong></div><p>En tu compra, un descuento de <strong>{example.discount}%</strong> significa que pagas el <strong>{100 - example.discount}%</strong> del precio: <strong>{100 - example.discount}% = {((100 - example.discount) / 100).toLocaleString("es-CO", { minimumFractionDigits: 2 })}</strong>.</p><div className="calculation-strip"><span>{money(example.price)}</span><ArrowRight size={15} /><span>{example.discount}% menos</span><ArrowRight size={15} /><strong>{money(example.price * (1 - example.discount / 100))}</strong></div><div className="reflection-choices"><span>¿Qué tipo de variación comunicaste?</span><div><Badge tone="blue">Absoluta: {money(example.price * example.discount / 100)}</Badge><Badge tone="orange">Relativa: {example.discount}%</Badge></div></div></div></div><div className="result-footer"><div><ClipboardCheck size={16} /><span>Comparte con tu pareja: ¿qué producto fue la mejor decisión y por qué?</span></div><button className="secondary-button" onClick={onRestart}><RotateCcw size={16} /> Volver a empezar</button></div></section>;
}

export default function Home() {
  const [phase, setPhase] = useState<Phase>("inicio");
  const [cart, setCart] = useState<Cart>({});
  const reset = () => { setPhase("inicio"); setCart({}); window.scrollTo({ top: 0, behavior: "smooth" }); };
  return <div className="game-app"><div className="paper-grain" /><GameHeader phase={phase} onReset={reset} /><main className="app-main"><Stepper phase={phase} />{phase === "inicio" && <Intro onStart={() => setPhase("exploracion")} />}{phase === "exploracion" && <Exploration onContinue={() => setPhase("reto")} />}{phase === "reto" && <Challenge cart={cart} setCart={setCart} onCheckout={() => setPhase("resultado")} />}{phase === "resultado" && <Results cart={cart} onRestart={reset} />}</main><footer className="app-footer"><span>Matemáticas que se pueden tocar.</span><span>Hecho para pensar en pareja <Hand size={13} /></span></footer></div>;
}
