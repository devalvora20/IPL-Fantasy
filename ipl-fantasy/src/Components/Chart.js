import React from 'react';

import './Components.css';
import Highcharts from "highcharts/highstock";
import drilldow from "highcharts/modules/drilldown";
import PieChart from "highcharts-react-official";
drilldow(Highcharts);
const options = {
  chart: {
    type: "pie",
    events: {
      click: function(e) {
        console.log("test");
      },
      dropdown: function(e) {
        console.log("test");
      }
    }
  },
  series: [
    {
      data: [
        {
          drilldown: "DataA",
          y: 100
        },
        {
          drilldown: "DataB",
          y: 50
        }
      ]
    }
  ],
  drilldown: {
    series: [
      {
        id: "DataA",
        data: [["A", 0.1], ["B", 1.3]]
      },

      {
        id: "DataB",
        data: [["C", 6.2], ["D", 0.29]]
      }
    ]
  }
};

const BACKEND_URL = "https://agile-brushlands-63159.herokuapp.com";
const Home = props => {
    // const [rows, setRows] = useState([]);
    React.useEffect(() => {
        fetch(BACKEND_URL + "/get-all-stats")
            .then(response => response.json())
            .then((data) => {
                // let d = getAllData(data.stats);
                // setRows(d);
                console.log(data.stats);
            });
    }, []);
    
    return (
        <div>
            <PieChart highcharts={Highcharts} options={options} />
        </div>
    );
}

export default Home;