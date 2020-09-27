import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { Controller } from '../Controller/Controller';

const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
    heading: {
        fontSize: 15,
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: 15,
        color: "#6d6d6d",
    },
});

function createData(name, totalPoints) {
    let t = {
        name,
        totalPoints,
        history: [
            { date: '2020-01-05', customerId: '11091700', amount: 3 },
            { date: '2020-01-02', customerId: 'Anonymous', amount: 1 },
        ],
    };
    console.log(t)
    return t; 
}

function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const [expanded, setExpanded] = React.useState(false);
    const [devalSummary, setDevalSummary] = React.useState([]);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    const handleRowClick = (event) => {
        setOpen(!open);
        console.log(event);
    }
    const classes = useRowStyles();

    return (
        <React.Fragment>
            <TableRow className={classes.root}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={()=>{handleRowClick(row.name)}}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.name}
                </TableCell>
                <TableCell align="right">{row.totalPoints}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography className={classes.heading}>Andre russel</Typography>
                                <Typography className={classes.secondaryHeading}>1234</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Box margin={1}>
                                    <Table size="small" aria-label="purchases">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Date</TableCell>
                                                <TableCell>Customer</TableCell>
                                                <TableCell align="right">Amount</TableCell>
                                                <TableCell align="right">Total price ($)</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {row.players.map((player) => (
                                                <TableRow key={player.name}>
                                                    <TableCell component="th" scope="row">
                                                        {player.name}
                                                    </TableCell>
                                                    <TableCell>{player.name}</TableCell>
                                                    <TableCell align="right">{player.name}</TableCell>
                                                    <TableCell align="right">
                                                        
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </Box>

                            </AccordionDetails>
                        </Accordion>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}


// const rows = [
//     createData('Abhishek', 159),
//     // createData('Arnav', 237),
//     // createData('Deval', 262),
//     // createData('Dhawan', 305),
//     // createData('Chintan', 356),
//     // createData('Mohil', 356),
//     // createData('Rishab', 356),
// ];

export default function PointsTable() {
    const [rows, setRows] = React.useState([]);
    const [controller, setController] = React.useState();
    // let controller;
    useEffect(()=>{
        setController(new Controller());
        console.log("once");
    }, [])
    setTimeout(function () {
        // setRows(controller.getAllData());
        if(controller){
            setRows(controller.getAllData());
        }
    }, 3000)

    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>Player</TableCell>
                        <TableCell align="right">Points</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <Row key={row.name} row={row} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
