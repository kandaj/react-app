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

const downloaderVolumeTable = (props) => {
    let volumeTable = 'No data available'
    if(props.data.length) {
        volumeTable = <BootstrapTable  data={props.data}  hover pagination exportCSV>
                        <TableHeaderColumn isKey dataField='day_mon_year' dataSort={ true }>Date</TableHeaderColumn>
                        <TableHeaderColumn dataField='size_tb' dataFormat={sizeFormatter} dataSort={ true }>Size in TB</TableHeaderColumn>
                    </BootstrapTable>
    }
    return (
        <div className="mt-3">{volumeTable}</div>
    )
}

function sizeFormatter (cell, row) {
    return  Number(cell).toFixed(2)
}

export default downloaderVolumeTable