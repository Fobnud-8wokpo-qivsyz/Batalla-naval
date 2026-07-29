/**
 * Jugador (humano o IA)
 */

const { Board } = require('./board');

class Player {
  constructor(name, isAI = false) {
    this.name = name;
    this.isAI = isAI;
    this.board = new Board();
    this.shots = [];
  }

  placeShips() {
    // TODO: lógica de colocación (manual o aleatoria para IA)
    console.log(`${this.name}: colocando barcos...`);
  }

  takeShot(opponentBoard, row, col) {
    const result = opponentBoard.receiveShot(row, col);
    this.shots.push({ row, col, result });
    return result;
  }
}

module.exports = { Player };
