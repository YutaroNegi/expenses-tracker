import bcrypt from "bcrypt";
import { User } from "../models/UserModel.js";
import { AuthController } from "../controllers/AuthController.js";
jest.mock("../models/UserModel", () => ({
    User: {
        findOne: jest.fn(),
    },
}));
const mockRequest = (email = "test@example.com", password = "password") => {
    const req = {
        body: {
            email,
            password,
        },
    };
    return req;
};
const mockResponse = () => {
    const res = {
        status: null,
        json: null
    };
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};
describe("AuthController", () => {
    describe("login", () => {
        it("returns 400 if email and password are not provided", async () => {
            const req = mockRequest("", "");
            const res = mockResponse();
            await AuthController.login(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                message: "Invalid credentials",
            });
        });
        it("returns 401 if email and password are invalid", async () => {
            const req = mockRequest();
            const res = mockResponse();
            User.findOne.mockResolvedValue(null);
            await AuthController.login(req, res);
            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.json).toHaveBeenCalledWith({
                message: "Invalid credentials",
            });
        });
        it("returns 200 and user data if email and password are valid", async () => {
            const req = mockRequest();
            const res = mockResponse();
            const userData = { email: "test@example.com", password: "hashedPassword" };
            bcrypt.compareSync = jest.fn().mockReturnValue(true);
            User.findOne.mockResolvedValue(userData);
            await AuthController.login(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ ...userData });
        });
        it("returns 500 if there is an error", async () => {
            const req = mockRequest();
            const res = mockResponse();
            User.findOne.mockRejectedValue(new Error("Test Error"));
            await AuthController.login(req, res);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({
                message: "Error logging in user",
                error: new Error("Test Error"),
            });
        });
    });
});
//# sourceMappingURL=auth.test.js.map