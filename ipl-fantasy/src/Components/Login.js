import React from 'react';
import {
    Grid, Paper, Button, TextField, Typography
} from '@material-ui/core';
import './Components.css';
const auth = {
    "abhishek": "chalechikoo",
    "chintan": "bachibantai",
    "arnav": "bunmaska",
    "dhawan": "icepaan",
    "deval": "admin",
    "rishab": "prismacademy1989",
    "mohil": "rohitrocks",
    "nachiket": "whistlepodu",
}

const iplLogo = require('../Assets/IPL.jpeg');
const vbhra = require('../Assets/vbhra.jpg');
const Login = props => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [authError, setAuthError] = React.useState(false);

    React.useEffect(() => {
        // props.history.push('/home', "deval");
    });

    const login = () => {
        
        if(password === auth[username]){
            
            props.history.push('/home', username);
        }
        else{
            setAuthError(true);
            setUsername('');
            setPassword('');
        }
    }

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }
    return (
        <div>
            <Paper style={{ padding: 6 }} className="horizontalCenter">
                <Grid container spacing={3} direction="row" justify="center" alignItems="center">
                    <Grid item xs={12} >
                        <img src={vbhra} width="125" height="100" alt="ipl logo" />
                        <img src={iplLogo} width="200" height="100" alt="ipl logo" />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label="Name" value={username} onChange={handleUsernameChange} variant="outlined" size="small" style={{ margin: 6 }} />
                        <TextField label="Password" value={password} onChange={handlePasswordChange} variant="outlined" size="small" type="password" style={{ margin: 6 }} />
                        <Button onClick={login} variant="outlined" color="primary" style={{ margin: 6, marginTop: 9 }}>
                            Login
                        </Button>
                    </Grid>
                    {authError && <Grid item xs={12}>
                        <Typography style={{ color: "#FF0000" }}>Invalid Id/Password. Try again</Typography>
                    </Grid>}
                </Grid>
            </Paper>
        </div>
    );
}

export default Login;