import React from 'react'
import HighchartsReact from 'highcharts-react-official'
import PieChart from "highcharts-react-official";
import * as Highcharts from 'highcharts';

const HighchartsWrapper = (props) => {
   console.log(props.chartData); // this is always correct

    let chartOptions = {
        chart: {
            margin: 0,
            width: 250,
            height: 250,
            backgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false
        },
        title: {
            text: ''
        },
        plotOptions: {
            pie: {
            borderWidth: null,
            cursor: 'pointer',
            dataLabels: {
                enabled: false,
            }
            }
        },
        series: props.chartData
    }

    return(
        <div id="container" style={{width: '250px', height: '250px', margin: '0 auto'}}>
                  <div style={{width: '100%', height: '100%', margin: '0 auto'}} >
                    <PieChart highcharts={Highcharts} options={chartOptions} />
                  </div>
                  <div  style={{margin: '0px 0px', width: '250px', top: '-250px', position: 'relative', zIndex: 3000}}>
                    <img src="clock.svg.png" width="100%" />
                  </div>
              </div>
    );
}

export default HighchartsWrapper;