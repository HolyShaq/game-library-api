import express from "express";
import { makeGameController } from "../controllers/gameController.js";
import { Game } from "../models/Game.js";

// Inject mongoose Game model into controller
const {
  getGames,
  addGame,
  getGame,
  updateGame,
  patchGame,
  deleteGame
} = makeGameController({ model: Game });

const gamesRouter = express.Router();

gamesRouter.get("/", getGames);
gamesRouter.post("/", addGame);

gamesRouter.get("/:id", getGame);
gamesRouter.put("/:id", updateGame);
gamesRouter.patch("/:id", patchGame);
gamesRouter.delete("/:id", deleteGame);

export default gamesRouter;
