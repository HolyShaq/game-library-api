import express from "express";
import { getGames, addGame, updateGame, patchGame } from "../controllers/gameControllers.js";

const gamesRouter = express.Router();

gamesRouter.get("/", getGames);
gamesRouter.post("/", addGame);
gamesRouter.put("/:id", updateGame);
gamesRouter.patch("/:id", patchGame);

export default gamesRouter;
