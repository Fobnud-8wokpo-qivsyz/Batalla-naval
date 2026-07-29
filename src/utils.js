/**
 * Utilidades generales
 */

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function printBoard(board, hideShips = true) {
  // Representación simple en consola
  console.log('  ' + Array.from({ length: board.size }, (_, i) => i).join(' '));
  board.grid.forEach((row, i) => {
    const cells = row.map(cell => {
      if (cell === 'hit') return 'X';
      if (cell === 'miss') return '·';
      return hideShips ? '~' : (cell ? 'S' : '~');
    }).join(' ');
    console.log(`${i} ${cells}`);
  });
}

module.exports = { randomInt, printBoard };
