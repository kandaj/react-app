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
import React,{Component} from 'react';
import FileInfo from './FileInfo'
import FilePipelineLog from './FilePipelineLog'
class FileInfoContainer extends Component {
    state = {
        stableID: null
    }
    componentDidMount = () => {
        this.showLogInfo()
    }

    componentDidUpdate = () => {
        this.showLogInfo()
    }

    showLogInfo = () => {
        const stateArray = {...this.state};
        if (this.state.stableID !== this.props.match.params.id) {
            stateArray.stableID = this.props.match.params.id;
            this.setState(stateArray)
        }
    }


    render = () =>  {
        let fileInfo = null;
        if (this.state.stableID != null) {
            fileInfo = <div className="row">
                            <h2>File Information: {this.state.stableID}</h2>
                            <div className="col-12">
                                <FileInfo stableID={this.state.stableID}/>
                            </div>
                            <div className="col-12">
                                <FilePipelineLog stableID={this.state.stableID}/>
                            </div>
                        </div>

        }
        return (
            <div className="container">{fileInfo}</div>
        )
    }
}

export default FileInfoContainer