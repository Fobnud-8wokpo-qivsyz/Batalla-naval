/**
 * Tablero de Batalla Naval
 */

class Board {
  constructor(size = 10) {
    this.size = size;
    this.grid = Array.from({ length: size }, () => Array(size).fill(null));
    this.ships = [];
  }

  placeShip(ship, row, col, horizontal = true) {
    // Validación básica (expandir según reglas)
    if (row < 0 || col < 0 || row >= this.size || col >= this.size) {
      return false;
    }
    // TODO: verificar colisiones y límites
    this.ships.push({ ship, row, col, horizontal });
    return true;
  }

  receiveShot(row, col) {
    if (this.grid[row][col] === 'hit' || this.grid[row][col] === 'miss') {
      return 'already';
    }
    // TODO: detectar impacto real
    this.grid[row][col] = 'miss';
    return 'miss';
  }

  isAllSunk() {
    return this.ships.every(s => s.ship.isSunk?.() ?? false);
  }
}

module.exports = { Board };
