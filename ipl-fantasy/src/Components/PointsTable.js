import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Grid, Table, Button, TableBody, TableCell, TableContainer, TableHead, TableRow, Divider,
    Accordion, AccordionSummary, Typography, AccordionDetails, Chip, Paper, Tooltip, Avatar, Backdrop, CircularProgress
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import '../Components/Components.css';
import Highcharts from "highcharts/highstock";
import drilldow from "highcharts/modules/drilldown";
import PieChart from "highcharts-react-official";
import LineChart from "highcharts-react-official";
import {ABHISHEK_TEAM, ARNAV_TEAM, DEVAL_TEAM, DHAWAN_TEAM, MOHIL_TEAM, CHINTAN_TEAM, NACHIKET_TEAM, RISHAB_TEAM, BACKEND_URL, OWNERS, PLAYERS_TO_TEAM_DICT} from "../Constants/Constants";
import Disclaimer from './Disclaimer';
const GWS = [1, 2, 3, 4, 5, 6, 7];

drilldow(Highcharts);
const kkr_icon = require('../Assets/kkr_icon.jpg');
const csk_icon = require('../Assets/csk_icon.jpg');
const dc_icon = require('../Assets/dc_icon.png');
const mi_icon = require('../Assets/mi_icon.jpg');
const rr_icon = require('../Assets/rr_icon.png');
const rcb_icon = require('../Assets/rcb_icon.png');
const srh_icon = require('../Assets/srh_icon.png');
const pk_icon = require('../Assets/pk_icon.png');
const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    button: {
        minWidth: 108
    }
});
let chartOptionsTemplate = {
    chart: {
        type: 'pie'
    },
    title: {
        text: 'Total Batting Points'
    },
    subtitle: {
        text: 'Click the slices to view individual player points.'
    },
    colors: ["#ff0000", "#ff7300", "#ffaf00", "#ffec00", "#d5f30b", "#52d726", "#007ed6", "#5fb7d4"],
    accessibility: {
        announceNewData: {
            enabled: true
        },
        point: {
            valueSuffix: ' points'
        }
    },

    plotOptions: {
        series: {
            dataLabels: {
                enabled: true,
                format: '{point.name}: {point.y} points'
            }
        }
    },
    series: [
        {
            name: "Owners",
            colorByPoint: true,
            data: [

            ]
        }
    ],
    drilldown: {
        series: [

        ]
    }
}


// const DEADLINES = {
//     1: new Date("2020-04-09"),
//     2: new Date("2020-04-16"),
//     3: new Date("2020-04-23"),
//     4: new Date("2020-04-30"),
//     5: new Date("2020-05-07"),
//     6: new Date("2020-05-14"),
//     7: new Date("2020-05-21"),
// }

const getCurrentGW = () => {
    // console.log((new Date() <= new Date("2020-09-25")));
    if (new Date("2021-04-09") <= new Date() && new Date() <= new Date("2021-04-15"))
        return 1
    else if (new Date("2021-04-16") <= new Date() && new Date() <= new Date("2021-04-22"))
        return 2
    else if (new Date("2021-04-23") <= new Date() && new Date() <= new Date("2021-04-29"))
        return 3
    else if (new Date("2021-04-30") <= new Date() && new Date() <= new Date("2021-05-06"))
        return 4
    else if (new Date("2021-05-07") <= new Date() && new Date() <= new Date("2021-05-13"))
        return 5
    else if (new Date("2021-05-14") <= new Date() && new Date() <= new Date("2021-05-20"))
        return 6
    else
        return 7
}

