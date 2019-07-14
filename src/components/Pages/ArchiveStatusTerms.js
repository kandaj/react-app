/*
 *  European Genome-phenome Archive (EGA)
 *
 *  Copyright 2019 EMBL - European Bioinformatics Institute
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

import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import Aux from '../../hoc/Aux'
import Loading from '../UI/Loading/Loading'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'

function archiveStatusTerms (props) {
    const [state, setState] = useState({loading: true});

    useEffect(() => {
        setState({loading:false})
    },[]);

    let loading = null
    let statusTermsTable = <div><h3>No data available</h3></div>
    if(state.loading) {
        loading = <div className="col-lg-12 col-md-12 col-sm-12 mt-3 d-flex justify-content-center"><Loading /></div>
    }

    if(!state.loading && props.archiveStatusTerms.length) {
        statusTermsTable = <BootstrapTable  data={props.archiveStatusTerms} hover exportCSV>
            <TableHeaderColumn isKey dataField='archive_status_term_id' dataSort={ true } width={'15%'} filter={ { type: 'TextFilter' } }>Status ID</TableHeaderColumn>
            <TableHeaderColumn dataField='archive_status' width={'50%'}>Status</TableHeaderColumn>
            <TableHeaderColumn dataField='grouping' dataSort={ true } width={'15%'}>Grouping</TableHeaderColumn>
            <TableHeaderColumn dataField='state' dataSort={ true } width={'15%'}>State</TableHeaderColumn>
        </BootstrapTable>
    }

    return (

        <Aux>
            <div className="row mt-3">
                {loading}
            </div>
            <div className="row mt-3">
                <div className="col-12">
                    <h2>Archive Status Terms</h2>
                    {statusTermsTable}
                </div>
            </div>
        </Aux>

    );

}

archiveStatusTerms.propTypes = {
    archiveStatusTerms: PropTypes.array.isRequired
};

const mapStateToProps = state => {
    return {
        archiveStatusTerms: state.archiveStatusTerms
    }
}

export default connect(mapStateToProps)(archiveStatusTerms)

