# Verificación

La captura desktop de la pantalla inicial confirmó que la jerarquía visual es legible: encabezado de marca, progreso, llamada principal, metas y dirección artística generada. La ilustración se carga desde `/manus-storage/supermercado-art-direction_c0308afd.png`.

La prueba manual del navegador recorrió el flujo completo. Al entrar en exploración, la pareja pudo elegir una estimación mediana de ahorro y la variación relativa. El botón de avance permaneció bloqueado hasta completar ambas decisiones; al avanzar mostró la fase de compra.

En la compra se añadieron queso, leche y manzanas. La canasta calculó correctamente precio original de `$18.500`, total de `$14.850`, ahorro de `$3.650` y saldo restante de `$15.150`; el botón de caja se habilitó al llegar a tres productos. El ticket de salida explicó correctamente que un 25% de descuento implica pagar 75% del precio y mostró la equivalencia absoluta de `$2.000` y relativa de `25%`.

`pnpm check` y `pnpm build` finalizaron correctamente sin errores. La app mantiene el reinicio de actividad y el comportamiento responsive mediante media queries.

## Verificación de tickets

La fase de compra muestra una bandeja con tickets de porcentaje y fracción: `25%`, `1/4`, `10%` y `1/5`. La prueba manual seleccionó `25%`, activó el botón contextual `Usar 25% aquí` en queso, agregó el producto y confirmó que el ticket quedó marcado como usado, el producto pasó a `$6.000`, el recibo mostró `25%` y el ahorro de `$2.000`, y el saldo restante se actualizó a `$24.000`. La interfaz conserva también el flujo nativo de arrastrar y soltar mediante `onDragStart`, `onDragOver` y `onDrop`.
