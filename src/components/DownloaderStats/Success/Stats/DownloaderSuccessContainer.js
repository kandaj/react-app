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
import Aux from '../../../../hoc/Aux'
import DownloaderSuccessCombinedGraph from './DownloaderSuccessCombinedGraph'
import DownloaderSuccessTable from './DownloaderSuccessTable'
import {startDate, endDate } from '../../../../utils/dateFormat/dateFormat'
import DateRangeForm from '../../../DateRangeForm/DateRangeForm'
import getDownloaderSuccessData from '../Data/DownloaderSuccessData'
import WithLoading from '../../../../hoc/WithLoading'

const DownloaderSuccessCombinedGraphWL = WithLoading(DownloaderSuccessCombinedGraph)
const DownloaderSuccessTableWL = WithLoading(DownloaderSuccessTable)

class downloadStatsContainer  extends Component {

    state = {
        v2Data: null,
        v2ChartData: {
            success: [],
            failure: [],
            averageSpeed: [],
            dates: []
        },
        v3Data: null,
        v3ChartData: {
            success: [],
            failure: [],
            averageSpeed: [],
            dates: []
        },
        searchDates: {
            startDate: startDate,
            endDate: endDate,
        },
        loading: true,
    }

    componentDidMount = () => {
        this.fetchData()
    }

    fetchData = () => {
        getDownloaderSuccessData(this.state).then(data => {
            data.loading = false
            this.setState(data)
        })
    }

    searchHandler = (value) => {
        const state = { ...this.state }
        state.searchDates.startDate = value.startDate.format('YYYYMMDD')
        state.searchDates.endDate = value.endDate.format('YYYYMMDD')
        state.loading = true
        this.setState(state)
        this.fetchData()
    }

    render () {

        let dateRangeForm = <Aux>
            <div className="col-12">
                <DateRangeForm
                    clicked={this.searchHandler}
                    defaultDates={this.state.searchDates}
                />
            </div>
        </Aux>
        let v2CombinedGraph = <Aux><DownloaderSuccessCombinedGraphWL isLoading={this.state.loading} data={this.state.v2ChartData}><div className="col-12 d-flex justify-content-center mt-3"><h4>API V2</h4></div></DownloaderSuccessCombinedGraphWL></Aux>
        let v3CombinedGraph = <Aux><DownloaderSuccessCombinedGraphWL isLoading={this.state.loading} data={this.state.v3ChartData}><div className="col-12 d-flex justify-content-center mt-3"><h4>API V3</h4></div></DownloaderSuccessCombinedGraphWL></Aux>
        let v2Table =  <Aux><DownloaderSuccessTableWL isLoading={this.state.loading} data={this.state.v2Data}><div className="col-12 d-flex justify-content-center mt-3"><h4>API V2</h4></div></DownloaderSuccessTableWL></Aux>
        let v3Table =  <Aux><DownloaderSuccessTableWL isLoading={this.state.loading} data={this.state.v3Data} ><div className="col-12 d-flex justify-content-center mt-3"><h4>API V3</h4></div></DownloaderSuccessTableWL></Aux>

        return (
            <div className="container">
                <div className="row mt-3">
                    {dateRangeForm}
                </div>
                <div className="row">
                    <div className="col-12">
                        {v2CombinedGraph}
                    </div>
                    <div className="col-12">
                        {v3CombinedGraph}
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        {v2Table}
                    </div>
                    <div className="col-6">
                        {v3Table}
                    </div>
                </div>
            </div>
        )
    }

}

export default downloadStatsContainer