from pathlib import Path
p=Path('/home/ubuntu/supermercado-inteligente/client/src/pages/Home.tsx')
s=p.read_text()
a=s.index('function Results(')
b=s.index('\nexport default function Home()',a)
new='''function Results({ cart, assignedTickets, onRestart }: { cart: Cart; assignedTickets: Record<string, string>; onRestart: () => void }) {
  const stats = useMemo(() => Object.entries(cart).reduce((acc, [id, quantity]) => { const product = getProduct(id); const ticket = discountTickets.find((item) => item.id === assignedTickets[id]); const base = product.price * quantity; const total = product.price * (1 - (ticket?.percent ?? 0) / 100) * quantity; return { base: acc.base + base, total: acc.total + total, count: acc.count + quantity }; }, { base: 0, total: 0, count: 0 }), [cart, assignedTickets]);
  const savings = stats.base - stats.total;
  const grade = stats.count >= 4 && savings >= 4000 ? "Compra experta" : savings > 0 ? "Buena decisión" : "Primer intento";
  const firstProduct = Object.keys(cart)[0] ?? "queso";
  const example = getProduct(firstProduct);
  const exampleTicket = discountTickets.find((ticket) => ticket.id === assignedTickets[firstProduct]) ?? discountTickets[0];
  const appliedExampleSavings = example.price * exampleTicket.percent / 100;
  return <section className="phase-shell fade-in result-shell"><div className="result-hero"><div className="result-mark"><Trophy size={28} /></div><Badge tone="lime"><Sparkles size={13} /> Ticket de salida</Badge><h2>{grade}. <em>Tu decisión tiene sentido.</em></h2><p>Ahora puedes explicar no solo cuánto ahorraste, sino qué representa ese ahorro respecto al precio original.</p></div><div className="result-grid"><div className="result-score-card"><span className="tiny-label">Resumen de tu compra</span><div className="score-number">{money(savings)}</div><span className="score-label">ahorro total · {stats.count} productos</span><div className="score-bar"><span style={{ width: `${Math.min((savings / 5000) * 100, 100)}%` }} /></div><div className="score-foot"><span>Precio original <b>{money(stats.base)}</b></span><span>Total pagado <b>{money(stats.total)}</b></span></div></div><div className="reflection-card"><div className="reflection-head"><Brain size={18} /><strong>Tu explicación matemática</strong></div><p>En tu compra, un ticket de <strong>{exampleTicket.label}</strong> significa que ahorras <strong>{exampleTicket.percent}%</strong> del precio: <strong>{exampleTicket.percent}% = {exampleTicket.kind === "fraction" ? "1/4" : "0,25"}</strong>.</p><div className="calculation-strip"><span>{money(example.price)}</span><ArrowRight size={15} /><span>{exampleTicket.label} menos</span><ArrowRight size={15} /><strong>{money(example.price - appliedExampleSavings)}</strong></div><div className="reflection-choices"><span>¿Qué tipo de variación comunicaste?</span><div><Badge tone="blue">Absoluta: {money(appliedExampleSavings)}</Badge><Badge tone="orange">Relativa: {exampleTicket.percent}%</Badge></div></div></div></div><div className="result-footer"><div><ClipboardCheck size={16} /><span>Comparte con tu pareja: ¿qué producto fue la mejor decisión y por qué?</span></div><button className="secondary-button" onClick={onRestart}><RotateCcw size={16} /> Volver a empezar</button></div></section>;
}'''
s=s[:a]+new+s[b:]
s=s.replace('const [cart, setCart] = useState<Cart>({});','const [cart, setCart] = useState<Cart>({});\n  const [assignedTickets, setAssignedTickets] = useState<Record<string, string>>({});')
s=s.replace('const reset = () => { setPhase("inicio"); setCart({});', 'const reset = () => { setPhase("inicio"); setCart({}); setAssignedTickets({});')
s=s.replace('{phase === "resultado" && <Results cart={cart} onRestart={reset} />}', '{phase === "resultado" && <Results cart={cart} assignedTickets={assignedTickets} onRestart={reset} />}')
p.write_text(s)
'''
