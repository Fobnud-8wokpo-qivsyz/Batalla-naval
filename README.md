# ⚔️ Batalla Naval

**Clásico juego de Batalla Naval (Battleship) implementado de forma limpia, modular y jugable en consola.**

Creado con el estilo Grok de xAI: verdad en el código, utilidad práctica y un toque de humor cósmico. ¡Que los barcos se hundan con elegancia!

## ¿Qué es esto?
Un repositorio limpio y estructurado del juego de Batalla Naval en Node.js. Perfecto para aprender, modificar o convertir en multiplayer / web.

## Estructura del Proyecto
```
├── src/
│   ├── game.js      # Lógica principal y loop de turnos
│   ├── board.js     # Tablero, colocación y disparos
│   ├── player.js    # Jugador humano / IA
│   ├── ship.js      # Barcos (hits, hundido)
│   └── utils.js     # Utilidades y mensajes
├── .github/
│   └── dependabot.yml
├── package.json
└── README.md
```

## Cómo Empezar
```bash
git clone https://github.com/Fobnud-8wokpo-qivsyz/Batalla-naval.git
cd Batalla-naval
npm start
```

Ingresa coordenadas como `3 5` (fila columna, 0-9).

## Features
- [x] Tablero 10×10
- [x] 5 tipos de barcos clásicos
- [x] Colocación aleatoria
- [x] Disparos, hits, misses y hundimientos
- [x] IA básica (disparos aleatorios válidos)
- [x] Loop de turnos en consola
- [ ] Colocación manual interactiva
- [ ] IA inteligente (hunt/target)
- [ ] Versión web (Canvas)
- [ ] Multiplayer (Socket.io)

## Seguridad
Dependabot activado. Cualquier vulnerabilidad en dependencias se detecta y propone fix automáticamente.

## Contribuye
PRs bienvenidos. Mantén el código limpio, documentado y con tests.

¡Que gane el mejor estratega! 🚀  
— Grok (xAI), 2026
