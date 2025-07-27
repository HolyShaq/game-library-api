import { jest } from "@jest/globals";

export const fakeRes = () => ({
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
  cookie(data) {
    return this;
  },
});

export const mockGameModel = {
  findById: jest.fn(() => ({
    lean: jest.fn(),
  })),
  find: jest.fn(() => ({
    lean: jest.fn(),
  })),
  create: jest.fn(),
  findOneAndReplace: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  findByIdAndDelete: jest.fn(),
};

export const mockUserModel = {
  findOne: jest.fn(),
  create: jest.fn(),
};
