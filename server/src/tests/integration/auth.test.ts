import request from "supertest";
import express from "express";
import authController from "../../controllers/auth.controller";
import UserRepository from "../../repositories/UserRepository";
import bcrypt from "bcrypt";
import { jest } from "@jest/globals";

jest.mock("../../repositories/UserRepository");

const app = express();
app.use(express.json());
app.post("/login", authController.login);

describe("Auth security", () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("login fails if user does not exist", async () => {
    (UserRepository.getUserByEmail as jest.Mock).mockResolvedValue([]);

    const res = await request(app).post("/login").send({
      email: "unknown@test.com",
      password: "123"
    });

    expect(res.status).toBe(401);
  });

  test("login fails with wrong password", async () => {
    (UserRepository.getUserByEmail as jest.Mock).mockResolvedValue([
      { id:1, email:"eva@test.com", password: await bcrypt.hash("real",10) }
    ]);

    const res = await request(app).post("/login").send({
      email: "eva@test.com",
      password: "wrong"
    });

    expect(res.status).toBe(401);
  });

});