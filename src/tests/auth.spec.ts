import { Request, Response } from "express";
import { AuthController } from "../controllers/AuthController.js";
import { describe, it, expect } from 'vitest';

describe('Auth tests', () => {
    it('login with invalid credentials', async () => {
        const req = {
            body: {
                email: "vitest@node.com",
                password: "12345",
            },
        } as unknown as Request;

        const res = {
            status: (code: number) => {
                return {
                    json: (data: any) => {
                        return {
                            status: code,
                            data: data,
                        };
                    },
                };
            },
        } as unknown as Response;

        const result = await AuthController.login(req, res);
        expect(result.status).toBe(401);
    });

    it('login with valid credentials', async () => {
        const req = {
            body: {
                email: "vitest@node.com",
                password: "1234",
            },
        } as unknown as Request;

        const res = {
            status: (code: number) => {
                return {
                    json: (data: any) => {
                        return {
                            status: code,
                            data: data,
                        };
                    },
                };
            },
        } as unknown as Response;

        const result = await AuthController.login(req, res);
        expect(result.status).toBe(200);

    });

    it('register with invalid credentials', async () => {
        const req = {
            body: {
                email: "",
                password: "1234",
                firstName: "Vitest",
                lastName: "Node",
            },
        } as unknown as Request;

        const res = {
            status: (code: number) => {
                return {
                    json: (data: any) => {
                        return {
                            status: code,
                            data: data,
                        };
                    },
                };
            }
        } as unknown as Response;

        const result = await AuthController.register(req, res);
        expect(result.status).toBe(400);

    });

    it('register with valid credentials', async () => {
        const req = {
            body: {
                email: "test@register.com",
                password: "1234",
                firstName: "Vitest",
                lastName: "Node",
            },
        } as unknown as Request;

        const res = {
            status: (code: number) => {
                return {
                    json: (data: any) => {
                        return {
                            status: code,
                            data: data,
                        };
                    },
                };
            }

        } as unknown as Response;

        const result = await AuthController.register(req, res);
        expect(result.status).toBe(201);

        const deleteRegister = await AuthController.deleteUser(req, res);
        expect(deleteRegister.status).toBe(201);
    });
});


