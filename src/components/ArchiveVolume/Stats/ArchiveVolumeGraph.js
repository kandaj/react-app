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
import ReactHighcharts from 'react-highcharts'

const archiveVolumeGraph = (props) => {
    if (props.data.archiveVolume.length || props.data.queuedVolume.length || props.data.pendingVolume.length) {
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
            text: 'Daily Archive Volume Graph'
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
                text: 'Size in TB',
                useHTML: true
            }
        }],
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0,
                dataLabels: {
                    enabled: true,
                    style: {
                        fontWeight: 'lighter',
                        color:'gray'
                    },
                    formatter: function(){
                        if(this.y){
                            return this.y.toFixed(2);
                        }
                    },
                }
            }
        },
        series: [{
            name:'Archived Volume',
            data: data.archiveVolume.sort(),
            pointStart: data.dates[0],
            pointInterval: 24 * 3600 * 1000, // one day
            type: 'column'
        },{
            name:'Queued Volume',
            data: data.queuedVolume.sort(),
            pointStart: data.dates[0],
            pointInterval: 24 * 3600 * 1000, // one day
            type: 'column',
        },{
            name:'Pending Volume',
            data: data.pendingVolume.sort(),
            pointStart: data.dates[0],
            pointInterval: 24 * 3600 * 1000, // one day
            type: 'column'
        }],
        credits: {
            enabled: false
        }
    }

    return chartConfig
}

export default archiveVolumeGraph