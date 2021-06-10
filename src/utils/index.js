import { playerHitsSelector, playerMissesSelector } from '../selectors';
import { PLAYER_ONE, PLAYER_TWO } from '../constants';

export const generateEmptyField = () => {
  const field = [10];
  for (let i = 0; i < 10; i += 1) {
    field[i] = [10];
    for (let j = 0; j < 10; j += 1) {
      field[i][j] = {
        positionX: i,
        positionY: j,
        shipId: null,
        isAdjacent: false,
      };
    }
  }

  return field;
};

// Check for field borders and adjacent cells of another ships
export const checkIfShipFits = (positionX, positionY, offset, field) => {
  for (let y = positionY + 1; y < positionY + offset; y += 1) {
    if (field[positionX][y]?.isAdjacent) {
      return false;
    }
  }

  return positionY + offset < 11;
};

export const getClosestCells = (positionX, positionY) => {
  const closestCells = [];

  for (let x = -1; x <= 1; x += 1) {
    for (let y = -1; y <= 1; y += 1) {
      if ((positionX + x < 10 && positionY + y < 10)
            && (positionX + x >= 0 && positionY + y >= 0)
            && (x !== 0 || y !== 0)) {
        closestCells.push([positionX + x, positionY + y]);
      }
    }
  }

  return closestCells;
};

export const switchPlayer = (currentPlayer) => {
  if (currentPlayer === PLAYER_ONE) {
    return PLAYER_TWO;
  }

  return PLAYER_ONE;
};

export const prettyPlayerName = (player) => (player === PLAYER_ONE ? 'Player 1' : 'Player 2');

export const generateGameResult = (winner, state) => {
  const player1Hits = playerHitsSelector(state, PLAYER_ONE);
  const player2Hits = playerHitsSelector(state, PLAYER_TWO);
  const player1Misses = playerMissesSelector(state, PLAYER_ONE);
  const player2Misses = playerMissesSelector(state, PLAYER_TWO);

  return (
    `${prettyPlayerName(winner)} wins!\n
    Player 1 results:\n
    Hits: ${player1Hits}, Misses: ${player1Misses}\n
    Player 2 results:\n
    Hits: ${player2Hits}, Misses: ${player2Misses}\n
    `
  );
};
