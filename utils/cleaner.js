
export const cleanGame = (game) => {
  const { __v, createdAt, updatedAt, ...cleanedGame } = game;
  return cleanedGame;
};
