import { beforeEach, describe, expect, jest } from "@jest/globals";
import { makeAuthController } from "./authController";
import { mockUserModel, fakeRes } from "../utils/test-tools.js";
import { cleanUser } from "../utils/cleaner.js";

const authController = makeAuthController({ model: mockUserModel });

describe("register", () => {
  beforeAll(() => {
    process.env.ACCESS_TOKEN_SECRET = "test_secret";
    process.env.REFRESH_TOKEN_SECRET = "test_refresh";
  });

  describe("given that valid details were given", () => {
    it("should return the created user", async () => {
      const mockUser = {
        username: "holyshaq",
        email: "ace@gmail.com",
        password: "123",
      };
      const req = {
        body: mockUser,
      };
      const res = fakeRes();

      mockUserModel.findOne.mockResolvedValue(null);
      const mockUserDocument = {
        _id: 123,
        ...req.body,
      };
      mockUserModel.create.mockResolvedValue(mockUserDocument);

      await authController.register(req, res);

      expect(res.statusCode).toBe(201);
      expect(res.body.message).toEqual("User registered successfully");
      expect(res.body.user).toEqual(cleanUser(mockUserDocument));
      expect(res.body.accessToken).toBeDefined();
    });

    it("should throw an error when email is already existing", async () => {
      const mockUser = {
        username: "holyshaq",
        email: "ace@gmail.com",
        password: "123",
      };
      const req = {
        body: mockUser,
      };
      const res = fakeRes();
      const next = jest.fn();

      mockUserModel.findOne.mockResolvedValue(mockUser);

      await authController.register(req, res, next);

      expect(next).toHaveBeenCalledWith(Error("Email already in use"));
    });
  });

  describe("given that invalid details were given", () => {
    it("should throw a CastError", async () => {
      const req = {
        body: {
          username: null,
          email: null,
          password: null,
        },
      };
      const res = fakeRes();
      const next = jest.fn();

      mockUserModel.findOne.mockResolvedValue(null);
      mockUserModel.create.mockRejectedValue(Error("CastError"));

      await authController.register(req, res, next);

      expect(next).toHaveBeenCalledWith(Error("CastError"));
    });
  });
});
