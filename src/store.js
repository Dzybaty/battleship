import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import gameMiddleware from './middlewares/game';
import reducer from './reducers';

const store = createStore(
  reducer,
  process.env.REACT_APP_ENV === 'dev'
    ? composeWithDevTools(applyMiddleware(gameMiddleware))
    : applyMiddleware(gameMiddleware),
);

export default store;
