import {
  PREPARATION_PHASE_P1,
  PREPARATION_PHASE_P2,
  PLAYER_ONE,
  GAME_PHASE,
} from '../constants';

import { CHANGE_GAME_PHASE, NEXT_PLAYER_TURN, RESET_GAME } from '../actions';
import { switchPlayer } from '../utils';

const defaultState = {
  phase: PREPARATION_PHASE_P1,
  currentPlayer: PLAYER_ONE,
};

const gameReducer = (state = defaultState, action) => {
  switch (action.type) {
    case CHANGE_GAME_PHASE: {
      const { currentPlayer } = state;
      let nextPhase;

      if (currentPlayer === PLAYER_ONE) {
        nextPhase = PREPARATION_PHASE_P2;
      } else {
        nextPhase = GAME_PHASE;
      }

      return {
        ...state,
        phase: nextPhase,
        currentPlayer: switchPlayer(currentPlayer),
      };
    }

    case NEXT_PLAYER_TURN: {
      const { currentPlayer } = action;

      return {
        ...state,
        currentPlayer: switchPlayer(currentPlayer),
      };
    }

    case RESET_GAME: {
      return defaultState;
    }

    default: return state;
  }
};

export default gameReducer;
