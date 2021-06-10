// This middleware is monitoring main game actions and dispatches certain actions when needed
import {
  PLACE_SHIP,
  MAKE_SHOT,
  openModal,
} from '../actions';

import {
  placedShipsSelector,
  currentPlayerSelector,
  lastShotResultSelector,
  playerHitsSelector,
} from '../selectors';

import { MODAL_NEXT_TURN, MODAL_NEXT_PHASE, MODAL_ENDGAME } from '../constants';
import { generateGameResult } from '../utils';

const gameMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case PLACE_SHIP: {
      const nextAction = next(action);
      const state = store.getState();
      const player = currentPlayerSelector(state);
      const placedShips = placedShipsSelector(state, player);

      // Check if last ship is placed
      if (placedShips.length === 7) {
        store.dispatch(openModal(
          MODAL_NEXT_PHASE,
          'Ready to proceed?',
          'Ready',
        ));
      }

      return nextAction;
    }

    case MAKE_SHOT: {
      const nextAction = next(action);
      const state = store.getState();
      const player = currentPlayerSelector(state);
      const isLastShotSuccessful = lastShotResultSelector(state, player);
      const playerHits = playerHitsSelector(state, player);

      // Check if last enemy cell, containing a ship was hit
      if (playerHits === 19) {
        store.dispatch(openModal(
          MODAL_ENDGAME,
          generateGameResult(player, state),
          'Reset Game',
        ));
      }

      // Check if last shot was missed
      if (!isLastShotSuccessful) {
        store.dispatch(openModal(
          MODAL_NEXT_TURN,
          'You missed! Now it is next player\'s turn!',
          'Ready',
        ));
      }

      return nextAction;
    }

    default: return next(action);
  }
};

export default gameMiddleware;
