import axios from 'axios';

type LoginForm = {
    email: string;
    password: string;
};

const baseUrl = 'https://dummyjson.com/auth';

export class AuthService {
    async login(loginForm: LoginForm) {
        try {
            const response = await axios.post(baseUrl + '/login', {
                username: loginForm.email,
                password: loginForm.password
            });

            return response.data;
        } catch (error) {
            throw error;
        }
    }
}