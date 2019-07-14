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

const getDownloaderVolumeData = (stateArray) => {
    const params = {
        params:{
            startDate: stateArray.searchDates.startDate,
            endDate: stateArray.searchDates.endDate
        }
    }

    return axios.all([
        HTTP.get(`/api/v1/downloader-volume-stats/v2/daily-volume`,params),
        HTTP.get(`/api/v1/downloader-volume-stats/v3/daily-volume`,params)
    ])
    .then(axios.spread((v2Response, v3Response) => {
        stateArray.v2ChartData = []
        stateArray.v2Data = []
        stateArray.v3ChartData = []
        stateArray.v3Data = []

        let v2Data = v2Response.data.data;
        stateArray.v2Data = v2Data;
        v2Data.map(value => {
            let date = dateFormat(value.day_mon_year)
            if( date > 0) {
                stateArray.v2ChartData.push([date, Number(value.size_tb)])
            }
            return stateArray;
        })
        stateArray.v2ChartData.reverse();
        let v3Data = v3Response.data.data;
        stateArray.v3Data = v3Data;
        v3Data.map(value => {
            let date = dateFormat(value.day_mon_year)
            if( date > 0) {
                stateArray.v3ChartData.push([date, Number(value.size_tb)])
            }
            return stateArray;
        })
        stateArray.v3ChartData.reverse();
        return stateArray
    }))
    .catch((v2DataErr, v3DataErr) => {
        console.log(v2DataErr)
        console.log(v3DataErr)
    })
}

export default getDownloaderVolumeData


