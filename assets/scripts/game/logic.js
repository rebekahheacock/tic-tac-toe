'use strict';

const game = require('./game');
const ui = require('./ui');

const createGameSuccess = (data) => {
  console.log(data);
  ui.clearCells();
  game.currentGame = data.game;
};

const isValidMove = (id) => {
  console.log(id);
  console.log(game.currentGame.cells);
  console.log('current value of cell is', game.currentGame.cells[id]);
  console.log('game is over?', game.currentGame.over);
  return (!game.currentGame.cells[id] && !game.currentGame.over);
};

const checkRows = (cells, id) => {
  if ([0, 1, 2].indexOf(id) > -1) {
    return ((cells[0] === cells[1]) && (cells[1] === cells[2]));
  } else if ([3, 4, 5].indexOf(id) > -1) {
    return ((cells[3] === cells[4]) && (cells[4] === cells[5]));
  } else if ([6, 7, 8].indexOf(id) > -1) {
    return ((cells[6] === cells[7]) && (cells[7] === cells[8]));
  }
};

const checkCols = (cells, id) => {
  if ([0, 3, 6].indexOf(id) > -1) {
    return ((cells[0] === cells[3]) && (cells[3] === cells[6]));
  } else if ([1, 4, 7].indexOf(id) > -1) {
    return ((cells[1] === cells[4]) && (cells[4] === cells[7]));
  } else if ([2, 5, 8].indexOf(id) > -1) {
    return ((cells[2] === cells[5]) && (cells[5] === cells[8]));
  }
};

const checkDiagonals = (cells, id) => {
  let win = false;
  if ([0, 4, 8].indexOf(id) > -1) {
    win = (cells[0] === cells[4]) && (cells[4] === cells[8]);
  }

  if ([2, 4, 6].indexOf(id) > -1) {
    if ((cells[2] === cells[4]) && (cells[4] === cells[6])) {
      win = true;
    }
  }

  return win;
};

const checkWin = (id) => {
  let cells = game.currentGame.cells;
  console.log('checking for a win using cell', id);
  if (checkRows(cells, id)) {
    return true;
  } else if (checkCols(cells, id)) {
    return true;
  } else if ([0, 2, 4, 6, 8].indexOf(id) > -1) {
    if (checkDiagonals(cells, id)) {
      return true;
    }
  } else {
    return false;
  }
};

const isOver = (id) => {
  if (game.currentGameMoves >= 5 && checkWin(id)) {
    game.winner = game.xTurn ? 'x' : 'o';
    return true;
  } else if (game.currentGameMoves === 9 && !checkWin(id)) {
    game.winner = 'tie';
    return true;
  } else {
    game.xTurn = !game.xTurn;
    return false;
  }
};

const takeTurnSuccess = (data) => {
  console.log(data);
  game.currentGame = data.game;
  game.currentGameMoves++;
  let id = game.currentCellId;
  console.log('current moves', game.currentGameMoves);
  ui.markCell(id);

  return isOver(id);

};

const updateGame = (data) => {
  game.currentGame = data.game;
};

module.exports = {
  createGameSuccess,
  isValidMove,
  takeTurnSuccess,
  updateGame,
};