const getIndividualData = (name, team, playerStats) => {

    let owner1 = { "name": name };
    let totalPoints = 0
    let totalBattingPoints = 0
    let totalBowlingPoints = 0
    let totalFieldingPoints = 0
    let players = []
    let battingData1 = []
    let bowlingData1 = []
    let fieldingData1 = []
    for (let player of team) {
        console.log(player)
        totalPoints += playerStats[player].totalPoints;
        totalBattingPoints += playerStats[player].totalBattingPoints;
        totalBowlingPoints += playerStats[player].totalBowlingPoints;
        totalFieldingPoints += playerStats[player].totalFieldingPoints;
        players.push({ "name": player, "stats": playerStats[player].stats, "totalBattingPoints": playerStats[player].totalBattingPoints, "totalBowlingPoints": playerStats[player].totalBowlingPoints, "totalFieldingPoints": playerStats[player].totalFieldingPoints })
        battingData1.push([player, playerStats[player].totalBattingPoints])
        bowlingData1.push([player, playerStats[player].totalBowlingPoints])
        fieldingData1.push([player, playerStats[player].totalFieldingPoints])
    }
    owner1["players"] = players
    owner1["totalPoints"] = totalPoints
    owner1["totalBattingPoints"] = totalBattingPoints
    owner1["totalBowlingPoints"] = totalBowlingPoints
    owner1["totalFieldingPoints"] = totalFieldingPoints
    return {
        "owner": owner1,
        "battingOptions1": { "name": name, drilldown: name, y: totalBattingPoints },
        "battingOptions2": { "name": name, id: name, data: battingData1 },
        "bowlingOptions1": { "name": name, drilldown: name, y: totalBowlingPoints },
        "bowlingOptions2": { "name": name, id: name, data: bowlingData1 },
        "fieldingOptions1": { "name": name, drilldown: name, y: totalFieldingPoints },
        "fieldingOptions2": { "name": name, id: name, data: fieldingData1 }
    }
}


