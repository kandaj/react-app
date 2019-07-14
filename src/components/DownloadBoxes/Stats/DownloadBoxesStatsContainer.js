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
import Aux from '../../../hoc/Aux'
import { startDate, endDate } from '../../../utils/dateFormat/dateFormat'
import DateRangeForm from '../../DateRangeForm/DateRangeForm'
import DownloadBoxesStatsTable from './DownloadBoxesStatsTable'
import DownloadBoxesForm from '../Form/DownloadBoxesForm'
import { getDownloadBoxesStats, updateDownloadBoxRecord } from '../Data/DownloadBoxesData'
import Modal from '../../UI/Modal/Modal'
import WithLoading from '../../../hoc/WithLoading'

const DownloadBoxesFormWL = WithLoading(DownloadBoxesForm)
const DownloadBoxesStatsTableWL = WithLoading(DownloadBoxesStatsTable)

class DownloadBoxesStatsContainer extends Component {

    state = {
        data: null,
        open:false,
        loading: true,
        showEncKey:false,
        encKey:null,
        searchDates: {
            startDate: startDate,
            endDate: endDate,
        },
        dataAdded: false
    }

    componentDidMount = () => {
        this.fetchData()
    }

    fetchData = () => {
        const state = {...this.state}
        getDownloadBoxesStats(this.state).then(response => {
            state.loading = false
            state.data = response.data
            this.setState(state)
        })
    }

    dataAdded = () => {
        this.fetchData()
    }

    updateButtonClick = (data) => {
        const state = {...this.state}
        state.loading = true
        this.setState(state)
        updateDownloadBoxRecord(data, state).then( response => {
            this.fetchData()
        })
    }

    showKey = (row) => {
        this.setState({showEncKey:true, encKey:row.enc_key})
    }

    closeKey = () => {
        this.setState({showEncKey:false, encKey:null})
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

        let statsTable =  <DownloadBoxesStatsTableWL isLoading={this.state.loading} data={this.state.data} clicked={this.updateButtonClick} showKeyClicked={this.showKey}/>

        return (
            <div className="container">
                <div className="row mt-3">
                    <div className="col-12">
                            <DownloadBoxesFormWL isLoading={this.state.loading} dataAdded={this.dataAdded}/>
                    </div>
                </div>
                <div className="row mt-3">
                    {dateRangeForm}
                </div>
                <Modal show={this.state.showEncKey} close={this.closeKey} data={this.state.encKey}/>
                <div className="row">
                    <div className="col-12">
                        {statsTable}
                    </div>
                </div>
            </div>
        )
    }
}

export default DownloadBoxesStatsContainer