import axios from 'axios';

type LoginForm = {
    email: string;
    password: string;
};

type RegisterForm = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
};

const baseUrl = 'https://dummyjson.com/auth';

export class AuthService {
    async login(loginForm: LoginForm) {
        try {
            // todo: implement login
            const response = await axios.post(baseUrl + '/login', {
                username: loginForm.email,
                password: loginForm.password
            });

            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async register(registerForm: RegisterForm) {
        try {
            // todo: implement  register

            const response = await axios.post(baseUrl + '/login', {
                username: registerForm.email,
                password: registerForm.password
            });

            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async forgotPassword(email: string) {
        return true
    }
}