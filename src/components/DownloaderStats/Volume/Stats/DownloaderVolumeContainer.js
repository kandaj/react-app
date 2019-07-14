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
import DownloaderVolumeTable from './DownloaderVolumeTable'
import DownloaderVolumeLinearGraph from './DownloaderVolumeLinearGraph'
import DownloaderVolumeColumnGraph from './DownloaderVolumeColumnGraph'
import { startDate, endDate } from '../../../../utils/dateFormat/dateFormat'
import DateRangeForm from '../../../DateRangeForm/DateRangeForm'
import getDownloaderVolumeData from '../Data/DownloaderVolumeData'
import WithLoading from '../../../../hoc/WithLoading'
const DownloadVolumeTableWL = WithLoading(DownloaderVolumeTable)
const DownloaderVolumeLinearGraphWL = WithLoading(DownloaderVolumeLinearGraph)
const DownloaderVolumeColumnGraphWL = WithLoading(DownloaderVolumeColumnGraph)


class DownloaderVolumeContainer  extends Component {

    state = {
        v2Data: null,
        v2ChartData: [],
        v3Data: null,
        v3ChartData: [],
        loading: true,
        searchDates: {
            startDate: startDate,
            endDate: endDate,
        },
    }

    componentDidMount = () => {
        this.fetchData()
    }

    searchHandler = (value) => {
        const state = { ...this.state }
        state.searchDates.startDate = value.startDate.format('YYYYMMDD')
        state.searchDates.endDate = value.endDate.format('YYYYMMDD')
        state.loading = true
        this.setState(state)
        this.fetchData()
    }

    fetchData = () => {
        getDownloaderVolumeData(this.state).then(data => {
            data.loading = false
            this.setState(data)
        })
    }

    render () {

        let v2Table =  <DownloadVolumeTableWL isLoading={this.state.loading} data={this.state.v2Data} />
        let v3Table =  <DownloadVolumeTableWL  isLoading={this.state.loading} data={this.state.v3Data} />
        let dateRangeForm = <Aux>
             <div className="col-12">
                 <DateRangeForm
                     clicked={this.searchHandler}
                     defaultDates={this.state.searchDates}
                 />
             </div>
         </Aux>
         let linearGraph = <DownloaderVolumeLinearGraphWL isLoading={this.state.loading} data={this.state}/>
         let v2ColumnGraph = <Aux><DownloaderVolumeColumnGraphWL isLoading={this.state.loading} data={this.state.v2ChartData}><div className="col-12 d-flex justify-content-center"><h4>API V2</h4></div></DownloaderVolumeColumnGraphWL></Aux>
         let v3ColumnGraph = <Aux><DownloaderVolumeColumnGraphWL isLoading={this.state.loading} data={this.state.v3ChartData}><div className="col-12 d-flex justify-content-center"><h4>API V3</h4></div></DownloaderVolumeColumnGraphWL></Aux>

        return (
            <div className="container">
                <div className="row mt-3">
                    {dateRangeForm}
                </div>
                <div className="row">
                    <div className="col-12">
                        {linearGraph}
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        {v2ColumnGraph}
                        {v2Table}
                    </div>
                    <div className="col-6">
                        {v3ColumnGraph}
                        {v3Table}
                    </div>
                </div>
            </div>
        )
    }

}

export default DownloaderVolumeContainer
