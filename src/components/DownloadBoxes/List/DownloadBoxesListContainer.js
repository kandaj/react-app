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
import { getDownloadBoxesList } from '../Data/DownloadBoxesData'
import DownloadBoxesListTable from './DownloadBoxesListTable'
import WithLoading from '../../../hoc/WithLoading'

const DownloadBoxesListTableWL = WithLoading(DownloadBoxesListTable)


class DownloadBoxesListContainer extends Component {

    state = {
        data: null,
        loading: true,
    }

    componentDidMount = () => {
        this.fetchData()
    }

    fetchData = () => {
        getDownloadBoxesList(this.state).then(response => {
            const state = {...this.state}
            state.loading = false
            state.data = response.data
            this.setState(state)
        })
    }


    render () {

        let listsTable =  <DownloadBoxesListTableWL isLoading={this.state.loading} data={this.state.data} />

        return (
            <div className="container">
                <div className="row mt-3">
                    <div className="col-12">
                        <h2>List of Boxes</h2>
                        {listsTable}
                    </div>
                </div>
            </div>
        )
    }
}

export default DownloadBoxesListContainer