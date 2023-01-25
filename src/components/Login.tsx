import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { LoadingButton } from '@mui/lab';
import { Link } from "react-router-dom";
import { useAppDispatch } from '../redux/hooks';
import { setUser } from '../redux/authSlice'
import { AuthService } from '../services/AuthService';
import { useState } from 'react';
import { toast } from 'react-toastify';
import Toast from './Toast'

type LoginCredentials = {
    email: string;
    password: string;
}

const Login = () => {
    const dispatch = useAppDispatch();
    const authService = new AuthService();

    const [loading, setLoading] = useState(false);
    const [loginForm, setLoginForm] = useState({ email: '', password: '' });

    const handleLogin = async (credentials: LoginCredentials) => {
        console.log(credentials);

        setLoading(true);
        try {
            const user = await authService.login(credentials)
            dispatch(setUser(user))
            toast.success('Login successful');
            setLoading(false);
        } catch (error) {
            console.log(error);
            toast.error('Login failed');
            setLoading(false);
        }

    }

    const handleInputChange = (key: string, value: string) => {
        console.log(key, value);
        setLoginForm({ ...loginForm, [key]: value });
    }

    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Box sx={{ marginTop: '1em', width: '15em' }}>
                <TextField onChange={(e) => handleInputChange(e.target.name, e.target.value)} fullWidth id="email" name='email' label="e-mail" variant="outlined" size="small" />
            </Box>

            <Box sx={{ marginTop: '1em', width: '15em' }}>
                <TextField onChange={(e) => handleInputChange(e.target.name, e.target.value)} fullWidth id="email" name="password" label="password" variant="outlined" type="password" size="small" />
            </Box>

            <Box sx={{ marginTop: '1em', width: '15em' }}>
                <LoadingButton onClick={() => handleLogin(loginForm)} fullWidth variant="contained" loading={loading} loadingPosition="start">
                    Login
                </LoadingButton>
            </Box>

            <Link style={{ textDecoration: 'none' }} to="/register">
                <Box sx={{ marginTop: '1em', width: '15em' }}>
                    <LoadingButton fullWidth variant="outlined" loading={false} loadingPosition="start">
                        Register
                    </LoadingButton>
                </Box>
            </Link>

            <Link style={{ textDecoration: 'none' }} to="/forgot-password">
                <Box sx={{ marginTop: '1em', width: '15em' }}>
                    <LoadingButton fullWidth variant="outlined" loading={false} loadingPosition="start">
                        Forgot Password
                    </LoadingButton>
                </Box>
            </Link>
            <Toast/>
        </Box>
    );
};

export default Login;