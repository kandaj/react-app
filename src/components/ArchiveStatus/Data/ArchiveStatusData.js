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

const getArchiveStatusData = (state) => {
    return HTTP.get(`/api/v1/audit/file-count`).then(response => {
        return getChartData(response.data.data, state);
    })
    .catch(e => {
        console.log(e)
    })

}

const getArchiveStatusTerms = () => {
    return HTTP.get(`/api/v1/audit/archive-status-terms`)
        .then(response => {
            return response.data.data
        })
        .catch(e => {
            console.log(e)
        })

}


const getChartData = (data,statusArray) => {
    const manualErrorStates = [3,6,13,50,52]
    const errorStates = [5,7,8,9,10,12,15,23,24,25,51];
    const errorStateArray = [];
    const manualErrorStateArray = [];
    const normalStateArray = [];
    data.filter(function(itm){
        if (errorStates.indexOf(itm.archive_status_id) > -1)  {
            errorStateArray.push([itm.archive_status_id.toString(), Number(itm.total)])
        } else if (manualErrorStates.indexOf(itm.archive_status_id) > -1){
            manualErrorStateArray.push([itm.archive_status_id.toString(), Number(itm.total)])
        } else {
            normalStateArray.push([itm.archive_status_id.toString(), Number(itm.total)])
        }
        return '';
    });

    statusArray.manualErrorStates = manualErrorStateArray;
    statusArray.errorStates = errorStateArray;
    statusArray.processingStates = normalStateArray;
    return statusArray
}

export {getArchiveStatusData, getArchiveStatusTerms}