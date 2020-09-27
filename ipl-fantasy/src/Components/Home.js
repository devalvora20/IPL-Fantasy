import React from 'react';
import {
    Divider, Typography
} from '@material-ui/core';
import './Components.css';
import PointsTable from './PointsTable';
import FixtureTable from './FixtureTable';
const Home = props => {

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
                <FixtureTable />
            </div>
        </div>
    );
}

export default Home;