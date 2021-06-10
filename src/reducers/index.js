import { combineReducers } from 'redux';

import players from './players';
import game from './game';
import modal from './modal';

export default combineReducers({
  players,
  game,
  modal,
});
