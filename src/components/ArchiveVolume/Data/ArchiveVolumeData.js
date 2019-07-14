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
import {dateFormat} from '../../../utils/dateFormat/dateFormat'

const getDailyArchiveVolumeData = (stateArray) => {
    const params = {
        params:{
            startDate: stateArray.searchDates.startDate,
            endDate: stateArray.searchDates.endDate
        }
    }

    return HTTP.get(`/api/v1/daily-archive-volume`,params).then(response => {
        stateArray.volumeData = []
        stateArray.volumeChartData.dates = []
        stateArray.volumeChartData.archiveVolume = []
        stateArray.volumeChartData.queuedVolume = []
        stateArray.volumeChartData.pendingVolume = []
        let data = response.data.data;
        stateArray.volumeData = data
        data.reverse()
        data.map(value => {
            let date = dateFormat(value.date_f)
            if( date > 0) {
                stateArray.volumeChartData.dates.push(date)
                stateArray.volumeChartData.archiveVolume.push([date, Number(value.archive_volume_tb)])
                stateArray.volumeChartData.queuedVolume.push([date, Number(value.queued_volume_tb)])
                stateArray.volumeChartData.pendingVolume.push([date, Number(value.pending_volume_tb)])
            }
            return stateArray
        })
       return stateArray
    })
    .catch(e => {
        console.log(e)
    })
}

const getRecentDailyArchiveVolumeData = (stateArray) => {

    return HTTP.get(`/api/v1/daily-archive-volume/recent`).then(response => {
        let data = response.data.data;
        stateArray.volumeData = data
        data.reverse()
        data.map(value => {
            let date = dateFormat(value.date_f)
            if( date > 0) {
                stateArray.volumeChartData.dates.push(date)
                stateArray.volumeChartData.archiveVolume.push([date, Number(value.archive_volume_tb)])
                stateArray.volumeChartData.queuedVolume.push([date, Number(value.queued_volume_tb)])
                stateArray.volumeChartData.pendingVolume.push([date, Number(value.pending_volume_tb)])
            }
            return stateArray
        })
        return stateArray
    })
    .catch(e => {
        console.log(e)
    })
}



export {getDailyArchiveVolumeData, getRecentDailyArchiveVolumeData}