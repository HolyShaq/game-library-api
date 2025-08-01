import { cleanGame } from "../utils/cleaner.js";

// Factory for a game model controller
//    has a dependency injection for the model to be used
//    returns an object containing the essential methods for CRUD

export const makeGameController = ({ model }) => ({
  // Get single game
  getGame: async (req, res, next) => {
    try {
      const { id } = req.params;
      const game = await model.findById(id).lean();
      if (!game) throw new Error("Game not found");

      res.status(200).json(cleanGame(game));
    } catch (err) {
      next(err);
    }
  },

  // Get games with filters
  getGames: async (req, res, next) => {
    console.log(model);
    try {
      const { title, genre, platform, releaseYear } = req.query;
      const filter = {};

      if (title) filter.$text = { $search: title };
      if (genre) filter.genre = genre;
      if (platform) filter.platform = platform;
      if (releaseYear) {
        const parsedYear = parseInt(releaseYear, 10);
        if (!isNaN(parsedYear)) filter.releaseYear = parsedYear;
      }

      let query = model.find(filter).lean();
      if (title) {
        query = query
          .sort({ score: { $meta: "textScore" } })
          .select({ score: { $meta: "textScore" } });
      } else {
        query = query.sort({ releaseYear: -1 });
      }

      const games = await query;
      res.json(games.map(cleanGame));
    } catch (err) {
      next(err);
    }
  },

  // Add game
  addGame: async (req, res, next) => {
    try {
      const game = await model.create(req.body);
      res
        .status(201)
        .json({ message: "Game added successfully", game: cleanGame(game._doc) });
    } catch (err) {
      next(err);
    }
  },

  // Replace game
  updateGame: async (req, res, next) => {
    try {
      const { id } = req.params;
      const newGame = await model
        .findOneAndReplace({ _id: id }, req.body, {
          new: true,
          runValidators: true,
        }).lean();
      if (!newGame) return res.status(404).json({ error: "Game not found" });
      res.json({
        message: "Updated game successfully",
        game: cleanGame(newGame),
      });
    } catch (err) {
      next(err);
    }
  },

  // Patch game
  patchGame: async (req, res, next) => {
    try {
      const { id } = req.params;
      const newGame = await model.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      }).lean();
      if (!newGame) return res.status(404).json({ error: "Game not found" });
      res.json({
        message: "Updated game successfully",
        game: cleanGame(newGame),
      });
    } catch (err) {
      next(err);
    }
  },

  // Delete game
  deleteGame: async (req, res, next) => {
    try {
      const { id } = req.params;
      const deletedGame = await model.findByIdAndDelete(id).lean();
      if (!deletedGame)
        return res.status(404).json({ error: "Game not found" });
      res.json({
        message: "Deleted game successfully",
        game: cleanGame(deletedGame),
      });
    } catch (err) {
      next(err);
    }
  },
});

export default makeGameController;
