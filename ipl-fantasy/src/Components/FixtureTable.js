import React from 'react';
import {
    TableContainer, Table, TableHead, TableRow, TableBody, Paper, TableCell, FormControl, InputLabel, Select, MenuItem,
    Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions
} from '@material-ui/core';
import './Components.css';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
const BACKEND_URL = "https://agile-brushlands-63159.herokuapp.com";
const ABHISHEK_TEAM = ["Suryakumar Yadav", "Gayle", "Ben Stokes", "Glenn Maxwell", "Jasprit Bumrah", "Umesh Yadav", "Sandeep Sharma"];
const ARNAV_TEAM = ["Eoin Morgan", "Pant", "Andre Russell", "Vijay Shankar", "Yuzvendra Chahal", "Khalil Ahmed", "Jaydev Unadkat"];
const DEVAL_TEAM = ["Shreyas Iyer", "Jonny Bairstow", "Hardik Pandya", "Shreyas Gopal", "Sunil Narine", "D Chahar", "Imran Tahir"];
const DHAWAN_TEAM = ["Dhawan", "Ambati Rayudu", "Bravo", "Jofra Archer", "Kagiso Rabada", "Kuldeep Yadav", "Dale Steyn", "Sam Curran"];
const CHINTAN_TEAM = ["Steven Smith", "Prithvi Shaw", "Pollard", "Krunal Pandya", "Mujeeb", "Shami", "Pat Cummins"];
const MOHIL_TEAM = ["de Kock", "Manish Pandey", "Ravindra Jadeja", "Kedar Jadhav", "Bhuvneshwar", "Navdeep Saini", "Ishant Sharma","Boult", "Anrich Nortje"];
const RISHAB_TEAM = ["David Warner", "Samson", "MS Dhoni", "Shane Watson", "Moeen Ali", "Rahul Chahar", "Prasidh"];

const DEADLINES = {
    1: new Date("2020-09-19"),
    2: new Date("2020-09-25"),
    3: new Date("2020-10-3"),
    4: new Date("2020-10-10"),
    5: new Date("2020-10-17"),
    6: new Date("2020-10-24"),
    7: new Date("2020-10-31"),
}

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
    createData('1', "19 Sept - 25 Sept", "CSK, KKR", "MI, RR, DC", "DC, RCB", "MI", "KXIP, CSK", "SRH, KXIP", "RCB", "CSK"),
    createData('2', "26 Sept - 2 Oct", "RCB, KXIP", "SRH", "RR, MI", "SRH, RR", "SRH", "MI", "KKR, DC, CSK", "KXIP, KKR"),
    createData('3', "3 Oct - 9 Oct", "SRH, RR", "KXIP, KKR", "CSK, SRH", "DC, CSK", "KKR, RCB, RR", "RR, DC", "MI, KXIP", "RCB, MI, DC"),
    createData('4', "10 Oct - 16 Oct", "DC, KKR", "RCB, SRH", "KKR, RCB", "KXIP, RCB, MI", "MI, RR", "CSK, KKR, KXIP", "RR, CSK", "SRH, DC"),
    createData('5', "17 Oct - 23 Oct", "KXIP, CSK", "DC, RR, MI", "MI, DC", "SRH, RCB", "CSK, KXIP", "RR, KKR", "KKR, RR", "RCB, CSK, SRH"),
    createData('6', "24 Oct - 30 Oct", "RR, RCB", "RCB, KKR", "SRH, KKR, RR", "DC, KXIP, CSK", "KKR, SRH", "CSK, MI", "KXIP, DC", "MI, KXIP"),
    createData('7', "31 Oct - 3 nov", "DC, SRH", "KXIP", "CSK", "RR", "MI, RCB", "SRH, DC", "RCB, MI", "KKR"),
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

    React.useEffect(() => {
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
                                <StyledTableCell align="center" style={{ width: 48 }}><span>{row.mi}</span></StyledTableCell>
                                <StyledTableCell align="center" style={{ width: 48 }}><span>{row.csk}</span></StyledTableCell>
                                <StyledTableCell align="center" style={{ width: 48 }}><span>{row.kxip}</span></StyledTableCell>
                                <StyledTableCell align="center" style={{ width: 48 }}><span>{row.kkr}</span></StyledTableCell>
                                <StyledTableCell align="center" style={{ width: 48 }}><span>{row.dc}</span></StyledTableCell>
                                <StyledTableCell align="center" style={{ width: 48 }}><span>{row.rcb}</span></StyledTableCell>
                                <StyledTableCell align="center" style={{ width: 48 }}><span>{row.srh}</span></StyledTableCell>
                                <StyledTableCell align="center" style={{ width: 48 }}><span>{row.rr}</span></StyledTableCell>
                                <StyledTableCell align="center" style={{ minWidth: 200 }}>
                                    <FormControl variant="outlined" className={classes.formControl}>
                                        <InputLabel >Select a vice captain</InputLabel>
                                        <Select disabled={row.gw<=5} value={getGW("value", row.gw)} name={row.gw} onChange={handleVCChange} label="Select a vice captain" >
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
                                    <Button disabled={getGW("value", row.gw) === '' || new Date() > DEADLINES[row.gw]} variant="outlined" color="primary" onClick={() => { handleClickOpen(row.gw) }}>
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