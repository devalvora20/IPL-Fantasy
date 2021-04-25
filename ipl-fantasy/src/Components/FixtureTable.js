import React from 'react';
import {
    TableContainer, Table, TableHead, TableRow, TableBody, Paper, TableCell, FormControl, InputLabel, Select, MenuItem,
    Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions
} from '@material-ui/core';
import './Components.css';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import {ABHISHEK_TEAM, ARNAV_TEAM, DEVAL_TEAM, DHAWAN_TEAM, MOHIL_TEAM, CHINTAN_TEAM, NACHIKET_TEAM, RISHAB_TEAM, BACKEND_URL} from "../Constants/Constants";

const DISABLE_GW = 3
// const DEADLINES = {
//     1: new Date("2021-04-09"),
//     2: new Date("2021-04-16"),
//     3: new Date("2021-04-23"),
//     4: new Date("2021-04-30"),
//     5: new Date("2021-05-07"),
//     6: new Date("2021-05-14"),
//     7: new Date("2021-05-21"),
// }

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

function createData(gw, date, mi, csk, PK, kkr, dc, rcb, srh, rr) {
    return { gw, date, mi, csk, PK, kkr, dc, rcb, srh, rr };
}

const rows = [
    createData('1', "09 Apr - 15 Apr", "RCB, KKR", "DC", "RR", "SRH, MI", "CSK, RR", "MI, SRH", "KKR, RCB", "PK, DC"),
    createData('2', "16 Apr - 22 Apr", "SRH, DC", "PK, RR, KKR", "CSK, DC, SRH", "RCB, CSK", "PK, MI", "KKR, RR", "MI, PK", "CSK, RCB"),
    createData('3', "23 Apr - 29 Apr", "PK, RR", "RCB, SRH", "MI0, KKR", "RR, PK, DC", "SRH, RCB, KKR", "CSK, DC", "DC, CSK", "KKR, MI"),
    createData('4', "30 Apr - 06 May", "CSK, SRH", "MI, RR", "RCB, DC, RCB", "RCB", "PK", "PK, KKR, PK", "RR, MI", "SRH, CSK"),
    createData('5', "07 May - 13 May", "RR, KKR, PK", "SRH, PK, KKR", "CSK, MI", "DC, MI, CSK", "KKR, RR", "SRH", "CSK, RCB, RR", "MI, DC, SRH"),
    createData('6', "14 May - 20 May", "CSK, RCB", "MI", "KKR, SRH", "PK, RR", "RCB, SRH", "CD, RR, MI", "DC, PK", "RCB, KKR"),
    createData('7', "21 May - 27 May", "DC", "DC, RCB", "RR", "SRH", "CSK, MI", "CSK", "KKR", "PK"),
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
    const username = props.username;
    let history = useHistory();
    if (username === undefined) {
        history.push('/login');
    }
    const [gw1, setGW1] = React.useState("");
    const [gw2, setGW2] = React.useState("");
    const [gw3, setGW3] = React.useState("");
    const [gw4, setGW4] = React.useState("");
    const [gw5, setGW5] = React.useState("");
    const [gw6, setGW6] = React.useState("");
    const [gw7, setGW7] = React.useState("");
    const [dialogueTitle, setDialogueTitle] = React.useState("");
    const [dialogueText, setDialogueText] = React.useState("");
    const [currentSave, setCurrentSave] = React.useState("");
    const [open, setOpen] = React.useState(false);

    const [myPlayers, setMyPlayers] = React.useState([]);

    const getAllVCS = () =>{
        fetch(BACKEND_URL + "/get-all-vice-captains")
            .then(response => response.json())
            .then((data) => {
                for (let vcs of data["viceCaptains"]) {
                    if (vcs["name"] === username) {
                        for (let key in vcs["vc"]) {
                            const settingFunction = getGW("function", key);
                            settingFunction(vcs["vc"][key]);
                        }
                    }
                }
            });

    }
    React.useEffect(() => {
        getAllVCS();        
        if (username === "abhishek") {
            setMyPlayers(ABHISHEK_TEAM);
        }
        else if (username === "arnav") {
            setMyPlayers(ARNAV_TEAM);
        }
        else if (username === "deval") {
            setMyPlayers(DEVAL_TEAM);
        }
        else if (username === "chintan") {
            setMyPlayers(CHINTAN_TEAM);
        }
        else if (username === "dhawan") {
            setMyPlayers(DHAWAN_TEAM);
        }
        else if (username === "rishab") {
            setMyPlayers(RISHAB_TEAM);
        }
        else if (username === "mohil") {
            setMyPlayers(MOHIL_TEAM);
        }
        else if (username === "nachiket") {
            setMyPlayers(NACHIKET_TEAM);
        }
    }, [username]);



    const classes = useStyles();

    const handleClickOpen = (gw) => {
        setCurrentSave(gw);
        let title1 = "Really?? " + getGW("value", gw) + " as your captain? He is gonna suck!"
        let text1 = "Your wish though, Confirm " + getGW("value", gw) + " as your captain for week" + gw;
        setDialogueTitle(title1);
        setDialogueText(text1);
        setOpen(true);
    };

    const handleClose = (event) => {
        setOpen(false);
    };

    const handleConfirm = () => {
        let player1 = getGW("value", currentSave)
        var details = {
            owner: username,
            gw: currentSave,
            player: player1
        };
        var formBody = [];
        for (var property in details) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        fetch(BACKEND_URL + "/set-vice-captain", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formBody
        })
        getAllVCS();
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
            default:
                return type === "value" ? gw7 : setGW7;
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
                            <StyledTableCell align="center">PK</StyledTableCell>
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
                                <StyledTableCell align="center" style={{ width: 48 }}><span>{row.mi}</span></StyledTableCell>
                                <StyledTableCell align="center" style={{ width: 48 }}><span>{row.csk}</span></StyledTableCell>
                                <StyledTableCell align="center" style={{ width: 48 }}><span>{row.PK}</span></StyledTableCell>
                                <StyledTableCell align="center" style={{ width: 48 }}><span>{row.kkr}</span></StyledTableCell>
                                <StyledTableCell align="center" style={{ width: 48 }}><span>{row.dc}</span></StyledTableCell>
                                <StyledTableCell align="center" style={{ width: 48 }}><span>{row.rcb}</span></StyledTableCell>
                                <StyledTableCell align="center" style={{ width: 48 }}><span>{row.srh}</span></StyledTableCell>
                                <StyledTableCell align="center" style={{ width: 48 }}><span>{row.rr}</span></StyledTableCell>
                                <StyledTableCell align="center" style={{ minWidth: 200 }}>
                                    <FormControl variant="outlined" className={classes.formControl}>
                                        <InputLabel >Select a vice captain</InputLabel>
                                        <Select disabled={row.gw<=DISABLE_GW} value={getGW("value", row.gw)} name={row.gw} onChange={handleVCChange} label="Select a vice captain" >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            {myPlayers.map(player => {
                                                return <MenuItem key={player} value={player}>{player}</MenuItem>;
                                            })}
                                        </Select>
                                    </FormControl>
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    {/* <Button disabled={getGW("value", row.gw) === '' || new Date() > DEADLINES[row.gw]} variant="outlined" color="primary" onClick={() => { handleClickOpen(row.gw) }}> */}
                                    <Button disabled={row.gw<=DISABLE_GW} variant="outlined" color="primary" onClick={() => { handleClickOpen(row.gw) }}>
                                        SAVE
                                    </Button>
                                    <Dialog open={open} onClose={handleClose} >
                                        <DialogTitle>{dialogueTitle}</DialogTitle>
                                        <DialogContent>
                                            <DialogContentText id="alert-dialog-description">
                                                {dialogueText}
                                                {/* Confirm {getGW("value", row.gw)} as your vice captain for week {row.gw} */}
                                            </DialogContentText>
                                        </DialogContent>
                                        <DialogActions>
                                            <Button onClick={handleClose} color="primary">
                                                Cancel
                                            </Button>
                                            <Button onClick={() => { handleConfirm() }} color="primary" autoFocus>
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