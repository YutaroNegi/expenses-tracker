import React from 'react';
import Box from '@mui/material/Box';
import { useAppDispatch } from '../redux/hooks';
import { setUser } from '../redux/authSlice'
import { AuthService } from '../services/AuthService';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Input, Button } from '../components'
import { LoginForm } from '../types'

export const Login = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const authService = new AuthService();

    const [loading, setLoading] = useState(false);
    const [loginForm, setLoginForm] = useState({ email: '', password: '' });

    const handleLogin = async (credentials: LoginForm) => {
        setLoading(true);
        try {
            const user = await authService.login(credentials)
            dispatch(setUser(user.dataValues))
            toast.success('Login successful');
            setLoading(false);
            navigate('/tracker');
        } catch (error) {
            console.log(error);
            toast.error('Login failed');
            setLoading(false);
        }

    }

    const handleInputChange = (key: string, value: string) => {
        setLoginForm({ ...loginForm, [key]: value });
    }

    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Input onChange={(e) => handleInputChange(e.target.name, e.target.value)} name="email" label="e-mail" />
            <Input onChange={(e) => handleInputChange(e.target.name, e.target.value)} name="password" label="password" type="password" />
            <Button onClick={() => handleLogin(loginForm)} label="Login" loading={loading}/>
            <Button to='/register' label="Register" variant='outlined'/>
            <Button to='/forgot-password' label="Forgot Password" variant='outlined'/>
        </Box>
    );
};
