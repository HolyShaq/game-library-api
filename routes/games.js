import express from "express";
import { getGame, getGames, addGame, updateGame, patchGame, deleteGame } from "../controllers/gameControllers.js";

const gamesRouter = express.Router();

gamesRouter.get("/", getGames);
gamesRouter.post("/", addGame);

gamesRouter.get("/:id", getGame);
gamesRouter.put("/:id", updateGame);
gamesRouter.patch("/:id", patchGame);
gamesRouter.delete("/:id", deleteGame);

export default gamesRouter;
