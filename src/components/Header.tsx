import Box from '@mui/material/Box';

const Header = () => {
    return (
        <Box sx={{ display: 'grid', placeItems: "center", bgcolor: "#2196F3", color: "#F3F6F9"}}>
            <h1>Expenses Tracker</h1>
        </Box>
    );
};

export default Header;