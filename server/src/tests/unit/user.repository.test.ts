import UserRepository from "../../repositories/UserRepository";
import { db } from "../../db";

// Mock correct du module db
jest.mock("../../db", () => ({
  db: {
    query: jest.fn()
  }
}));

describe("UserRepository", () => {

  afterEach(() => {
    // CLEAN : reset des mocks après chaque test
    jest.clearAllMocks();
  });

  /**
   * TEST 1
   * Cas : insertion d’un utilisateur en base
   */
  test("should insert a user (create)", async () => {

    // ======================
    // ARRANGE (préparation)
    // ======================
    (db.query as jest.Mock).mockResolvedValue([
      { insertId: 1 }
    ]);

    const user = {
      name: "Eva",
      email: "eva@test.com",
      password: "hashed",
      createdAt: Date.now()
    };

    // ======================
    // ACT (exécution)
    // ======================
    const result = await UserRepository.create(user as any);

    // ======================
    // ASSERT (vérification)
    // ======================
    expect(db.query).toHaveBeenCalled();
    expect(result).toBeDefined();
  });

  /**
   * TEST 2
   * Cas : récupération utilisateur par email
   */
  test("should return user by email", async () => {

    // ======================
    // ARRANGE (préparation)
    // ======================
    (db.query as jest.Mock).mockResolvedValue([
      [
        {
          id: 1,
          email: "eva@test.com"
        }
      ]
    ]);

    // ======================
    // ACT (exécution)
    // ======================
    const users = await UserRepository.getUserByEmail("eva@test.com");

    // ======================
    // ASSERT (vérification)
    // ======================
    expect(users.length).toBe(1);
    expect(users[0].email).toBe("eva@test.com");
  });

});