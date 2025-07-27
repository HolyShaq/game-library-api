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

const fakeRes = () => ({
  statusCode: 200,
  body: null,
  status(code) {
    this.statusCode = code;
    return this;
  },
  json(data) {
    this.body = data;
    return this;
  },
});

describe("getGame", () => {
  describe("given a valid id", () => {
    it("should return a valid game object", async () => {
      const req = { params: { _id: "123" } };
      const res = fakeRes();

      const mockGame = {
        _id: "123",
        title: "Hollow Knight",
      };
      mockGameModel.findById.mockResolvedValue(mockGame);

      await gameController.getGame(req, res);

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(mockGame);
    });

    it("should throw a Game not found error if game id does not exist", async () => {
      const req = { params: { _id: "123" } };
      const res = fakeRes();
      const next = jest.fn();

      mockGameModel.findById.mockResolvedValue(null);

      await gameController.getGame(req, res, next);

      expect(next).toHaveBeenCalledWith(new Error("Game not found"));
    });
  });

  describe("given an invalid id", () => {
    it("should throw a CastError", async () => {
      const req = { params: { _id: "invalid_id" } };
      const res = {};
      const next = jest.fn();

      mockGameModel.findById.mockRejectedValue(new Error("CastError"));

      await gameController.getGame(req, res, next);

      expect(next).toHaveBeenCalledWith(new Error("CastError"));
    });
  });
});

describe("addGame", () => {
  describe("given a valid game object", () => {
    it("should return a valid game object", async () => {
      const gameObject = { title: "Hollow Knight", releaseYear: 2021 };
      const req = { body: gameObject };
      const res = fakeRes();

      mockGameModel.create.mockResolvedValue(gameObject);

      await gameController.addGame(req, res);

      expect(res.statusCode).toBe(201);
      expect(res.body.game).toEqual(gameObject);
      expect(res.body.message).toBe("Game added successfully");
    });
  });

  describe("given an invalid game object", () => {
    it("should throw a ValidationError", async () => {
      const req = { body: {} };
      const res = fakeRes();
      const next = jest.fn();

      mockGameModel.create.mockRejectedValue(new Error("ValidationError"));
      
      await gameController.addGame(req, res, next);

      expect(next).toHaveBeenCalledWith(new Error("ValidationError"));
    })
  });
});
