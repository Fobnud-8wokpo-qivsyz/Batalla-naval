/**
 * Utilidades generales
 */

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function printBoard(board, hideShips = true) {
  board.print(hideShips);
}

function resultMessage(result, name = '') {
  const prefix = name ? `${name}: ` : '';
  switch (result) {
    case 'hit': return `${prefix}¡Impacto!`;
    case 'sunk': return `${prefix}¡Barco hundido!`;
    case 'miss': return `${prefix}Agua...`;
    case 'already': return `${prefix}Ya disparaste ahí.`;
    case 'invalid': return `${prefix}Coordenadas inválidas.`;
    default: return `${prefix}${result}`;
  }
}

module.exports = { randomInt, printBoard, resultMessage };
