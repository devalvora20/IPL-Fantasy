import React from 'react';
import {
    Divider, Typography
} from '@material-ui/core';
import './Components.css';
import PointsTable from './PointsTable';
import FixtureTable from './FixtureTable';
const Home = props => {
    const username = props.location.state;
    return (
        <div>
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