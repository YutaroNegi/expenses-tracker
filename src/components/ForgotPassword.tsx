import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { LoadingButton } from '@mui/lab';
import { Link } from "react-router-dom";

const ForgotPassword = () => {
    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center"}}>
            <Box sx={{ marginTop: '1em', width: '15em' }}>
                <TextField fullWidth id="email" label="e-mail" variant="outlined" size="small"/>
            </Box>

            <Box sx={{ marginTop: '1em', width: '15em'}}>
                <LoadingButton fullWidth variant="contained" loading={false} loadingPosition="start">
                    Send password reset link
                </LoadingButton>
            </Box>

            <Link style={{ textDecoration: 'none'}} to="/login">
                <Box sx={{ marginTop: '1em', width: '15em' }}>
                    <LoadingButton fullWidth variant="outlined" loading={false} loadingPosition="start">
                        Login
                    </LoadingButton>
                </Box>
            </Link>

            <Link style={{ textDecoration: 'none'}} to="/register">
                <Box sx={{ marginTop: '1em', width: '15em'}}>
                    <LoadingButton fullWidth variant="outlined" loading={false} loadingPosition="start">
                        Register
                    </LoadingButton>
                </Box>
            </Link>
            
        </Box>
    );
};

export default ForgotPassword;