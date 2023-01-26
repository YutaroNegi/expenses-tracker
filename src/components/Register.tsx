import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { LoadingButton } from '@mui/lab';
import { Link } from "react-router-dom";
import { useAppDispatch } from '../redux/hooks';
import { AuthService } from '../services/AuthService';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { setUser } from '../redux/authSlice'
import Toast from './Toast';

type RegisterCredentials = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}


const Register = () => {
    const dispatch = useAppDispatch();
    const authService = new AuthService();

    const [registerForm, serRegisterForm] = useState({ firstName: '', lastName: '',email: '', password: '', confirmPassword: ''});
    const [loading, setLoading] = useState(false);

    const handleRegister = async (credentials: RegisterCredentials) => {
        console.log(credentials);

        setLoading(true);
        try {
            if(credentials.password !== credentials.confirmPassword){
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
            <Box sx={{ marginTop: '1em', width: '15em' }}>
                <TextField onChange={(e)=>handleInputChange(e.target.name, e.target.value)} name="firstName" fullWidth id="firstName" label="First name" variant="outlined" size="small" />
            </Box>
            <Box sx={{ marginTop: '1em', width: '15em' }}>
                <TextField onChange={(e)=>handleInputChange(e.target.name, e.target.value)} name="lastName" fullWidth id="lastName" label="Last name" variant="outlined" size="small" />
            </Box>
            <Box sx={{ marginTop: '1em', width: '15em' }}>
                <TextField onChange={(e)=>handleInputChange(e.target.name, e.target.value)} name="email" fullWidth id="email" label="e-mail" variant="outlined" size="small" />
            </Box>

            <Box sx={{ marginTop: '1em', width: '15em' }}>
                <TextField onChange={(e)=>handleInputChange(e.target.name, e.target.value)} name="password" fullWidth id="password" label="Password" variant="outlined" type="password" size="small" />
            </Box>

            <Box sx={{ marginTop: '1em', width: '15em' }}>
                <TextField onChange={(e)=>handleInputChange(e.target.name, e.target.value)} name="confirmPassword"  fullWidth id="confirmPassword" label="Confirm password" variant="outlined" type="password" size="small" />
            </Box>

            <Box sx={{ marginTop: '1em', width: '15em' }}>
                <LoadingButton onClick={()=>handleRegister(registerForm)} fullWidth variant="contained" loading={loading} loadingPosition="start">
                    Register
                </LoadingButton>
            </Box>

            <Link style={{ textDecoration: 'none'}} to="/login">
                <Box sx={{ marginTop: '1em', width: '15em' }}>
                    <LoadingButton fullWidth variant="outlined" loading={false} loadingPosition="start">
                        Login
                    </LoadingButton>
                </Box>
            </Link>

            <Link style={{ textDecoration: 'none'}} to="/forgot-password">
                <Box sx={{ marginTop: '1em', width: '15em' }}>
                    <LoadingButton fullWidth variant="outlined" loading={false} loadingPosition="start">
                        Forgot password
                    </LoadingButton>
                </Box>
            </Link>
            <Toast />
        </Box>
    );
};

export default Register;