/*
 *  European Genome-phenome Archive (EGA)
 *
 *  Copyright 2018 EMBL - European Bioinformatics Institute
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 *
 */
import React from 'react'
import ReactHighcharts from 'react-highcharts';

const downloaderSuccessCombinedGraph = (props) => {

    if (props.data.success.length && props.data.failure.length) {
        const chartConfig = getChartConfig(props.data)
        return (
            <div>
                {props.children}
                <ReactHighcharts config={chartConfig}></ReactHighcharts>
            </div>
        )
    } else {
        return ''
    }

}

function getChartConfig (data) {
    const  chartConfig = {
        global: {
            useUTC: false
        },
        chart: {
            zoomType: 'x'
        },
        title: {
            text: 'Success vs Failure Downloads'
        },
        subtitle: {
            text: document.ontouchstart === undefined ?
                'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in'
        },
        xAxis: {
            type: 'datetime',
        },
        yAxis: [{
            min: 0,
            title: {
                text: 'Number of Files',
                useHTML: true
            },
            opposite: true
        },{
            gridLineWidth: 0,
            min: 0,
            title: {
                text: 'Average Download Speed',
                useHTML: true
            }
        }],
        series: [{
            name:'Success',
            data: data.success.sort(),
            pointStart: data.dates[0],
            pointInterval: 24 * 3600 * 1000, // one day
            type: 'column',
        },{
            name:'Failure',
            data: data.failure.sort(),
            pointStart: data.dates[0],
            pointInterval: 24 * 3600 * 1000, // one day
            type: 'column',
        },{
            name:'Average Download Speed',
            data: data.averageSpeed.sort(),
            pointStart: data.dates[0],
            pointInterval: 24 * 3600 * 1000, // one day
            type: 'spline',
            yAxis: 1,
        }],
        credits: {
            enabled: false
        }
    }

    return chartConfig
}

export default downloaderSuccessCombinedGraph