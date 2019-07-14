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
class FilePipelineLog extends Component {
    state = {
        filePipelineLog: null,
        stableID: null,
        loading: true
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
            HTTP.get(`/api/v1/audit/pipeline-log/${this.props.stableID}`).then(response => {
                stateArray.filePipelineLog = response.data;
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
        let filePipelineInfo = null
        if(this.state.loading) {
            filePipelineInfo =  <div className="col-lg-12 col-md-12 col-sm-12 mt-3 d-flex justify-content-center"><Loading /></div>
        }
        if( this.state.filePipelineLog != null) {
            filePipelineInfo = <div className="pipelinelog mt-3"><pre>{this.state.filePipelineLog}</pre></div>
        }
        return (
            <div className="mt-3">
                <h2>Pipeline Log</h2>
                {filePipelineInfo}
            </div>
        )
    }
}

export default FilePipelineLog