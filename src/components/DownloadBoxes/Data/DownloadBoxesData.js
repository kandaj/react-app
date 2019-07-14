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
import {HTTP} from '../../../utils/http-commons/http-commons'

const postDownloadBoxLogData = (data, state) => {
    return HTTP.post(`/api/v1/download-boxes/stats/add`, data)
        .then(response => {
            if (response.status === 201) {
                state.success = true
                state.loading = false
                state.submitDisabled = false
            } else {
                state.failure = true
                state.loading = false
                state.submitDisabled = false
            }

            return state
        })
        .catch(e => {
            console.log(e)
        })
}

const getDatasetSize = (stableID) => {

    return HTTP.get(`/api/v1/download-boxes/stats/dataset-size/${stableID}`)
        .then(response => {
            let size = ''
            if (response.data.data[0]['size_in_gb'] ) {
                size =  (response.data.data[0]['size_in_gb'] / 1024).toFixed(10)
            }
            return size
        })
        .catch(e => {
            console.log(e)
        })
}

const getDownloadBoxesStats = (state) => {
    const params = {
        params:{
            startDate: state.searchDates.startDate,
            endDate: state.searchDates.endDate
        }
    }
    return HTTP.get(`/api/v1/download-boxes/stats/list`, params)
        .then(response => {
            state.data = response.data.data
            return  state
        })
        .catch(e => {
            console.log(e)
        })

}

const getDownloadBoxesList = (state) => {
    return HTTP.get(`/api/v1/download-boxes/list`)
        .then(response => {
            state.loading = false
            state.data = response.data.data
            return  state
        })
        .catch(e => {
            console.log(e)
        })
}

const getAvailableDownloadBoxes = () => {
    return HTTP.get(`/api/v1/download-boxes/available`)
        .then(response => {
            return  response.data.data
        })
        .catch(e => {
            console.log(e)
        })
}

const updateDownloadBoxRecord = (data,state) => {
    return HTTP.post(`/api/v1/download-boxes/stats/update`, data)
        .then(response => {
            state.loading = false
            return state
        })
        .catch(e => {
            console.log(e)
        })
}


export {postDownloadBoxLogData, getDatasetSize, getDownloadBoxesStats, getDownloadBoxesList, getAvailableDownloadBoxes, updateDownloadBoxRecord}

