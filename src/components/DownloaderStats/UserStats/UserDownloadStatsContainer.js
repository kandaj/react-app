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
import React, {Component} from 'react'
import {HTTP} from '../../../utils/http-commons/http-commons'
import Aux from '../../../hoc/Aux'
import DownloaderSuccessCombinedGraph from '../Success/Stats/DownloaderSuccessCombinedGraph'
import DownloaderSuccessTable from '../Success/Stats/DownloaderSuccessTable'
import {dateFormat} from '../../../utils/dateFormat/dateFormat'
import WithLoading from '../../../hoc/WithLoading'
const DownloaderSuccessCombinedGraphWL = WithLoading(DownloaderSuccessCombinedGraph)
const DownloaderSuccessTableWL = WithLoading(DownloaderSuccessTable)

class UserDownloadStatsContainer  extends Component {

    state = {
        email: null,
        v2Data: null,
        v2ChartData: {
            success: [],
            failure: [],
            averageSpeed: [],
            dates: []
        },
        noResults: false,
        loading: true,
    }

    componentDidMount = () => {
        this.getDataHandler()
    }

    componentDidUpdate = () => {
        this.getDataHandler()
    }

    getDataHandler = () => {
        if (this.state.email !== this.props.match.params.email) {
            const stateArray = { ...this.state }
            const params = {
                params: {
                    email: this.props.match.params.email
                }
            }
            HTTP.get(`/api/v1/user/downloader-success-stats/v2`,params).then(response => {
                let data = response.data.data;
                stateArray.email = this.props.match.params.email
                if(!data.length) {
                    stateArray.noResults = true
                    stateArray.loading = false
                    this.setState( stateArray );
                } else {
                    stateArray.v2Data = data;
                    data.map(value => {
                        let date = dateFormat(value.day_mon_year)
                        if( date > 0) {
                            stateArray.v2ChartData.dates.push(date)
                            stateArray.v2ChartData.success.push([date,Number(value.total_successful)])
                            stateArray.v2ChartData.failure.push([date,Number(value.total_failed)])
                            stateArray.v2ChartData.averageSpeed.push([date, value.average_dload_speed])
                        }
                        return stateArray;
                    })
                    stateArray.noResults = false
                    stateArray.v2ChartData.dates.sort()
                    stateArray.loading = false;
                    stateArray.email = this.props.match.params.email
                    this.setState( stateArray );
                }

            })
            .catch(e => {
                console.log(e)
            })
        }

    }

    render () {

        let noResults = null
        if(this.state.noResults){
            noResults = <div className="col-lg-12 col-md-12 col-sm-12 mt-3 d-flex justify-content-center">No results found</div>
        }

        let v2CombinedGraph = <Aux><DownloaderSuccessCombinedGraphWL isLoading={this.state.loading} data={this.state.v2ChartData} ><div className="col-12 d-flex justify-content-center mt-3"><h4>API V2</h4></div></DownloaderSuccessCombinedGraphWL></Aux>

        let v2Table =  <Aux><DownloaderSuccessTableWL  isLoading={this.state.loading} data={this.state.v2Data}><div className="col-12 d-flex justify-content-center mt-3"><h4>API V2</h4></div></DownloaderSuccessTableWL></Aux>


        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        {noResults}
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        {v2CombinedGraph}
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        {v2Table}
                    </div>
                </div>
            </div>
        )
    }

}

export default UserDownloadStatsContainer