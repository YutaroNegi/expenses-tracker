import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

function getTotal(expenses : any){
    let total = 0
    expenses.forEach((expense:any) => {
        total += expense.amount
    })
    return total
}

function Row(props: any) {
    const { category, expenses } = props;

    const [open, setOpen] = React.useState(false);

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell align='center'>{category}</TableCell>
                <TableCell align="center">{getTotal(expenses)}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                History
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Expense</TableCell>
                                        <TableCell>Amount</TableCell>
                                        <TableCell>Date</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {expenses.map((expense: any) => (
                                        <TableRow key={expense.expenseId}>
                                            <TableCell>{expense.name}</TableCell>
                                            <TableCell>{expense.amount}</TableCell>
                                            <TableCell>{expense.date}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

const rows = [
    {
        category: 'Grocery',
        expenses: [
            {
                expenseId: 1,
                name: 'Carrefour',
                amount: 900,
                date: '2020-01-05',
            },
            {
                expenseId: 2,
                name: 'Extra',
                amount: 500,
                date: '2020-01-05',
            },
        ]
    },
    {
        category: 'Pharmacy',
        expenses: [
            {
                name: 'Pain killers',
                amount: 100,
                date: '2020-01-05',
            },
            {
                name: 'Pain killers',
                amount: 100,
                date: '2020-01-05',
            },
        ]
    },
];

export function ExpenseTable() {
    return (
        <Box sx={{ width: "30em", marginTop: '2em' }}>
            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell align='center'/>
                            <TableCell align='center'>Category</TableCell>
                            <TableCell align='center'>Category Total</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <Row category={row.category} expenses={row.expenses} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}