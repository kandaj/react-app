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
import React, {Component} from 'react';
import {Route} from 'react-router-dom'
import FileInfoContainer from './FileInfoContainer'
import Input from '../../UI/Input/Input'

class FileInfoForm extends Component {
    state = {
        fileInfoForm : {
            stableID : {
                elementType: 'input',
                elementConfig: {
                    type:'text',
                    className:'form-control',
                    placeholder:'Enter a valid stable ID'
                },
                value: '',
                validation: {
                    required: true,
                    stableID: true
                },
                valid: false,

            }
        }
    }

    componentDidMount = () => {
        let paramsArray = this.props.location.pathname.split('/')
        const state = {...this.state}
        if (paramsArray.length >= 3) {
            state.fileInfoForm.stableID.value = paramsArray[2]
            this.setState(state)
        }
    }

    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if(rules.stableID) {
            const regex = /^[E][G][A][F][0-9]{11}$/g
            isValid =  value.match(regex) && isValid
        }

        return isValid;
    }

    inputChangedHandler =(event) => {
        const fileFormState = {...this.state.fileInfoForm}
        fileFormState.stableID.value = event.target.value;

        const isValid = this.checkValidity( event.target.value,  fileFormState.stableID.validation)
        fileFormState.stableID.valid = isValid;
        fileFormState.stableID.elementConfig.className =  isValid ? 'form-control' : 'form-control is-invalid'
        this.setState(fileFormState);
    }

    showFileInfoHandler = (e) => {
        e.preventDefault();
        const stableId = this.state.fileInfoForm.stableID.value
        if(stableId) {
            this.props.history.push({pathname:`/file-details/${stableId}`})
        }
    }

    render () {

        const formElement = {
            id: 'stableID',
            config: this.state.fileInfoForm.stableID
        }

        let form = (
            <form  className="form-group row" onSubmit={this.showFileInfoHandler}>
                <div className="col-10">
                        <Input
                            key={formElement.id}
                            elementType={formElement.config.elementType}
                            elementConfig={formElement.config.elementConfig}
                            value={formElement.config.value}
                            changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                        <div className="invalid-feedback">
                            <span>Please enter a valid file stable ID</span>
                        </div>
                </div>
                <div className="col-2">
                    <button type="submit" className="btn btn-primary">Get Detail</button>
                </div>
            </form>
        );

        return (
            <div className="container">
                <div className="row mt-4">
                    <div className="col-10">
                        {form}
                    </div>
                </div>
                <div className="row mt-3">
                    <Route path={this.props.match.url + '/:id'} component={FileInfoContainer}/>
                </div>
            </div>

        )
    }

}

export default FileInfoForm