/**
 * Barco de Batalla Naval
 * Estilo Grok: simple, robusto y sin misterios.
 */

class Ship {
  constructor(name, length) {
    this.name = name;
    this.length = length;
    this.hits = 0;
    this.positions = []; // [{row, col}, ...]
  }

  hit() {
    this.hits += 1;
  }

  isSunk() {
    return this.hits >= this.length;
  }

  occupies(row, col) {
    return this.positions.some(p => p.row === row && p.col === col);
  }
}

module.exports = { Ship };
