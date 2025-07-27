import mongoose from "mongoose";

const gameSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    genre: { type: String, default: "unknown", trim: true, lowercase: true },
    platform: { type: String, default: "unknown", trim: true, lowercase: true },
    releaseYear: { type: Number, required: true, min: 1950, index: true },
    description: { type: String, default: "", trim: true },
  },
  { timestamps: true },
);

gameSchema.index({ title: "text" });
gameSchema.index({ genre: 1, platform: 1 });

export const Game = mongoose.model("Game", gameSchema);
