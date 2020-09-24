import React from 'react';
import {
    Grid, Paper, Button, TextField
} from '@material-ui/core';
import './Components.css';
const iplLogo = require('../Assets/IPL.jpeg');
const vbhra = require('../Assets/vbhra.jpg');
const Login = props => {
    return (
        <div>
            <Paper style={{ padding: 6 }} className="horizontalCenter">
                <Grid container spacing={3} direction="row" justify="center" alignItems="center">
                    <Grid item xs={12} direction="row" justify="center" alignItems="center">
                        <img src={vbhra} width="125" height="100" alt="ipl logo"/>
                        <img src={iplLogo} width="200" height="100" alt="ipl logo"/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label="Name" variant="outlined" size="small" style={{margin:6}}/>
                        <TextField label="Password" variant="outlined" size="small" type="password" style={{margin:6}}/>
                        <Button variant="outlined" color="primary" style={{margin:6, marginTop:9}}>
                            Login
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
}

export default Login;