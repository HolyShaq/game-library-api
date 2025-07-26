import mongoose from "mongoose";

const gameSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, index: true },
    genre: String,
    platform: String,
    releaseYear: { type: Number, index: true },
    description: { type: String, default: "" },
  },
  { timestamps: true },
);

gameSchema.index({ title: "text" });
gameSchema.index({ genre: 1, platform: 1 });

export const Game = mongoose.model("Game", gameSchema);
