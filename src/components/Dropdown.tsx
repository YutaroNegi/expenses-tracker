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
    key: string
    label: string;
    marginTop?: string;
    width?: string;
}

type Option = {
    value: string;
    label: string;
}

export const Dropdown: FC<DropdownTypes> = ({ options, value, onSelectedChange, key, label, marginTop = '1.5em', width = '15em' }) => {
    return (
        <Box sx={{ marginTop: marginTop, width: width }}>
            <FormControl fullWidth size="small">
                <InputLabel id={key}>Tag</InputLabel>
                <Select
                    labelId={key}
                    id={key}
                    name={key}
                    value={value}
                    label={label}
                    onChange={onSelectedChange}
                >
                    {options.map((option: Option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}

                </Select>
            </FormControl>
        </Box>
    )
}