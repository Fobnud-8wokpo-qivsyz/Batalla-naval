/**
 * Jugador (humano o IA)
 */

const { Board } = require('./board');
const { Ship } = require('./ship');

const DEFAULT_SHIPS = [
  { name: 'Portaaviones', length: 5 },
  { name: 'Acorazado', length: 4 },
  { name: 'Crucero', length: 3 },
  { name: 'Submarino', length: 3 },
  { name: 'Destructor', length: 2 },
];

class Player {
  constructor(name, isAI = false) {
    this.name = name;
    this.isAI = isAI;
    this.board = new Board();
    this.shots = [];
  }

  placeShips(manual = false) {
    if (this.isAI || !manual) {
      this.board.placeShipsRandomly(DEFAULT_SHIPS);
      console.log(`${this.name}: barcos colocados aleatoriamente.`);
    } else {
      // Colocación manual simplificada: por ahora también aleatoria.
      // Se puede extender con prompts de readline.
      this.board.placeShipsRandomly(DEFAULT_SHIPS);
      console.log(`${this.name}: barcos colocados (modo automático por ahora).`);
    }
  }

  takeShot(opponentBoard, row, col) {
    const result = opponentBoard.receiveShot(row, col);
    this.shots.push({ row, col, result });
    return result;
  }

  /**
   * Disparo de IA: elige casilla no disparada al azar.
   */
  aiShot(opponentBoard) {
    let row, col, result;
    let attempts = 0;
    do {
      row = Math.floor(Math.random() * opponentBoard.size);
      col = Math.floor(Math.random() * opponentBoard.size);
      result = opponentBoard.receiveShot(row, col);
      attempts++;
    } while ((result === 'already' || result === 'invalid') && attempts < 200);

    this.shots.push({ row, col, result });
    return { row, col, result };
  }
}

module.exports = { Player, DEFAULT_SHIPS };
