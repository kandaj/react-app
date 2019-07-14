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

const downloaderVolumeColumnGraph = (props) => {
    if (props.data.length) {
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
            type: 'column',
            zoomType: 'x'
        },
        title: {
            text: '',
            useHTML: true
        },
        subtitle: {
            text: document.ontouchstart === undefined ?
                'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in'
        },
        xAxis: {
            type: 'datetime',
            labels: {
                rotation: -45,
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif'
                }
            },
            title: {
                text: '<b>Date</b>',
                useHTML: true
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Amount of distributed Data (TB)',
                useHTML: true
            }
        },
        legend: {
            enabled: false
        },
        series: [{
            data: data
        }],
        tooltip : {
            formatter: function () {
                return '<span> <b>Date:</b> '+new Date(this.key).toLocaleString()+'</span><br/><span><b>Total size:</b> '+this.y+'</span>'
            }
        },
        credits: {
            enabled: false
        }
    }

    return chartConfig
}

export default downloaderVolumeColumnGraph