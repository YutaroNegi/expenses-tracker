import Box from '@mui/material/Box';
import { useAppDispatch } from '../redux/hooks';
import { AuthService } from '../services/AuthService';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { setUser } from '../redux/authSlice'
import { Toast } from '../components';

import { Input, Button } from '../components'

type RegisterCredentials = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}


export const Register = () => {
    const dispatch = useAppDispatch();
    const authService = new AuthService();

    const [registerForm, serRegisterForm] = useState({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '' });
    const [loading, setLoading] = useState(false);

    const handleRegister = async (credentials: RegisterCredentials) => {
        console.log(credentials);

        setLoading(true);
        try {
            if (credentials.password !== credentials.confirmPassword) {
                toast.error('Passwords do not match');
                setLoading(false);
                return;
            }

            const user = await authService.register(credentials)
            dispatch(setUser(user))
            toast.success('Register successful');
            setLoading(false);
        } catch (error) {
            console.log(error);
            toast.error('Register failed');
            setLoading(false);
        }

    }

    const handleInputChange = (key: string, value: string) => {
        serRegisterForm({ ...registerForm, [key]: value });
    }

    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Input
                onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                name="firstName"
                label="First name"
            />

            <Input
                onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                name="lastName"
                label="Last name"
            />

            <Input

                onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                name="email"
                label="e-mail"
            />

            <Input
                onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                name="password"
                label="Password"
                type="password"
            />

            <Input

                onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                name="confirmPassword"
                label="Confirm password"
                type="password"
            />

            <Button onClick={() => handleRegister(registerForm)} label="Register" loading={loading} />
            <Button to='/login' label="Login" variant='outlined'/>
            <Button to='/forgot-password' label="Forgot password" variant='outlined' />
            <Toast />
        </Box>
    );
};