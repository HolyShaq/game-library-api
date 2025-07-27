import express from "express";
import { makeGameController } from "../controllers/gameController.js";
import authGuard from "../middleware/authGuard.js"
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
gamesRouter.post("/", authGuard, addGame);

gamesRouter.get("/:id", getGame);
gamesRouter.put("/:id", authGuard, updateGame);
gamesRouter.patch("/:id", authGuard, patchGame);
gamesRouter.delete("/:id", authGuard, deleteGame);

export default gamesRouter;
