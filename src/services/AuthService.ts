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

const baseUrl = './api/auth';

export class AuthService {
    async login(loginForm: LoginForm) {
        try {
            // todo: implement login
            const response = await axios.post(baseUrl + '/login', {
                email: loginForm.email,
                password: loginForm.password
            });

            localStorage.setItem('user', JSON.stringify(response.data.dataValues));

            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async register(registerForm: RegisterForm) {
        try {
            const response = await axios.post(baseUrl + '/register', {
                firstName: registerForm.firstName,
                lastName: registerForm.lastName,
                email: registerForm.email,
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