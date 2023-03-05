import React from 'react';
import Box from '@mui/material/Box';
import { LoadingButton, LoadingButtonProps } from '@mui/lab';
import { Link } from "react-router-dom";
import { FC } from 'react';

type ButtonProps = {
    marginTop?: string;
    width?: string;
    to?: string;
    label: string

} & LoadingButtonProps

export const Button: FC<ButtonProps> = ({
    marginTop = '1.5em',
    width = '15em',
    to = '',
    label,
    loading = false,
    variant = 'contained',
    ...props
}) => {
    return (
        <Link style={{ textDecoration: 'none' }} to={to}>
            <Box sx={{ marginTop: marginTop, width: width }}>
                <LoadingButton 
                fullWidth 
                loadingPosition="start" 
                loading={loading} 
                variant={variant} 
                {...props}>
                    {label}
                </LoadingButton>
            </Box>
        </Link>
    )
}