import React from 'react';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { Box } from '@mui/system';
import { FC } from 'react';

type DropdownTypes = {
    options: Option[];
    value: string;
    onSelectedChange: (event: SelectChangeEvent) => void;
    id: string
    label: string;
    marginTop?: string;
    width?: string;
}

type Option = {
    categoryId: number;
    categoryName: string;
}

export const Dropdown: FC<DropdownTypes> = ({ options, value, onSelectedChange, id, label, marginTop = '1.5em', width = '15em' }) => {
    return (
        <Box sx={{ marginTop: marginTop, width: width }}>
            <FormControl fullWidth size="small">
                <InputLabel id={id}>Tag</InputLabel>
                <Select
                    labelId={id}
                    id={id}
                    name={id}
                    value={value}
                    label={label}
                    onChange={onSelectedChange}
                >
                    {options.map((option: Option) => (
                        <MenuItem key={option.categoryId} value={option.categoryId}>
                            {option.categoryName}
                        </MenuItem>
                    ))}

                </Select>
            </FormControl>
        </Box>
    )
}