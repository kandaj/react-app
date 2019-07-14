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
import moment from 'moment'
const downloadBoxesStatsTable = (props) => {
    let logTable = null

    if(props.data !== null) {
        let options = {
            sortName: 'created',
            sortOrder: 'desc',
            expandBy: 'column'
        }

        logTable =<div>
                <BootstrapTable
                    data={props.data}
                    options={ options }
                    trClassName={cssClassExpired}
                    hover
                    pagination
                    exportCSV
                >
                <TableHeaderColumn isKey dataField='id'  width={'0%'}>ID</TableHeaderColumn>
                <TableHeaderColumn dataField='created' dataFormat={DateFormatter} dataSort={ true } width={'12%'} expandable={ true }>Date</TableHeaderColumn>
                <TableHeaderColumn dataField='rt_ticket' dataFormat={rtLink} dataSort={ true } width={'8%'}>RT</TableHeaderColumn>
                <TableHeaderColumn dataField='email' dataSort={ true } width={'26%'}>Email</TableHeaderColumn>
                <TableHeaderColumn dataField='box' dataSort={ true } dataFormat={boxFormatter} width={'8%'}>Box</TableHeaderColumn>
                <TableHeaderColumn dataField='accession_id' dataSort={ true } width={'19%'} dataFormat={datasetFormatter}>Dataset</TableHeaderColumn>
                <TableHeaderColumn dataField='button' dataFormat={showKeyButton} formatExtraData={props} width={'11%'} expandable={ false }/>
                <TableHeaderColumn dataField='button' dataFormat={cellButton} formatExtraData={props} width={'10%'} expandable={ false }/>
            </BootstrapTable>
        </div>
    }
    return (
        <div className="mt-3">{logTable}</div>
    )
}

function showKeyButton(cell, row, props){
   let button = <button  type="button" className="btn btn-outline-primary btn-sm" onClick={() => props.showKeyClicked(row)} >Show key</button>
   return button
}

function cellButton(cell, row, props){
    let button = 'Done'
    if( !row.status ) {
        button = <button  type="button" className="btn btn-info btn-sm" onClick={() => props.clicked(row)} >Update</button>
    }
    return button
}

function DateFormatter (cell, row) {
    return moment(cell).format('DD/MM/YYYY')
}

function boxFormatter (cell, row) {
    return cell.split('-').pop()
}

function datasetFormatter (cell, row) {
    return row.accession_id + '<br/>(' +row.size_in_tb + ' TB) ';
}

function cssClassExpired (row) {
    if(!row.status) {
        return moment(row.created).format('x') > moment().subtract(14, 'days').format('x')  ? null: 'expired'
    }

}

function rtLink(cell, row) {
    const link = 'https://helpdesk.ebi.ac.uk/Ticket/Display.html?id='+cell
    return `<a href=${link} target="_blank">${cell}</a>`
}

export default downloadBoxesStatsTable

