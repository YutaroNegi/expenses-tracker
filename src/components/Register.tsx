import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { LoadingButton } from '@mui/lab';
import { Link } from "react-router-dom";

const Register = () => {
    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Box sx={{ marginTop: '1em', width: '15em' }}>
                <TextField fullWidth id="firstName" label="First name" variant="outlined" size="small" />
            </Box>
            <Box sx={{ marginTop: '1em', width: '15em' }}>
                <TextField fullWidth id="lastName" label="Last name" variant="outlined" size="small" />
            </Box>
            <Box sx={{ marginTop: '1em', width: '15em' }}>
                <TextField fullWidth id="email" label="e-mail" variant="outlined" size="small" />
            </Box>

            <Box sx={{ marginTop: '1em', width: '15em' }}>
                <TextField fullWidth id="password" label="Password" variant="outlined" type="password" size="small" />
            </Box>

            <Box sx={{ marginTop: '1em', width: '15em' }}>
                <TextField fullWidth id="confirmPassword" label="Confirm password" variant="outlined" type="password" size="small" />
            </Box>

            <Box sx={{ marginTop: '1em', width: '15em' }}>
                <LoadingButton fullWidth variant="contained" loading={false} loadingPosition="start">
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

        </Box>
    );
};

export default Register;