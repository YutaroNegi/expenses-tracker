import Box from '@mui/material/Box';
import { Input, Button } from '../components'

export const ForgotPassword = () => {
    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Input name='email' label="e-mail" type="email"/>
            <Button label='Restore password'/>
            <Button variant='outlined' label='Login' to='/login'/>
            <Button variant='outlined' label='Register' to='/register'/>
        </Box>
    );
};