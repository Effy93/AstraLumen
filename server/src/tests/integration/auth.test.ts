import request from "supertest";
import express from "express";
import authController from "../../controllers/auth.controller";
import UserRepository from "../../repositories/UserRepository";
import bcrypt from "bcrypt";

// Mock du repository pour éviter la vraie DB
jest.mock("../../repositories/UserRepository");

const app = express();
app.use(express.json());
app.post("/login", authController.login);

describe("Auth security", () => {

  afterEach(() => {
    // CLEAN : reset des mocks après chaque test
    jest.clearAllMocks();
  });

  /**
   * TEST 1
   * Cas : utilisateur inexistant
   */
  test("should return 401 when user does not exist", async () => {

    // ======================
    // ARRANGE (préparation)
    // ======================
    const mockedGetUserByEmail = jest.mocked(UserRepository.getUserByEmail);
    mockedGetUserByEmail.mockResolvedValue([]);

    const payload = {
      email: "unknown@test.com",
      password: "123"
    };

    // ======================
    // ACT (exécution)
    // ======================
    const res = await request(app)
      .post("/login")
      .send(payload);

    // ======================
    // ASSERT (vérification)
    // ======================
    expect(res.status).toBe(401);
  });

  /**
   * TEST 2
   * Cas : mauvais mot de passe
   */
  test("should return 401 when password is incorrect", async () => {

    // ======================
    // ARRANGE (préparation)
    // ======================
    const mockedGetUserByEmail = jest.mocked(UserRepository.getUserByEmail);

    const hashedPassword = await bcrypt.hash("real", 10);

    mockedGetUserByEmail.mockResolvedValue([
      {
        id: 1,
        email: "eva@test.com",
        password: hashedPassword,
        name: "eva",
        createdAt: Date.now()
      } as any
    ]);

    const payload = {
      email: "eva@test.com",
      password: "wrong"
    };

    // ======================
    // ACT (exécution)
    // ======================
    const res = await request(app)
      .post("/login")
      .send(payload);

    // ======================
    // ASSERT (vérification)
    // ======================
    expect(res.status).toBe(401);
  });

});