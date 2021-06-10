export const MAKE_SHOT = 'MAKE_SHOT';
export const makeShot = (player, coords) => ({
  type: MAKE_SHOT,
  player,
  coords,
});
