/**
 * Batalla Naval - Lógica principal
 * Estilo Grok: claro, directo y listo para evolucionar.
 */

const { Board } = require('./board');
const { Player } = require('./player');

class Game {
  constructor() {
    this.player1 = new Player('Jugador 1');
    this.player2 = new Player('IA', true);
    this.currentPlayer = this.player1;
    this.gameOver = false;
  }

  start() {
    console.log('⚔️  ¡Bienvenido a Batalla Naval!');
    console.log('Coloca tus barcos y que comience la batalla.\n');
    // TODO: implementar colocación y loop de turnos
    console.log('Estructura lista. ¡Completa la lógica de colocación y disparos!');
  }
}

if (require.main === module) {
  const game = new Game();
  game.start();
}

module.exports = { Game };
