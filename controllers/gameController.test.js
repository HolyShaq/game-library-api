import { beforeEach, describe, expect, jest } from "@jest/globals";
import makeGameController from "./gameController.js";

const mockGameModel = {
  findById: jest.fn(),
  find: jest.fn(),
  create: jest.fn(),
  findOneAndReplace: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  findByIdAndDelete: jest.fn(),
};
const gameController = makeGameController({
  model: mockGameModel,
});

describe("game controller", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe("given that a valid and existing id is given", () => {
    const req = { params: { id: "123" } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();
    it("should give a proper game object", async () => {
      const mockGame = {
        _id: "123",
        title: "Outer Wilds",
        releaseYear: 2007,
      };
      mockGameModel.findById.mockResolvedValue(mockGame);

      await gameController.getGame(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockGame);
      expect(next).not.toHaveBeenCalled();
    });
  });

  describe("given that a non-existing id is given", () => {
    const req = { params: { id: "123" } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    it("should throw a GameNotExisting error", async () => {
      mockGameModel.findById.mockResolvedValue(null);

      await gameController.getGame(req, res, next);

      expect(next).toHaveBeenCalledTimes(1);
      const err = next.mock.calls[0][0];
      expect(err).toBeInstanceOf(Error);
      expect(err.message).toBe("GameNotExisting");
    });
  });
});
