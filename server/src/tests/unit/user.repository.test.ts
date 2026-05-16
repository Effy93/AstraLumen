import UserRepository from "../../repositories/UserRepository";
import { db } from "../../db";

jest.mock("../..", () => ({
  db: { query: jest.fn() }
}));

describe("UserRepository", () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("create() should insert a user", async () => {
    (db.query as jest.Mock).mockResolvedValue([{ insertId: 1 }]);

    const user = {
      name: "Eva",
      email: "eva@test.com",
      password: "hashed",
      createdAt: Date.now()
    };

    const result = await UserRepository.create(user as any);

    expect(db.query).toHaveBeenCalled();
    expect(result).toBeDefined();
  });

  test("getUserByEmail() should return user", async () => {
    (db.query as jest.Mock).mockResolvedValue([[{ id: 1, email: "eva@test.com" }]]);

    const users = await UserRepository.getUserByEmail("eva@test.com");

    expect(users.length).toBe(1);
    expect(users[0].email).toBe("eva@test.com");
  });

});