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

const statusGraph = (props) => {
    if (props.data.length) {
        const chartConfig = getChartConfig(props)
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

function getChartConfig (props) {

    const  chartConfig = {
        chart: {
            type: 'column',
        },
        title: {
            text: '',
            useHTML: true
        },
        xAxis: {
            type: 'category',
            labels: {
                rotation: -45,
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif'
                }
            },
            title: {
                text: 'Archive status codes',
                useHTML: true
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Number of Files'
            }
        },
        legend: {
            enabled: false
        },
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
                        return this.y
                    },
                },
                cursor: 'pointer',
                events: {
                    click: function (event) {
                         const url = `/archive-status/files/${event.point.name}`
                         props.redirect(url)
                    }
                }
            }
        },
        series: [{
            data: props.data.sort()
        }],
        tooltip : {
            formatter: function () {
                const statusTerm = props.statusTerms.filter((n) => Number.parseInt(n.archive_status_term_id, 10) === Number.parseInt(this.key, 10));
                return '<span> State: '+this.key+'</span><br/><span>Total Files: '+this.y+'</span>' +
                        '<br/><span>Status: <b>'+statusTerm[0].archive_status+'</b></span>'
            }
        },
        credits: {
            enabled: false
        }
    }
    return chartConfig
}

export default statusGraph