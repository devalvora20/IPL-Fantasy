import React from 'react';
import {
    Divider, Typography
} from '@material-ui/core';
import './Components.css';
import PointsTable from './PointsTable';
import FixtureTable from './FixtureTable';
import Disclaimer from './Disclaimer';
const Home = props => {
    const username = props.location.state;
    const disclaimer = "All the points in the table are final: Including Captian(2x)/Vice Captain (1.5x)";
    return (
        <div>
            <div className="divPadding" style={{paddingBottom:5}}>
                <Disclaimer disclaimer={disclaimer} />
            </div>
            <div className="divPadding">
                <PointsTable />
            </div>
            <Divider style={{ height: 3, color: "black" }} />
            <div className="divPadding">
                <div>
                    <Typography>FIXTURES:</Typography>
                </div>
                <FixtureTable username={username}/>
            </div>
        </div>
    );
}

export default Home;