import mongoose from "mongoose";

const gameSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    genre: { type: String, default: "unknown", trim: true },
    platform: { type: String, default: "unknown", trim: true },
    releaseYear: { type: Number, required: true, min: 1950, index: true },
    description: { type: String, default: "", trim: true },
  },
  { timestamps: true },
);

gameSchema.index({ title: "text" });
gameSchema.index({ genre: 1, platform: 1 });

// Standardize genre and platform input
gameSchema.pre("save", function (next) {
  if (this.genre) this.genre = this.genre.toLowerCase();
  if (this.platform) this.platform = this.platform.toLowerCase();
  next();
});

export const Game = mongoose.model("Game", gameSchema);
