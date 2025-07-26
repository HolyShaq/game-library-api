import { Game } from "../models/Game.js";

// Get game
export const getGame = async (req, res, next) => {
  try {
    const { id } = req.params;

    const game = await Game.findById(id);

    if (!game) {
      return res.status(404).json({ message: "Game not found" });
    }

    res.json(game)
  } catch (err) {
    next(err)
  }
};

// Get games with optional filters
export const getGames = async (req, res, next) => {
  try {
    const { title, genre, platform, releaseYear } = req.query;

    const filter = {};
    if (title) filter.$text = { $search: title };
    if (genre) filter.genre = genre;
    if (platform) filter.platform = platform;
    if (releaseYear) {
      // Sanitize releaseYear (ensure it's a number)
      const parsedYear = parseInt(releaseYear, 10);
      if (!isNaN(parsedYear)) filter.releaseYear = parsedYear;
    }

    // Initial query
    let query = Game.find(filter);

    // If title is provided, sort query by search relevance
    if (title) {
      query = query
        .sort({ score: { $meta: "textScore" } })
        .select({ score: { $meta: "textScore" } }); // Include score in results
    } else {
      // Otherwise, sort by release year in descending order
      query = query.sort({ releaseYear: -1 });
    }

    const games = await query;
    res.json(games);
  } catch (err) {
    next(err)
  }
};

// Add game
export const addGame = async (req, res, next) => {
  try {
    const game = await Game.create(req.body);
    res.status(201).json({ message: "Game added successfully", game });
  } catch (err) {
    next(err)
  }
};

// Update game entirely
export const updateGame = async (req, res, next) => {
  try {
    const { id } = req.params;

    const newGame = await Game.findOneAndReplace({ _id: id }, req.body, {
      new: true,
      runValidators: true,
    });

    if (!newGame) {
      return res.status(404).json({ error: "Game not found" });
    }

    res.json({ message: "Updated game successfully", game: newGame });
  } catch (err) {
    next(err)
  }
};

// Patch game
export const patchGame = async (req, res, next) => {
  try {
    const { id } = req.params;

    const newGame = await Game.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!newGame) {
      return res.status(404).json({ error: "Game not found" });
    }

    res.json({ message: "Updated game successfully", game: newGame });
  } catch (err) {
    next(err)
  }
};

// Delete game
export const deleteGame = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedGame = await Game.findByIdAndDelete(id);

    if (!deletedGame) {
      return res.status(404).json({ error: "Game not found" });
    }

    res.json({ message: "Deleted game successfully", game: deletedGame });
  } catch (err) {
    next(err)
  }
};
