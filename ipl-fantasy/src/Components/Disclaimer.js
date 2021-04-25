import React from 'react';
import {
    Typography
} from '@material-ui/core';
import './Components.css';
const Disclaimer = props => {
    const disclaimer = props.disclaimer
    return (
        <div>
            <Typography variant="caption">* {disclaimer}</Typography>
        </div>
    );
}

export default Disclaimer;