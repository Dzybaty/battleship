export const CHANGE_GAME_PHASE = 'CHANGE_GAME_PHASE';
export const changeGamePhase = () => ({ type: CHANGE_GAME_PHASE });

export const NEXT_PLAYER_TURN = 'NEXT_PLAYER_TURN';
export const nextPlayerTurn = (currentPlayer) => ({
  type: NEXT_PLAYER_TURN,
  currentPlayer,
});

export const RESET_GAME = 'RESET_GAME';
export const resetGame = () => ({ type: RESET_GAME });
