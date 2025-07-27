export const cleanGame = (game) => {
  const { __v, createdAt, updatedAt, ...cleanedGame } = game;
  return cleanedGame;
};

export const cleanUser = (user) => {
  const cleanedUser = {
    id: user._id,
    username: user.username,
    email: user.email,
  };
  return cleanedUser;
};
