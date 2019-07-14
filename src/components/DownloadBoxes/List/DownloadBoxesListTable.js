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
const downloadBoxesListTable = (props) => {
    let listsTable = null
    if(props.data !== null) {
        let options = {
            sortName: 'in_use',
            sortOrder: 'desc'
        }

        listsTable = <BootstrapTable  data={props.data} options={ options } trClassName={cssClassInUse}  hover exportCSV>
            <TableHeaderColumn dataField='box_name'  dataSort={ true }>Box Name</TableHeaderColumn>
            <TableHeaderColumn dataField='password'  dataSort={ true } >Password</TableHeaderColumn>
            <TableHeaderColumn isKey dataField='filesystem_location' dataSort={ true }>Location</TableHeaderColumn>
            <TableHeaderColumn dataField='in_use' dataSort={ true }>In Use</TableHeaderColumn>
        </BootstrapTable>
    }
    return (
        <div className="mt-3">{listsTable}</div>
    )
}

function cssClassInUse (row) {
    return row.in_use ? 'in-use': 'not-in-use'
}


export default downloadBoxesListTable

