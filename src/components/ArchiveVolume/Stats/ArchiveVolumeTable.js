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
import React from 'react'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'

const archiveVolumeTable = (props) => {
    let volumeTable = 'No data available'
    if(props.data !== null) {
        let options = {
            sortName: 'date_f',
            sortOrder: 'desc'
        }
        volumeTable = <BootstrapTable  data={props.data} options={ options } hover pagination exportCSV>
            <TableHeaderColumn  isKey dataField='date_f' dataSort={ true }>Date</TableHeaderColumn>
            <TableHeaderColumn  dataField='archive_volume_tb' dataFormat={ dataFormatter } dataSort={ true }>Archived</TableHeaderColumn>
            <TableHeaderColumn  dataField='queued_volume_tb' dataFormat={ dataFormatter } dataSort={ true }>Queued</TableHeaderColumn>
            <TableHeaderColumn  dataField='pending_volume_tb' dataFormat={ dataFormatter } dataSort={ true }>Pending</TableHeaderColumn>
        </BootstrapTable>
    }
    return (
        <div className="mt-3">{volumeTable}</div>
    )
}

function dataFormatter (cell, row) {
    return  Number(cell).toFixed(2)
}

export default archiveVolumeTable