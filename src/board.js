/**
 * Tablero de Batalla Naval
 * Maneja grilla, colocación de barcos y recepción de disparos.
 */

const { Ship } = require('./ship');

class Board {
  constructor(size = 10) {
    this.size = size;
    this.grid = Array.from({ length: size }, () => Array(size).fill(null));
    this.ships = [];
  }

  /**
   * Coloca un barco. Devuelve true si se pudo colocar.
   */
  placeShip(ship, row, col, horizontal = true) {
    if (!(ship instanceof Ship)) return false;

    const positions = [];
    for (let i = 0; i < ship.length; i++) {
      const r = horizontal ? row : row + i;
      const c = horizontal ? col + i : col;

      if (r < 0 || c < 0 || r >= this.size || c >= this.size) return false;
      if (this.grid[r][c] !== null) return false; // colisión

      positions.push({ row: r, col: c });
    }

    positions.forEach(({ row: r, col: c }) => {
      this.grid[r][c] = ship;
    });

    ship.positions = positions;
    this.ships.push(ship);
    return true;
  }

  /**
   * Coloca barcos de forma aleatoria (útil para IA).
   */
  placeShipsRandomly(shipDefs) {
    for (const def of shipDefs) {
      const ship = new Ship(def.name, def.length);
      let placed = false;
      let attempts = 0;
      while (!placed && attempts < 100) {
        const horizontal = Math.random() < 0.5;
        const row = Math.floor(Math.random() * this.size);
        const col = Math.floor(Math.random() * this.size);
        placed = this.placeShip(ship, row, col, horizontal);
        attempts++;
      }
      if (!placed) {
        console.warn(`No se pudo colocar ${def.name} después de muchos intentos.`);
      }
    }
  }

  receiveShot(row, col) {
    if (row < 0 || col < 0 || row >= this.size || col >= this.size) {
      return 'invalid';
    }

    const cell = this.grid[row][col];

    if (cell === 'hit' || cell === 'miss') {
      return 'already';
    }

    if (cell instanceof Ship) {
      cell.hit();
      this.grid[row][col] = 'hit';
      if (cell.isSunk()) {
        return 'sunk';
      }
      return 'hit';
    }

    this.grid[row][col] = 'miss';
    return 'miss';
  }

  isAllSunk() {
    return this.ships.length > 0 && this.ships.every(s => s.isSunk());
  }

  /**
   * Representación en consola.
   */
  print(hideShips = true) {
    const header = '  ' + Array.from({ length: this.size }, (_, i) => String(i).padStart(2)).join('');
    console.log(header);
    this.grid.forEach((row, i) => {
      const cells = row.map(cell => {
        if (cell === 'hit') return ' X';
        if (cell === 'miss') return ' ·';
        if (cell instanceof Ship && !hideShips) return ' S';
        return ' ~';
      }).join('');
      console.log(String(i).padStart(2) + cells);
    });
  }
}

module.exports = { Board };
