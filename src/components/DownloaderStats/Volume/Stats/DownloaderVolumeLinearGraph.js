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
import React from 'react';
import ReactHighcharts from 'react-highcharts';

const downloaderVolumeGraph  = (props) => {
    if (props.data.v2ChartData.length || props.data.v3ChartData.length) {
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

function getChartConfig (data)  {

    const chartConfig = {
        chart: {
            zoomType: 'x'
        },
        title: {
            text: 'Downloader API'
        },
        subtitle: {
            text: document.ontouchstart === undefined ?
                'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in'
        },
        xAxis: {
            type: 'datetime'
        },
        yAxis: {
            title: {
                text: 'Amount of distributed Data (TB)'
            },
            min: 0,
        },
        legend: {
            enabled: true
        },
        tooltip: {

            shared: true

        },
        plotOptions: {
            series: {
                pointStart: Date.UTC(2015, 1, 1),
                pointInterval: 24 * 3600 * 1000 // one day
            }
        },
        exporting: {enabled: true},
        credits: {enabled: false},
        series: [
            {
                type: 'spline',
                name: 'V2',
                data: data.v2ChartData.sort()

            },
            {
                type: 'spline',
                name: 'V3',
                data: data.v3ChartData.sort()

            }
        ]
    }

    return chartConfig

}

export default downloaderVolumeGraph