import React from 'react';
import {
    TableContainer, Table, TableHead, TableRow, TableBody, Paper, TableCell, FormControl, InputLabel, Select, MenuItem,
    Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Tooltip
} from '@material-ui/core';
import './Components.css';
import { withStyles, makeStyles } from '@material-ui/core/styles';

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

function createData(gw, date, mi, csk, kxip, kkr, dc, rcb, srh, rr) {
    return { gw, date, mi, csk, kxip, kkr, dc, rcb, srh, rr };
}

const rows = [
    createData('1', "19 sept - 25 sept", "CSK, KKR", "MI, RR, DC", "DC, RCB", "MI", "KXIP, CSK", "SRH, KXIP", "RCB", "CSK"),
    createData('2', "26 sept - 2 oct", "RCB, KXIP", "SRH", "RR, MI", "SRH, RR", "SRH", "MI", "KKR, DC, CSK", "KXIP, KKR"),
    createData('3', "3 oct - 9 oct", "SRH, RR", "KXIP, KKR", "CSK, SRH", "DC, CSK", "KKR, RCB, RR", "RR, DC", "MI, KXIP", "RCB, MI, DC"),
    createData('4', "10 oct - 16 oct", "DC, KKR", "RCB, SRH", "KKR, RCB", "KXIP, RCB, MI", "MI, RR", "CSK, KKR, KXIP", "RR, CSK", "SRH, DC"),
    createData('5', "17 oct - 23 oct", "KXIP, CSK", "DC, RR, MI", "MI, DC", "SRH, RCB", "CSK, KXIP", "RR, KKR", "KKR, RR", "RCB, CSK, SRH"),
    createData('6', "24 oct - 30 oct", "RR, RCB", "RCB, KKR", "SRH, KKR, RR", "DC, KXIP, CSK", "KKR, SRH", "CSK, MI", "KXIP, DC", "MI, KXIP"),
    createData('7', "31 oct - 3 oct", "DC, SRH", "KXIP", "CSK", "RR", "MI, RCB", "SRH, DC", "RCB, MI", "KKR"),
];

const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
    formControl: {
        width: "100%",
    }
});

const FixtureTable = props => {

    const classes = useStyles();
    const [gw1, setGW1] = React.useState("");
    const [gw2, setGW2] = React.useState("");
    const [gw3, setGW3] = React.useState("");
    const [gw4, setGW4] = React.useState("");
    const [gw5, setGW5] = React.useState("");
    const [gw6, setGW6] = React.useState("");
    const [gw7, setGW7] = React.useState("");
    const [gw8, setGW8] = React.useState("");
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (event) => {

        setOpen(false);
    };

    const handleConfirm = (event) => {

        setOpen(false);
    };


    const handleVCChange = (event) => {
        const settingFunction = getGW("function", event.target.name);
        settingFunction(event.target.value);
    }

    const getGW = (type, gw) => {
        switch (gw) {
            case '1':
                return type === "value" ? gw1 : setGW1;
            case '2':
                return type === "value" ? gw2 : setGW2;
            case '3':
                return type === "value" ? gw3 : setGW3;
            case '4':
                return type === "value" ? gw4 : setGW4;
            case '5':
                return type === "value" ? gw5 : setGW5;
            case '6':
                return type === "value" ? gw6 : setGW6;
            case '7':
                return type === "value" ? gw7 : setGW7;
            case '8':
                return type === "value" ? gw8 : setGW8;
            default:
                return type === "value" ? gw8 : setGW8;
        }
    }

    return (
        <div>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center">Week</StyledTableCell>
                            <StyledTableCell align="center">Date</StyledTableCell>
                            <StyledTableCell align="center">MI</StyledTableCell>
                            <StyledTableCell align="center">CSK</StyledTableCell>
                            <StyledTableCell align="center">KXIP</StyledTableCell>
                            <StyledTableCell align="center">KKR</StyledTableCell>
                            <StyledTableCell align="center">DC</StyledTableCell>
                            <StyledTableCell align="center">RCB</StyledTableCell>
                            <StyledTableCell align="center">SRH</StyledTableCell>
                            <StyledTableCell align="center">RR</StyledTableCell>
                            <StyledTableCell align="center" style={{ minWidth: 200 }}>VICE CAPTAIN (VC)</StyledTableCell>
                            <StyledTableCell align="center">OPTIONS</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <StyledTableRow key={row.gw}>
                                <StyledTableCell component="th" align="center" scope="row"> {row.gw} </StyledTableCell>
                                <StyledTableCell component="th" align="center" scope="row"> {row.date} </StyledTableCell>
                                <Tooltip title="YPUR PLAYERS" arrow placement="top"><StyledTableCell align="center" style={{ width: 48 }}><span>{row.mi}</span></StyledTableCell></Tooltip>
                                <Tooltip title="YPUR PLAYERS" arrow placement="top"><StyledTableCell align="center" style={{ width: 48 }}><span>{row.csk}</span></StyledTableCell></Tooltip>
                                <Tooltip title="YPUR PLAYERS" arrow placement="top"><StyledTableCell align="center" style={{ width: 48 }}><span>{row.kxip}</span></StyledTableCell></Tooltip>
                                <Tooltip title="YPUR PLAYERS" arrow placement="top"><StyledTableCell align="center" style={{ width: 48 }}><span>{row.kkr}</span></StyledTableCell></Tooltip>
                                <Tooltip title="YPUR PLAYERS" arrow placement="top"><StyledTableCell align="center" style={{ width: 48 }}><span>{row.dc}</span></StyledTableCell></Tooltip>
                                <Tooltip title="YPUR PLAYERS" arrow placement="top"><StyledTableCell align="center" style={{ width: 48 }}><span>{row.rcb}</span></StyledTableCell></Tooltip>
                                <Tooltip title="YPUR PLAYERS" arrow placement="top"><StyledTableCell align="center" style={{ width: 48 }}><span>{row.srh}</span></StyledTableCell></Tooltip>
                                <Tooltip title="YPUR PLAYERS" arrow placement="top"><StyledTableCell align="center" style={{ width: 48 }}><span>{row.rr}</span></StyledTableCell></Tooltip>
                                <StyledTableCell align="center" style={{ minWidth: 200 }}>
                                    <FormControl variant="outlined" className={classes.formControl}>
                                        <InputLabel >Select a vice captain</InputLabel>
                                        <Select value={getGW("value", row.gw)} name={row.gw} onChange={handleVCChange} label="Select a vice captain" >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            <MenuItem value={"10"}>KL RAHUL</MenuItem>
                                            <MenuItem value={"20"}>ROHIT SHARMA</MenuItem>
                                            <MenuItem value={"30"}>VIRAT KOHLI</MenuItem>
                                        </Select>
                                    </FormControl>
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                                        SAVE
                                    </Button>
                                    <Dialog open={open} onClose={handleClose} >
                                        <DialogTitle>"Reallyy?? " {getGW("value", row.gw)}  "? He is gonna SUCK!"</DialogTitle>
                                        <DialogContent>
                                            <DialogContentText id="alert-dialog-description">
                                                Confirm {getGW("value", row.gw)} as your vice captain for week {row.gw}
                                            </DialogContentText>
                                        </DialogContent>
                                        <DialogActions>
                                            <Button onClick={handleClose} color="primary">
                                                Cancel
                                            </Button>
                                            <Button onClick={handleConfirm} color="primary" autoFocus>
                                                Confirm
                                            </Button>
                                        </DialogActions>
                                    </Dialog>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default FixtureTable;