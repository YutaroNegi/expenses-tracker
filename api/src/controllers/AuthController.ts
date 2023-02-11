import bcrypt from "bcrypt";
const saltRounds = 10;

import { Request, Response } from "express";
import { User } from "../models/UserModel.js";


export class AuthController {
    static async login(req: Request, res: Response) {
        const { email, password } = req.body;
        const missingCredentials = !email || !password;
        const invalidCredentials = () =>
            res.status(401).json({ message: 'Invalid credentials' });

       if (missingCredentials) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        try {
            const user : any = await User.findOne({ where: { email } });
            if (!user) {
                return invalidCredentials();
            }

            const isValidPassword = bcrypt.compareSync(password, user.password);
            if (!isValidPassword) {
                return invalidCredentials();
            }

            return res.status(200).json({ ...user});
        } catch (error) {
            // console.log('Error logging in user', error);
            return res.status(500).json({
                message: 'Error logging in user',
                error,
            });
        }
    }

    static async register(req: Request, res: Response) {
        const { email, password, firstName, lastName } = req.body;
      
        if (!email || !password || !firstName || !lastName) {
          return res.status(400).json({
            message: 'Invalid credentials'
          });
        }
      
        const hash = bcrypt.hashSync(password, saltRounds);
      
        try {
          const user = await User.create({
            email,
            password: hash,
            firstName,
            lastName
          });
      
          return res.status(201).json({
            ...user.toJSON()
          });
        } catch (error) {
          console.error('Error creating user:', error.message);
          return res.status(500).json({
            message: 'Error creating user',
            error: error.message
          });
        }
      }

    static async forgotPassword(req: Request, res: Response) {
        res.send("Forgot password page")
    }
}