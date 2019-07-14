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

const downloaderSuccessTable = (props) => {
    let successTable = 'No data available'
    let averageSpeedColumn = null
    if(props.data.length) {
        if(props.data[0].average_download_speed) {
            averageSpeedColumn =  <TableHeaderColumn  dataField='average_download_speed' dataFormat={speedFormatter} dataSort={ true }>Average<br/>Download<br/> Speed</TableHeaderColumn>
        } else if (props.data[0].average_dload_speed) {
            averageSpeedColumn =  <TableHeaderColumn  dataField='average_dload_speed' dataFormat={speedFormatter} dataSort={ true }>Average<br/>Download<br/> Speed</TableHeaderColumn>
        }
        successTable = <BootstrapTable  data={props.data}  hover pagination exportCSV>
            <TableHeaderColumn  isKey dataField='day_mon_year' dataSort={ true }>Date</TableHeaderColumn>
            <TableHeaderColumn  dataField='total_successful' dataSort={ true }>Success</TableHeaderColumn>
            <TableHeaderColumn  dataField='total_failed' dataSort={ true }>Failed</TableHeaderColumn>
            {averageSpeedColumn}
        </BootstrapTable>
    }
    return (
        <div className="mt-3">{successTable}</div>
    )
}

function speedFormatter (cell, row) {
    return  Number(cell).toFixed(2)
}

export default downloaderSuccessTable