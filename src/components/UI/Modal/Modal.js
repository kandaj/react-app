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
import React,{ useState, useEffect } from 'react'
import Modal from 'react-responsive-modal';
import Clipboard from 'react-clipboard.js';
import {FaRegCopy} from 'react-icons/fa';

function modal (props) {
    const [state, setState] = useState({copied: false});

    useEffect(() => {
        setState({copied:false})
    },[]);

    const close = () => {
        setState({copied:false})
        props.close()
    }

    let copiedEl = ''
    if(state.copied){
        copiedEl = <span className="badge badge-success">Key copied!</span>
    }

    return (
        <div className="col-12 mt-3">
            <Modal open={props.show} onClose={close} center={true}>
                <div className="row">
                    <div className="col-12">
                    {copiedEl}
                    </div>
                </div>
                <div className="row">
                    <div className="col-8">
                        <Clipboard data-clipboard-text={props.data} className="btn btn-light" onClick={() => setState({copied:true})}><span><FaRegCopy />&nbsp;&nbsp;{props.data}</span></Clipboard>
                    </div>
                    <div className="col-2"></div>
                </div>
            </Modal>
        </div>
    )
}

export default modal

