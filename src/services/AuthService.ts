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

const baseUrl = process.env.REACT_APP_API_URL +  '/auth' || 'http://localhost:3000/auth';

export class AuthService {
    async login(loginForm: LoginForm) {
        // todo: implement login
        const response = await axios.post(baseUrl + '/login', {
            email: loginForm.email,
            password: loginForm.password
        });

        localStorage.setItem('user', JSON.stringify(response.data.dataValues));

        return response.data;
    }

    async register(registerForm: RegisterForm) {
        const response = await axios.post(baseUrl + '/register', {
            firstName: registerForm.firstName,
            lastName: registerForm.lastName,
            email: registerForm.email,
            password: registerForm.password
        });

        return response.data;
    }

    async forgotPassword() {
        return true
    }
}