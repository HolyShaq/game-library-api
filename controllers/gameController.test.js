import { describe, expect, jest } from "@jest/globals";
import { mockGameModel, fakeRes } from "../utils/test-tools.js";
import makeGameController from "./gameController.js";

const gameController = makeGameController({
  model: mockGameModel,
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
      mockGameModel.findById.mockImplementation(() => ({
        lean: jest.fn().mockResolvedValue(mockGame),
      }));

      await gameController.getGame(req, res);

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(mockGame);
    });

    it("should throw a Game not found error if game id does not exist", async () => {
      const req = { params: { _id: "123" } };
      const res = fakeRes();
      const next = jest.fn();

      mockGameModel.findById.mockImplementation(() => ({
        lean: jest.fn().mockResolvedValue(null),
      }));

      await gameController.getGame(req, res, next);

      expect(next).toHaveBeenCalledWith(Error("Game not found"));
    });
  });

  describe("given an invalid id", () => {
    it("should throw a CastError", async () => {
      const req = { params: { _id: "invalid_id" } };
      const res = {};
      const next = jest.fn();

      mockGameModel.findById.mockImplementation(() => ({
        lean: jest.fn().mockRejectedValue(Error("CastError")),
      }));

      await gameController.getGame(req, res, next);

      expect(next).toHaveBeenCalledWith(Error("CastError"));
    });
  });
});

describe("addGame", () => {
  describe("given a valid game object", () => {
    it("should return a valid game object", async () => {
      const gameObject = { title: "Hollow Knight", releaseYear: 2021 };
      const req = { body: gameObject };
      const res = fakeRes();

      mockGameModel.create.mockResolvedValue({ _doc: gameObject });

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

      mockGameModel.create.mockRejectedValue(Error("ValidationError"));

      await gameController.addGame(req, res, next);

      expect(next).toHaveBeenCalledWith(Error("ValidationError"));
    });
  });
});
