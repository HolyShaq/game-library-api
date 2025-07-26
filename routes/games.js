import express from "express";
import { getGames, addGame, updateGame } from "../controllers/gameControllers.js";

const gamesRouter = express.Router();

gamesRouter.get("/", getGames);
gamesRouter.post("/", addGame);
gamesRouter.put("/:id", updateGame);

export default gamesRouter;
