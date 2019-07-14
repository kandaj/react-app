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
import React, {Component} from 'react'
import { connect } from 'react-redux'
import {HTTP} from '../../../utils/http-commons/http-commons'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import {Link} from 'react-router-dom'
import Loading from '../../UI/Loading/Loading'

class ListStatusFiles extends Component {
    state = {
        statusFiles : null,
        statusID : null,
        count: null,
        page: 1,
        itemsPerPage: 10,
        loading:true
    }

    componentDidMount = () => {
        this.fetchData()
    }

    fetchData = (page = this.state.page, itemsPerPage = this.state.itemsPerPage) => {
        let statusFilesArray = {...this.state};
        let statusID = this.props.match.params.id;
        const params = {
            params: {
                itemsPerPage: itemsPerPage
            }
        }

        HTTP.get(`/api/v1/audit/files/${statusID}/${page}`,params).then(response => {
            statusFilesArray.statusFiles = response.data.data;
            statusFilesArray.statusID = statusID;
            statusFilesArray.count = response.data.count;
            statusFilesArray.loading = false;
            this.setState(statusFilesArray);
        })
        .catch(e => {
            console.log(e)
        })

    }

    handlePageChange = (page, itemsPerPage) => {
        this.fetchData(page, itemsPerPage)
    }

    stableIDFormatter = (cell) => {
       return  <Link
                    key={cell}
                    to={{
                    pathname: `/file-details/${cell}`}}>
                    {cell}
               </Link>
    }

    render = () => {
        let listFiles = null
        let statusTerm = null
        if (this.state.loading) {
            listFiles = <div className="col-lg-12 col-md-12 col-sm-12 mt-3 d-flex justify-content-center"><Loading /></div>
        }
        if(this.state.statusFiles !== null && !this.state.loading) {
            const options = {
                onPageChange: this.handlePageChange,
                page: this.state.page,
                itemsPerPage: this.state.itemsPerPage,
            };
            listFiles = <BootstrapTable
                            options={options}
                            data={this.state.statusFiles}
                            fetchInfo={{dataTotalSize: this.state.count}}
                            hover
                            pagination
                            remote>
                            <TableHeaderColumn isKey dataField='stable_id' width='25%' dataFormat={this.stableIDFormatter}  >Stable ID</TableHeaderColumn>
                            <TableHeaderColumn dataField='file_name' width='60%'>File Name</TableHeaderColumn>
                            <TableHeaderColumn dataField='staging_source' width='15%'>Box</TableHeaderColumn>
                        </BootstrapTable>
        }

        if(this.state.statusID) {
            statusTerm =  this.props.archiveStatusTerms.filter((n) => Number.parseInt(n.archive_status_term_id, 10) === Number.parseInt(this.state.statusID, 10))[0].archive_status
        }

        console.log(statusTerm)
        return(
            <div className="container-fluid">
                <div className="row mt-3">
                    <div className="col-12 mt-3">
                        <div><h2>Status {this.state.statusID} Files</h2></div>
                        <div> <h4>{statusTerm}</h4></div>
                        <div className="mt-3">{listFiles}</div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        archiveStatusTerms: state.archiveStatusTerms
    }
}

export default connect(mapStateToProps)(ListStatusFiles)