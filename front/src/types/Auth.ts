export interface LoginForm {
    email: string;
    password: string;
}

export interface User {
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
}

export interface AuthState {
    loginForm: LoginForm;
    user: User
}

export interface  RegisterForm {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}