/**
 * Batalla Naval - Lógica principal
 * Estilo Grok: claro, directo y listo para evolucionar.
 *
 * Ejecutar: npm start
 */

const readline = require('readline');
const { Player } = require('./player');
const { resultMessage } = require('./utils');

class Game {
  constructor() {
    this.player1 = new Player('Jugador');
    this.player2 = new Player('IA', true);
    this.current = this.player1;
    this.opponent = this.player2;
    this.gameOver = false;
    this.rl = null;
  }

  start() {
    console.log('⚔️  ¡Bienvenido a Batalla Naval!');
    console.log('Tablero 10x10. Coloca barcos y hunde la flota enemiga.\n');

    this.player1.placeShips();
    this.player2.placeShips();

    console.log('\nTu tablero (barcos visibles):');
    this.player1.board.print(false);
    console.log('\nTablero enemigo (oculto):');
    this.player2.board.print(true);

    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    this.promptShot();
  }

  promptShot() {
    if (this.gameOver) {
      this.rl.close();
      return;
    }

    if (this.current.isAI) {
      this.aiTurn();
      return;
    }

    this.rl.question('\nTu turno. Dispara (fila col, ej: 3 5): ', (answer) => {
      const parts = answer.trim().split(/\s+/);
      if (parts.length < 2) {
        console.log('Formato: fila col (números 0-9)');
        this.promptShot();
        return;
      }

      const row = parseInt(parts[0], 10);
      const col = parseInt(parts[1], 10);

      if (Number.isNaN(row) || Number.isNaN(col)) {
        console.log('Coordenadas inválidas.');
        this.promptShot();
        return;
      }

      const result = this.current.takeShot(this.opponent.board, row, col);
      console.log(resultMessage(result, this.current.name));

      if (result === 'already' || result === 'invalid') {
        this.promptShot();
        return;
      }

      console.log('\nTablero enemigo:');
      this.opponent.board.print(true);

      if (this.opponent.board.isAllSunk()) {
        console.log(`\n🏆 ¡${this.current.name} gana! Flota enemiga hundida.`);
        this.gameOver = true;
        this.rl.close();
        return;
      }

      this.swapTurns();
      this.promptShot();
    });
  }

  aiTurn() {
    const { row, col, result } = this.current.aiShot(this.opponent.board);
    console.log(`\nIA dispara a (${row}, ${col}) → ${resultMessage(result)}`);

    if (this.opponent.board.isAllSunk()) {
      console.log(`\n🤖 ¡${this.current.name} gana! Tu flota ha sido hundida.`);
      this.gameOver = true;
      this.rl.close();
      return;
    }

    this.swapTurns();
    this.promptShot();
  }

  swapTurns() {
    const tmp = this.current;
    this.current = this.opponent;
    this.opponent = tmp;
  }
}

if (require.main === module) {
  const game = new Game();
  game.start();
}

module.exports = { Game };
