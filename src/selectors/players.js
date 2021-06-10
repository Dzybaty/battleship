export const fieldSelector = (state, player) => state.players[player].field;
export const placedShipsSelector = (state, player) => state.players[player].placedShips;
export const lastShotResultSelector = (state, player) => (
  state.players[player].isLastShotSuccessful
);

export const playerHitsSelector = (state, player) => state.players[player].hits;
export const playerMissesSelector = (state, player) => state.players[player].misses;
