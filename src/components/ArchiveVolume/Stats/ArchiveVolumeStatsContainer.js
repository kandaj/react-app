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
import React,{useState, useEffect} from 'react'
import Aux from '../../../hoc/Aux'
import VolumeGraph from './ArchiveVolumeGraph'
import VolumeTable from './ArchiveVolumeTable'
import { getDailyArchiveVolumeData } from '../Data/ArchiveVolumeData';
import DateRangeForm from '../../DateRangeForm/DateRangeForm'
import { startDate, endDate } from "../../../utils/dateFormat/dateFormat";
import WithLoading from '../../../hoc/WithLoading'
const VolumeGraphWL = WithLoading(VolumeGraph)
const VolumeTableWL = WithLoading(VolumeTable)

function archiveVolumeStatsContainer()  {

    const [state, setState] = useState({
        volumeData:null,
        volumeChartData: {
            archiveVolume: [],
            queuedVolume: [],
            pendingVolume: [],
            dates:[],
        },
        searchDates: {
            startDate: startDate,
            endDate: endDate,
        },
        loading: true
    });

    useEffect(() => {
        getDailyArchiveVolumeData(state).then(data => {
            data = {...data, ...{loading:false}}
            setState({...state, ...data})
        })
    },[state.searchDates.startDate]);

    const searchHandler = (value) => {
        let dates = {...state}
        dates.searchDates.startDate = value.startDate.format('YYYYMMDD')
        dates.searchDates.endDate = value.endDate.format('YYYYMMDD')
        dates.loading = true
        setState(dates)
    }


    let dateRangeForm = <Aux>
        <div className="col-12">
            <DateRangeForm
                clicked={searchHandler}
                defaultDates={state.searchDates}
            />
        </div>
    </Aux>
    let volumeChart = <VolumeGraphWL data={state.volumeChartData} />
    let volumeTable = <VolumeTableWL data={state.volumeData} />

    return (
        <Aux>
            <div className="container">
                <div className="row mt-3">
                    <div className="col-12">
                        {dateRangeForm}
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-12">
                        {volumeChart}
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-12">
                        {volumeTable}
                    </div>
                </div>
            </div>
        </Aux>

    );

}

export default archiveVolumeStatsContainer
