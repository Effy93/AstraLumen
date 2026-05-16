import request from "supertest";
import express from "express";
import UserController from "../../controllers/user.controller";
import UserRepository from "../../repositories/UserRepository";

jest.mock("../../repositories/UserRepository");

const app = express();
app.use(express.json());
app.post("/users", UserController.create);
app.get("/users", UserController.browse);

describe("User API", () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("POST /users should reject missing fields", async () => {
    const res = await request(app).post("/users").send({});
    expect(res.status).toBe(404);
  });

  test("POST /users should reject duplicate email", async () => {
    (UserRepository.getUserByEmail as jest.Mock).mockResolvedValue([{}]);

    const res = await request(app).post("/users").send({
      name: "Eva",
      email: "eva@test.com",
      password: "123"
    });

    expect(res.status).toBe(401);
  });

});