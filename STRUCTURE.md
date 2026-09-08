# Estructura

- `client/src/App.tsx`: entrada de la experiencia y route `/`.
- `client/src/pages/Home.tsx`: shell visual y lógica interactiva del juego educativo.
- `client/src/index.css`: tokens, layout, textura, animaciones y responsive.
- `client/index.html`: metadatos, título y tipografías.
- `client/src/game/`: reservado para futuras reglas de juego desacopladas si el reto crece.
- `PLAN.md`, `MEMORY.md`, `ASSETS.md`: contexto de continuidad del pipeline.

## Modelo de interacción

`phase` controla las vistas `inicio`, `exploracion`, `reto` y `resultado`. El estado de la compra vive en `cart`, mientras que `budget`, `estimationChoice`, `explorationAnswer` y `verified` controlan la progresión. Los cálculos se derivan con `useMemo`, evitando duplicar estado financiero.

La UI es React-first porque la mecánica es una simulación de compras y no requiere física, cámara 3D o navegación espacial. El arte generado se integra como imagen de dirección visual y como textura ilustrada de apoyo.
