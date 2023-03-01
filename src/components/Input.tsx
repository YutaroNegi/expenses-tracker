import React from 'react';
import TextField, {TextFieldProps} from "@mui/material/TextField";
import Box from "@mui/material/Box";
import {FC} from "react";

type InputProps = TextFieldProps & {
    marginTop?: string;
    width?: string;
    label: string;
    name: string
}

export const Input: FC<InputProps> = ({marginTop = '1.5em', width= '15em', variant = 'outlined', ...props }) => {
    return (
        <Box sx={{ marginTop: marginTop, width: width }}>
            <TextField
                variant={variant}
                fullWidth
                size="small"
                {...props}
            />
        </Box>
    )
}
