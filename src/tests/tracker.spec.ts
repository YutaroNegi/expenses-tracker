import { Request, Response } from "express";
import { TrackerController } from "../controllers/TrackerController.js";
import { describe, it, expect } from 'vitest';
import { setForeignKeys } from '../database.js'

describe('Tracker tests', async () => {
    await setForeignKeys();

    it('List categories', async () => {
        const req = {} as unknown as Request;

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

        const result = await TrackerController.listCategories(req, res);
        expect(result.status).toBe(200);
    });

    it('List expenses', async () => {
        const req = {
            params: {
                userId: 1,
            }
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

        const result = await TrackerController.listExpenses(req, res);
        expect(result.status).toBe(200);
    });

    it('Create expense', async () => {
        const req = {
            body: {
                fkUserId: 57,
                fkCategoryId: 1,
                amount: 100,
                expenseDate: '2021-10-10',
                expenseName: 'Test expense',
                installments: 1,
            }
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

        const result = await TrackerController.createExpense(req, res);
        expect(result.status).toBe(201);

        const deleteReq = {
            params: {
                expenseId: result.data.expenseId,
            }

        } as unknown as Request;

        const deleteExpense = await TrackerController.deleteExpense(deleteReq, res);
        expect(deleteExpense.status).toBe(200);
    });
});


