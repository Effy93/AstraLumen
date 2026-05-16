import request from "supertest";
import express from "express";
import UserController from "../../controllers/user.controller";
import UserRepository from "../../repositories/UserRepository";

// Mock du repository (évite toute vraie DB)
jest.mock("../../repositories/UserRepository");

const app = express();
app.use(express.json());

// Routes testées
app.post("/users", UserController.create);
app.get("/users", UserController.browse);

describe("User API", () => {

  afterEach(() => {
    // CLEAN : reset des mocks après chaque test
    jest.clearAllMocks();
  });

  /**
   * TEST 1
   * Cas : champs manquants dans la requête
   */
  test("should return 404 when required fields are missing", async () => {

    // ======================
    // ARRANGE (préparation)
    // ======================
    const payload = {}; // aucun champ

    // ======================
    // ACT (exécution)
    // ======================
    const res = await request(app)
      .post("/users")
      .send(payload);

    // ======================
    // ASSERT (vérification)
    // ======================
    expect(res.status).toBe(404);
  });

  /**
   * TEST 2
   * Cas : email déjà utilisé (user existant)
   */
  test("should return 401 when email already exists", async () => {

    // ======================
    // ARRANGE (préparation)
    // ======================
    const mockedGetUserByEmail = jest.mocked(UserRepository.getUserByEmail);

    // simulate user already exists
    mockedGetUserByEmail.mockResolvedValue([
      {
        id: 1,
        email: "eva@test.com"
      } as any
    ]);

    const payload = {
      name: "Eva",
      email: "eva@test.com",
      password: "123"
    };

    // ======================
    // ACT (exécution)
    // ======================
    const res = await request(app)
      .post("/users")
      .send(payload);

    // ======================
    // ASSERT (vérification)
    // ======================
    expect(res.status).toBe(401);
  });

  /**
   * TEST 3
   * Cas : récupération des users (GET /users)
   */
  test("should return all users", async () => {

    // ======================
    // ARRANGE (préparation)
    // ======================
    const mockedReadAll = jest.mocked(UserRepository.readAll);

    mockedReadAll.mockResolvedValue([
      {
        id: 1,
        name: "Eva",
        email: "eva@test.com"
      } as any
    ]);

    // ======================
    // ACT (exécution)
    // ======================
    const res = await request(app)
      .get("/users");

    // ======================
    // ASSERT (vérification)
    // ======================
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].email).toBe("eva@test.com");
  });

});