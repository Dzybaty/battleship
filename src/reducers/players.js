import { PLACE_SHIP, MAKE_SHOT, RESET_GAME } from '../actions';

import { generateEmptyField, getClosestCells, switchPlayer } from '../utils';

const defaultState = {
  p1: {
    field: generateEmptyField(),
    placedShips: [],
    isLastShotSuccessful: false,
    hits: 0,
    misses: 0,
  },

  p2: {
    field: generateEmptyField(),
    placedShips: [],
    isLastShotSuccessful: false,
    hits: 0,
    misses: 0,
  },
};

const fieldReducer = (state = defaultState, action) => {
  switch (action.type) {
    case PLACE_SHIP: {
      const {
        shipId, positionX, positionY, size, currentPlayer,
      } = action.payload;

      const newField = state[currentPlayer].field.concat();
      const newPlacedShips = state[currentPlayer].placedShips.concat();

      // Fill next cells according to ship size
      for (let i = 0; i < size; i += 1) {
        const nextY = positionY + i;
        newField[positionX][nextY] = { positionX, positionY: nextY, shipId };

        const closestCells = getClosestCells(positionX, nextY);

        // Mark closest cells as adjacent so the rule of 1 cell spacing between ships is observed
        closestCells.forEach((cell) => {
          const [cellX, cellY] = cell;
          if (!newField[cellX][cellY].shipId) {
            newField[cellX][cellY].isAdjacent = true;
          }
        });
      }

      newPlacedShips.push(shipId);

      return {
        ...state,
        [currentPlayer]: {
          ...state[currentPlayer],
          field: newField,
          placedShips: newPlacedShips,
        },
      };
    }

    case MAKE_SHOT: {
      const { player, coords: { x, y } } = action;
      let isSuccessfulShot;

      const enemyPlayer = switchPlayer(player);
      const enemyField = state[enemyPlayer].field.concat();
      let { hits, misses } = state[player];

      // check if enemy ship is present at coords
      if (enemyField[x][y].shipId) {
        // check if this cell wasn't already hit
        if (!enemyField[x][y].isHitAndDamaged) {
          hits += 1;
        }

        enemyField[x][y].isHitAndDamaged = true;
        isSuccessfulShot = true;
      } else {
        if (!enemyField[x][y].isHitAndMissed && !enemyField[x][y].isHitAndDamaged) {
          misses += 1;
        }

        enemyField[x][y].isHitAndMissed = true;
        isSuccessfulShot = false;
      }

      return {
        ...state,
        [enemyPlayer]: {
          ...state[enemyPlayer],
          field: enemyField,
        },
        [player]: {
          ...state[player],
          isLastShotSuccessful: isSuccessfulShot,
          hits,
          misses,
        },
      };
    }

    case RESET_GAME: {
      return {
        p1: {
          ...defaultState.p1,
          // Generating new field so two arrays are actually different objects
          field: generateEmptyField(),
        },

        p2: {
          ...defaultState.p2,
          field: generateEmptyField(),
        },
      };
    }

    default: return state;
  }
};

export default fieldReducer;
