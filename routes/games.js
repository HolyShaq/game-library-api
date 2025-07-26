import express from "express";
import { getGames, addGame } from "../controllers/gameControllers.js";

const gamesRouter = express.Router();

gamesRouter.get("/", getGames);
gamesRouter.post("/", addGame);

export default gamesRouter;
