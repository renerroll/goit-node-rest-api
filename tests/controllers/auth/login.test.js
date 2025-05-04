import bcrypt from "bcryptjs";
import { User } from "../../../models/user.js";
import createToken from "../../../helpers/createToken.js";
import { login } from "../../../controllers/authControllers.js";

jest.mock("bcryptjs");
jest.mock("../../../models/User.js");
jest.mock("../../../helpers/createToken.js");

describe("login controller", () => {
  const mockUser = {
    id: 1,
    email: "test@example.com",
    password: "somepass",
    subscription: "starter",
    token: null,
    save: jest.fn(),
  };

  const req = {
    body: {
      email: "test@example.com",
      password: "examplepass",
    },
  };

  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  const next = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should respond with 200, return token and user with email and subscription", async () => {
    // mocks
    User.findOne.mockResolvedValue(mockUser);
    bcrypt.compare.mockResolvedValue(true);
    createToken.mockReturnValue("exampletoken");

    await login(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      token: "exampletoken",
      user: {
        email: "test@example.com",
        subscription: "starter",
      },
    });

    const userResponse = res.json.mock.calls[0][0].user;
    expect(typeof userResponse.email).toBe("string");
    expect(typeof userResponse.subscription).toBe("string");
  });
});
