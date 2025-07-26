import { Game } from "../models/Game.js";

// Get games with optional filters
export const getGames = async (req, res) => {
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
    res.status(500).json({ error: "Server error" });
  }
};

// Add game
export const addGame = async (req, res) => {
  try {
    const game = await Game.create(req.body);
    res.status(201).json({ message: "Game added successfully", game });
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).json({ error: err.message });
    }
    res.status(500).json({ error: "Server error" });
  }
};
