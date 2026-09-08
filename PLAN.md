# Plan de implementación — El Supermercado Inteligente

## Objetivo
Crear una experiencia web jugable, clara y visualmente atractiva para que parejas de estudiantes practiquen variaciones absolutas y relativas, fracciones, decimales y porcentajes en un contexto de compras.

## Riesgos y mitigaciones

| Riesgo | Mitigación | Verificación |
|---|---|---|
| La actividad se percibe como una ficha estática | Flujo por fases, botones con estados, carrito reactivo, medidor de presupuesto y puntuación | La interacción cambia precios, ahorro y saldo en tiempo real |
| El descuento se entiende solo como resta | Fase de exploración con estimación previa y panel de equivalencias 25% = 1/4 = 0,25 | El jugador debe elegir una estimación antes de desbloquear el reto |
| El presupuesto queda fuera de foco | Carrito persistente, saldo visible y alerta al exceder el límite | Comprar cambia saldo y bloquea checkout si excede |
| La interfaz pierde legibilidad en móvil | Grid responsive y navegación compacta | Capturas desktop y viewport móvil |

## Criterios de terminado

- Inicio muestra metas, normas y una llamada a comenzar.
- Exploración contrasta $8.000 vs $6.000 y distingue variación absoluta/relativa.
- Reto permite agregar/quitar productos, aplicar descuentos, ver ahorro y saldo.
- Checkout entrega una retroalimentación pedagógica con desglose del cálculo.
- Reinicio devuelve el juego al inicio.
- Recursos visuales generados aparecen integrados en la interfaz.
- `pnpm check` y `pnpm build` completan sin errores.

## Fases de trabajo

1. Dirección visual y recursos ilustrados.
2. Shell React y estilo editorial de supermercado escolar.
3. Lógica de fases, carrito y cálculo exacto.
4. Validación visual y de tipos.
5. Checkpoint final para publicación desde WebDev.