const PointsTable = () => {

    const [battingOptions, setBattingOptions] = useState({});
    const [bowlingOptions, setBowlingOptions] = useState({});
    const [fieldingOptions, setFieldingOptions] = useState({});
    const [rows, setRows] = useState([]);
    const [showStats, setShowStats] = useState(false);
    const [detailedTeam, setDetailedTeam] = useState([]);
    const [currentWeekVC, setCurrentWeekVC] = useState([]);
    const [lineChartViceCaptainData, setLineChartViceCaptainData] = useState([]);
    const [vcData, setVcData] = useState([]);
    const [backdropOpen, setBackdropOpen] = useState(false);
    let lineChartOptionsTemplate = {
        chart:{
            height:450
        },
        title: {
            text: 'Vice Captain Points'
        },
        yAxis: {
            title: {
                text: 'Points'
            }
        },

        xAxis: {
            title: {
                text: 'Match Number'
            },
            accessibility: {
                rangeDescription: 'Range: 1 to 14'
            }
        },

        legend: {
            layout: 'horizontal',
            align: 'bottom',
            verticalAlign: 'bottom',
            horizontalAlign: 'middle',
            y:25
        },

        plotOptions: {
            series: {
                label: {
                    connectorAllowed: false
                },
                pointStart: 1
            }
        },
        series: lineChartViceCaptainData,
    }
    const getTeam = (name) => {
        let players = [];
        if (name === "Abhishek") {
            for (let player1 of ABHISHEK_TEAM) {
                players.push(<Chip className={currentWeekVC.indexOf(player1) > -1 ? "viceCaptainChip" : ""} key={player1} style={{ marginRight: 8 }} variant="outlined" label={player1} avatar={<Avatar alt="Natacha" src={getImage("icon", player1)} />} />)
            }
        }
        else if (name === "Arnav") {
            for (let player1 of ARNAV_TEAM) {
                players.push(<Chip className={currentWeekVC.indexOf(player1) > -1 ? "viceCaptainChip" : ""} key={player1} style={{ marginRight: 8 }} variant="outlined" label={player1} avatar={<Avatar alt="Natacha" src={getImage("icon", player1)} />} />)
            }
        }
        else if (name === "Deval") {
            for (let player1 of DEVAL_TEAM) {
                players.push(<Chip className={currentWeekVC.indexOf(player1) > -1 ? "viceCaptainChip" : ""} key={player1} style={{ marginRight: 8 }} variant="outlined" label={player1} avatar={<Avatar alt="Natacha" src={getImage("icon", player1)} />} />)
            }
        }
        else if (name === "Chintan") {
            for (let player1 of CHINTAN_TEAM) {
                players.push(<Chip className={currentWeekVC.indexOf(player1) > -1 ? "viceCaptainChip" : ""} key={player1} style={{ marginRight: 8 }} variant="outlined" label={player1} avatar={<Avatar alt="Natacha" src={getImage("icon", player1)} />} />)
            }
        }
        else if (name === "Dhawan") {
            for (let player1 of DHAWAN_TEAM) {
                players.push(<Chip className={currentWeekVC.indexOf(player1) > -1 ? "viceCaptainChip" : ""} key={player1} style={{ marginRight: 8 }} variant="outlined" label={player1} avatar={<Avatar alt="Natacha" src={getImage("icon", player1)} />} />)
            }
        }
        else if (name === "Rishab") {
            for (let player1 of RISHAB_TEAM) {
                players.push(<Chip className={currentWeekVC.indexOf(player1) > -1 ? "viceCaptainChip" : ""} key={player1} style={{ marginRight: 8 }} variant="outlined" label={player1} avatar={<Avatar alt="Natacha" src={getImage("icon", player1)} />} />)
            }
        }
        else if (name === "Mohil") {
            for (let player1 of MOHIL_TEAM) {
                players.push(<Chip className={currentWeekVC.indexOf(player1) > -1 ? "viceCaptainChip" : ""} key={player1} style={{ marginRight: 8 }} variant="outlined" label={player1} avatar={<Avatar alt="Natacha" src={getImage("icon", player1)} />} />)
            }
        }
        else if (name === "Nachiket") {
            for (let player1 of NACHIKET_TEAM) {
                players.push(<Chip className={currentWeekVC.indexOf(player1) > -1 ? "viceCaptainChip" : ""} key={player1} style={{ marginRight: 8 }} variant="outlined" label={player1} avatar={<Avatar alt="Natacha" src={getImage("icon", player1)} />} />)
            }
        }
        return players;
    }

    const getAllData = (playerStats) => {
        let batting_options1 = [];
        let batting_drilldown_series1 = [];
        let bowling_options1 = [];
        let bowling_drilldown_series1 = [];
        let fielding_options1 = [];
        let fielding_drilldown_series1 = [];
        let response = [];

        for (const [key, value] of Object.entries(OWNERS)) {
            let individualData = getIndividualData(key, value, playerStats);
            batting_options1.push(individualData["battingOptions1"])
            batting_drilldown_series1.push(individualData["battingOptions2"]);
            bowling_options1.push(individualData["bowlingOptions1"])
            bowling_drilldown_series1.push(individualData["bowlingOptions2"]);
            fielding_options1.push(individualData["fieldingOptions1"])
            fielding_drilldown_series1.push(individualData["fieldingOptions2"]);
            response.push(individualData["owner"]);
        }

        chartOptionsTemplate.title.text = "Total Batting Points";
        chartOptionsTemplate.series[0].data = batting_options1;
        chartOptionsTemplate.drilldown.series = batting_drilldown_series1;
        setBattingOptions(chartOptionsTemplate);

        chartOptionsTemplate.title.text = "Total Bowling Points";
        chartOptionsTemplate.series[0].data = bowling_options1;
        chartOptionsTemplate.drilldown.series = bowling_drilldown_series1;
        setBowlingOptions(chartOptionsTemplate);

        chartOptionsTemplate.title.text = "Total Fielding Points";
        chartOptionsTemplate.series[0].data = fielding_options1;
        chartOptionsTemplate.drilldown.series = fielding_drilldown_series1;
        setFieldingOptions(chartOptionsTemplate);

        return response;
    }

    const classes = useStyles();
    // let controller;
    useEffect(() => {
        setBackdropOpen(true);
        fetch(BACKEND_URL + "/get-all-stats")
            .then(response => response.json())
            .then((data) => {
                let d = getAllData(data.stats);
                setRows(d);
            });

        fetch(BACKEND_URL + "/get-all-vice-captains")
            .then(response => response.json())
            .then((data) => {
                let lineChartSeries = []
                let currWeekVC = [];
                let currWeek = getCurrentGW();
                setVcData(data["viceCaptains"]);
                for (let vcs of data["viceCaptains"]) {
                    lineChartSeries.push({ "name": vcs["name"], "data": vcs["vc_points"] })
                    for (let key in vcs["vc"]) {
                        if (parseInt(key) === parseInt(currWeek)) {
                            currWeekVC.push(vcs["vc"][parseInt(key)]);
                        }
                    }
                }
                setLineChartViceCaptainData(lineChartSeries);
                setCurrentWeekVC(currWeekVC);
                setBackdropOpen(false);
            });
    }, []);

    const showDetailedStats = (playerStats) => {
        setShowStats(true);
        setDetailedTeam(playerStats);
    }

    const getImage = (type, player) => {
        let team;
        if (PLAYERS_TO_TEAM_DICT[player] === "kkr") {
            team = type === "image" ? "linear-gradient(135deg, #2E0854, #B3A123)" : kkr_icon;
        }
        else if (PLAYERS_TO_TEAM_DICT[player] === "csk") {
            team = type === "image" ? "linear-gradient(135deg, #FFFF3C, #0081E9)" : csk_icon;
        }
        else if (PLAYERS_TO_TEAM_DICT[player] === "rr") {
            team = type === "image" ? "linear-gradient(135deg, #254AA5, #CBA92B)" : rr_icon;
        }
        else if (PLAYERS_TO_TEAM_DICT[player] === "mi") {
            team = type === "image" ? "linear-gradient(135deg, #004BA0, #D1AB3E)" : mi_icon;
        }
        else if (PLAYERS_TO_TEAM_DICT[player] === "dc") {
            team = type === "image" ? "linear-gradient(135deg, #EF1B23, #00008B)" : dc_icon;
        }
        else if (PLAYERS_TO_TEAM_DICT[player] === "rcb") {
            team = type === "image" ? "linear-gradient(135deg,#EC1C24, #2B2A29, #D1AB3E)" : rcb_icon;
        }
        else if (PLAYERS_TO_TEAM_DICT[player] === "pk") {
            team = type === "image" ? "linear-gradient(135deg, #ED1B24, #DCDDDF)" : pk_icon;
        }
        else if (PLAYERS_TO_TEAM_DICT[player] === "srh") {
            team = type === "image" ? "linear-gradient(135deg, #FF822A, #000000)" : srh_icon;
        }
        return team;
    }

    return (
        <div>
            <Backdrop style={{zIndex:20000}} open={backdropOpen}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TableContainer component={Paper}>
                        <Table className={classes.table} >
                            <TableHead>
                                <TableRow>
                                    <TableCell>Player</TableCell>
                                    <TableCell>Team</TableCell>
                                    <TableCell>Points</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                    <TableRow key={row.name}>
                                        <TableCell component="th" scope="row">
                                            <Button variant="outlined" color="primary" onClick={() => { showDetailedStats(row) }}>
                                                {row.name}
                                            </Button>
                                        </TableCell>
                                        <TableCell align="left">{getTeam(row.name)}</TableCell>
                                        <TableCell align="left">{row.totalPoints}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                <Divider orientation="horizontal" style={{ height: 3, color: "black" }} />
                <Grid item xs={12}>
                    {showStats &&
                        <Paper style={{ padding: 10 }}>
                            <div>
                                <Typography >{detailedTeam["name"]}'s Team</Typography>
                            </div>
                            {detailedTeam["players"].map((player, i) => {
                                return (
                                    <Accordion className="container" key={i} style={{ color: "#fff", backgroundImage: getImage("image", player["name"]), backgroundRepeat: "no-repeat", backgroundSize: "100% 100%" }}>
                                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                            <Typography className={classes.heading}>{player["name"]}</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <TableContainer component={Paper}>
                                                <Table className={classes.table} aria-label="simple table">
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell>#</TableCell>
                                                            <TableCell>Match</TableCell>
                                                            <TableCell align="center">Runs</TableCell>
                                                            <TableCell align="center">Fours</TableCell>
                                                            <TableCell align="center">Sixs</TableCell>
                                                            <TableCell align="center">SR</TableCell>
                                                            <TableCell align="center">Wicket</TableCell>
                                                            <TableCell align="center">Maiden</TableCell>
                                                            <TableCell align="center">Eco</TableCell>
                                                            <TableCell align="center">Starting 11</TableCell>
                                                            <TableCell align="center">Catch</TableCell>
                                                            <Tooltip title="Runout Thrower" arrow placement="top"><TableCell align="center">Thrower</TableCell></Tooltip>
                                                            <Tooltip title="Runout Catcher" arrow placement="top"><TableCell align="center">Catcher</TableCell></Tooltip>
                                                            <Tooltip title="Runout Direct hit" arrow placement="top"><TableCell align="center">Direct Hit</TableCell></Tooltip>
                                                            <TableCell align="center">Stumping</TableCell>
                                                            <TableCell align="center">Total Points</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody >
                                                        {player["stats"].map((player, i) => (
                                                            <TableRow key={player.match}>
                                                                <TableCell component="th" scope="row">{i + 1}</TableCell>
                                                                <TableCell component="th" scope="row">{player.match}</TableCell>
                                                                <Tooltip title={player.match_stats.total_points_runs ? "Total Points: " + player.match_stats.total_points_runs : "Total Points: 0"} arrow placement="top"><TableCell align="center">{player.match_stats.runs | 0}</TableCell></Tooltip>
                                                                <TableCell align="center">{player.match_stats.fours | 0}</TableCell>
                                                                <TableCell align="center">{player.match_stats.sixs | 0}</TableCell>
                                                                <TableCell align="center">{player.match_stats.sr | 0}</TableCell>
                                                                <TableCell align="center">{player.match_stats.wicket | 0}</TableCell>
                                                                <TableCell align="center">{player.match_stats.maiden | 0}</TableCell>
                                                                <TableCell align="center">{player.match_stats.economy | 0}</TableCell>
                                                                <TableCell align="center">{player.match_stats.total_points_match_played | 0}</TableCell>
                                                                <TableCell align="center">{player.match_stats.catch | 0}</TableCell>
                                                                <TableCell align="center">{player.match_stats.runout_throw | 0}</TableCell>
                                                                <TableCell align="center">{player.match_stats.runout_catch | 0}</TableCell>
                                                                <TableCell align="center">{player.match_stats.runout_direct | 0}</TableCell>
                                                                <TableCell align="center">{player.match_stats.stumping | 0}</TableCell>
                                                                <TableCell align="center">{player.match_stats.total_match_points | 0}</TableCell>
                                                            </TableRow>
                                                        ))}
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                        </AccordionDetails>
                                    </Accordion>
                                )
                            })}
                        </Paper>
                    }
                </Grid>

            </Grid>
            <div>
                <Disclaimer disclaimer="Charts data are WITHOUT any Captain(2x)/Vice Captain(1.5x) points. They are regular player points"/>
            </div>
            <Paper style={{ margin: "15px 0px" }}>

                <Grid container>
                    <Grid item xs={12}>
                        <PieChart highcharts={Highcharts} options={battingOptions} />
                    </Grid>
                    <Grid item xs={12}>
                        <PieChart highcharts={Highcharts} options={bowlingOptions} />
                    </Grid>
                    <Grid item xs={12}>
                        <PieChart highcharts={Highcharts} options={fieldingOptions} />
                    </Grid>
                </Grid>
            </Paper>
            <Paper style={{ margin: "15px 0px", padding: "10px" }}>
            
                <Grid container style={{minHeight:500}}>

                    <Grid item xs={12}>
                        <LineChart highcharts={Highcharts} options={lineChartOptionsTemplate} />
                    </Grid>

                </Grid>
                <Divider orientation="horizontal" style={{ height: 3, color: "black", marginTop: 25, marginBottom: 10 }} />
                <Typography>
                    VICE CAPTAINS:
                </Typography>
                <br />
                {vcData.length > 0 &&
                    <div>
                        <TableContainer component={Paper}>
                            <Table className={classes.table} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>OWNER</TableCell>
                                        <TableCell align="center">Week 1</TableCell>
                                        <TableCell align="center">Week 2</TableCell>
                                        <TableCell align="center">Week 3</TableCell>
                                        <TableCell align="center">Week 4</TableCell>
                                        <TableCell align="center">Week 5</TableCell>
                                        <TableCell align="center">Week 6</TableCell>
                                        <TableCell align="center">Week 7</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {vcData.map((data) => (
                                        <TableRow key={data.name}>
                                            <TableCell component="th" scope="row">
                                                {data.name}
                                            </TableCell>
                                            {GWS.map((key, i) => (


                                                <TableCell key={key} align="center">{key in data.vc ? data.vc[key] : "-"}</TableCell>

                                            ))}
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>

                }
            </Paper>

        </div>
    );
}


export default PointsTable;