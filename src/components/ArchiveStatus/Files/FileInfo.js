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
import {HTTP} from '../../../utils/http-commons/http-commons'
import Loading from '../../UI/Loading/Loading'

class FileInfo extends Component {
    state = {
        fileInfoDetails: null,
        stableID: null,
        loading:true
    }
    componentDidMount = () => {
        this.getInfoHandler()
    }

    componentDidUpdate = () => {
        this.getInfoHandler()
    }

    getInfoHandler = () => {
        const stateArray = { ...this.state }
        if (stateArray.stableID !== this.props.stableID) {
            HTTP.get(`/api/v1/audit/file-details/${this.props.stableID}`).then(response => {
                stateArray.fileInfoDetails = response.data.data[0];
                stateArray.stableID = this.props.stableID;
                stateArray.loading = false;
                this.setState( stateArray );
            })
            .catch(e => {
                console.log(e)
            })
        }
    }

    render () {
        let fileInfoTable = null
        if(this.state.loading) {
            fileInfoTable = <div className="col-lg-12 col-md-12 col-sm-12 mt-3 d-flex justify-content-center"><Loading /></div>
        }
        if( this.state.fileInfoDetails != null) {
            const fileInfoDetails = this.state.fileInfoDetails;
            fileInfoTable = <table className="table is-bordered">
                                <tbody>
                                    <tr><td><b>Stable ID</b></td><td>{fileInfoDetails['stable_id']}</td></tr>
                                    <tr><td><b>Archive Status</b></td><td>{fileInfoDetails['archive_status_id']}</td></tr>
                                    <tr><td><b>File Name</b></td><td>{fileInfoDetails['file_name']}</td></tr>
                                    <tr><td><b>Submitted File Name</b></td><td>{fileInfoDetails['submitted_file_name']}</td></tr>
                                    <tr><td><b>Staging Source</b></td><td>{fileInfoDetails['staging_source']}</td></tr>
                                    <tr><td><b>File Size</b></td><td>{Number(fileInfoDetails['file_size'] / (1024*1024*1024)).toFixed(2)} GB</td></tr>
                                    <tr><td><b>Run/Analysis Accession</b></td><td>{fileInfoDetails['run_analysis_accession']}</td></tr>
                                    <tr><td><b>File Created</b></td><td>{fileInfoDetails['file_created']}</td></tr>
                                    <tr><td><b>File Updated</b></td><td>{fileInfoDetails['file_updated']}</td></tr>
                                    {fileInfoDetails['check_sum'].map((value, i) => <tr key={i}><td><b>{value.process_step}</b></td><td>{value.md5_checksum}</td></tr>)}
                                </tbody>
                            </table>
        }
        return (
            <div className="mt-3">
                {fileInfoTable}
            </div>
        )
    }
}

export default FileInfo