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
import { HTTP } from '../../../../utils/http-commons/http-commons'
import { dateFormat } from '../../../../utils/dateFormat/dateFormat'
import axios from 'axios'

const getDownloaderSuccessData = (stateArray) => {
    const params = {
        params:{
            startDate: stateArray.searchDates.startDate,
            endDate: stateArray.searchDates.endDate
        }
    }

    return axios.all([
        HTTP.get(`/api/v1/downloader-success-stats/v2/daily-status`,params),
        HTTP.get(`/api/v1/downloader-success-stats/v3/daily-status`,params)
    ])
    .then(axios.spread((v2Response, v3Response) => {
        stateArray.v2Data = []
        stateArray.v2ChartData.success = []
        stateArray.v2ChartData.failure = []
        stateArray.v2ChartData.averageSpeed = []
        stateArray.v2ChartData.dates = []
        stateArray.v3Data = []
        stateArray.v3ChartData.success = []
        stateArray.v3ChartData.failure = []
        stateArray.v3ChartData.averageSpeed = []
        stateArray.v3ChartData.dates = []

        let v2Data = v2Response.data.data;
        stateArray.v2Data = v2Data;
        v2Data.map(value => {
            let date = dateFormat(value.day_mon_year)
            if( date > 0) {
                stateArray.v2ChartData.dates.push(date)
                stateArray.v2ChartData.success.push([date,Number(value.total_successful)])
                stateArray.v2ChartData.failure.push([date,Number(value.total_failed)])
                stateArray.v2ChartData.averageSpeed.push([date, value.average_dload_speed])

            }
            return stateArray;
        })

        stateArray.v2ChartData.dates.sort()
        let v3Data = v3Response.data.data;
        stateArray.v3Data = v3Data;
        v3Data.reverse()
        v3Data.map(value => {
            let date = dateFormat(value.day_mon_year)
            if( date > 0) {
                stateArray.v3ChartData.dates.push(date)
                stateArray.v3ChartData.success.push([date,Number(value.total_successful)])
                stateArray.v3ChartData.failure.push([date,Number(value.total_failed)])
                stateArray.v3ChartData.averageSpeed.push([date,value.average_download_speed])
            }
            return stateArray;
        })
        return stateArray
    }))
    .catch((v2DataErr, v3DataErr) => {
        console.log(v2DataErr)
        console.log(v3DataErr)
    })
}

export default getDownloaderSuccessData

