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

import React,{Component} from 'react'
import Input from '../../UI/Input/Input'
import Loading from '../../UI/Loading/Loading'
import { postDownloadBoxLogData, getDatasetSize, getAvailableDownloadBoxes} from '../Data/DownloadBoxesData';
import RandomHash from '../../../utils/randomHash/randomHash'

const hash = new RandomHash()
class DownloadBoxesForm extends Component {
    state = {
        availableBoxes:null,
        boxForm: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email',
                    className: 'form-control'
                },
                value: '',
                validation: {
                    required: true,
                    email:true
                },
                valid:false
            },
            box: {
                elementType: 'select',
                elementConfig: {
                    className: 'form-control',
                    options:[]
                },
                value: '',
                validation: {
                    required: true,
                },
                valid:false
            },
            rt_ticket: {
                elementType: 'input',
                elementConfig: {
                    type: 'number',
                    placeholder: 'RT Ticket Number',
                    className: 'form-control'
                },
                value: '',
                validation: {
                    required: true,
                    number: true
                },
                valid:false
            }

        },
        encKeyForm: {
            encKey: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Encryption key',
                    className: 'form-control',
                    disabled:true
                },
                value: hash.generate(),
                validation: {
                    encKey:true,
                    required: true
                },
                valid:true
            }
        },
        dataSetForm : [],
        sizeForm: [],
        loading: false,
        submitDisabled: false,
        success: false,
        failure:false
    }

    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if(rules.email) {
            const mailformat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
            isValid = value.trim() !== '' && value.match(mailformat) && isValid;
        }

        if (rules.box) {
            isValid = value.trim() !== '' && isValid;
        }

        if(rules.encKey){
            isValid = value.trim() !== '' && value.length === 32 && isValid;
        }


        if(rules.stableID) {
            const regex = /^[E][G][A][D][0-9]{11}$/g
            isValid =  value.match(regex) && isValid
        }

        if(rules.integer) {
            isValid = value.trim() !== '' && value.match(/^\d+(\.\d+)?$/) && value >=0 && isValid;
        }

        if(rules.number) {
            isValid = value.trim() !== '' && value.match(/^\d+$/) && value >=0 && isValid;
        }

        return isValid;
    }

    componentDidMount = () => {
        this.getAvailableBoxes()
        if (this.state.dataSetForm.length < 1) {
            this.addDatasetInput()
        }
    }

    componentDidUpdate = () => {
        this.getAvailableBoxes()
    }

    getAvailableBoxes = () => {
        let options = [{value:'',displayValue:'Select a Box' }]
        let state = this.state
        getAvailableDownloadBoxes().then(response => {
            response.map(values => {
                return options.push({value:values['box_name'], displayValue:values['box_name']})
            })
            if (state.boxForm.box.elementConfig.options.length !== options.length) {
                state.boxForm.box.elementConfig.options = options
                state.availableBoxes = response.length
                this.setState(state)
            }

        })
    }

    addDatasetInput = () => {
        const state = {...this.state}
        const dataSet  = {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Dataset',
                className: 'form-control'
            },
            validation: {
                required: true,
                stableID:true
            },
            value: '',
            valid: false
        }
        const size = {
            elementType: 'input',
            elementConfig: {
                type: 'number',
                placeholder: 'Size',
                className: 'form-control'
            },
            validation: {
                required: true,
                integer: true
            },
            value: '',
            valid: false
        }
        state.dataSetForm.push(dataSet)
        state.sizeForm.push(size)
        this.setState(state)
    }


    inputChangedHandler = (event, inputIdentifier) => {
        const fileFormState = {...this.state.boxForm}
        fileFormState[inputIdentifier].value = event.target.value;
        const isValid = this.checkValidity( event.target.value,  fileFormState[inputIdentifier].validation)
        fileFormState[inputIdentifier].valid = isValid;
        fileFormState[inputIdentifier].elementConfig.className =  isValid ? 'form-control' : 'form-control is-invalid'
        this.setState(fileFormState);
    }

    datasetInputChangedHandler = (event, index) => {
        const datasetFormState = {...this.state.dataSetForm}
        datasetFormState[index].value = event.target.value;

        const isValid = this.checkValidity( event.target.value,  datasetFormState[index].validation)
        datasetFormState[index].valid = isValid;
        datasetFormState[index].elementConfig.className =  isValid ? 'form-control' : 'form-control is-invalid'
        if(isValid) {
            this.setDatasetSize(event.target.value, index)
        }
        this.setState(datasetFormState);
    }

    setDatasetSize = (value,index) => {
        getDatasetSize(value,index).then(data => {
            const sizeFormState = {...this.state.sizeForm}
            sizeFormState[index].value = data
            const isValid = this.checkValidity(data,  sizeFormState[index].validation)
            sizeFormState[index].valid = isValid;
            sizeFormState[index].elementConfig.className =  isValid ? 'form-control' : 'form-control is-invalid'
            this.setState(sizeFormState);
        })
    }

    sizeInputChangedHandler = (event, index) => {
        const sizeFormState = {...this.state.sizeForm}
        sizeFormState[index].value = event.target.value;

        const isValid = this.checkValidity( event.target.value,  sizeFormState[index].validation)
        sizeFormState[index].valid = isValid;
        sizeFormState[index].elementConfig.className =  isValid ? 'form-control' : 'form-control is-invalid'
        this.setState(sizeFormState);
    }



    addDatasetHandler = (e) => {
        e.preventDefault()
        this.addDatasetInput()
    }

    removeDatasetHandler = (e,index) => {
        e.preventDefault()
        const state = {...this.state}
        state.dataSetForm.splice(index,1)
        state.sizeForm.splice(index,1)
        state.dataSetForm.filter( (dataSet, i) => i !== index)
        state.sizeForm.filter( (size, i) => i !== index)
        this.setState(state)
    }

    submitHandler = (e) => {
        e.preventDefault();
        const state = { ...this.state}
        state.submitDisabled = true
        state.loading = true
        this.setState(state)
        let data = []
        const email = this.state.boxForm.email.value
        const box = this.state.boxForm.box.value
        const rtTicket = this.state.boxForm.rt_ticket.value
        const encKey = this.state.encKeyForm.encKey.value
        this.state.dataSetForm.map((dataset, index) => {
            if(dataset.valid) {
                data.push({
                    email: email,
                    box: box,
                    rt_ticket:rtTicket,
                    accession_id: dataset.value,
                    size_in_tb: this.state.sizeForm[index].value,
                    enc_key: encKey
                })
            }
            return data
        })

        postDownloadBoxLogData(data, state).then( state => {
            this.clearForm(state)
            this.props.dataAdded()
        })
    }

    clearForm = (state) => {
        for (let key in state.boxForm) {
            state.boxForm[key].value = ''
        }
        state.encKeyForm.encKey.value = hash.generate()
        state.dataSetForm = []
        state.sizeForm = []
        this.setState(state)
        this.addDatasetInput()
    }

    render () {
        let inValidArr = []
        const formElementsArray = [];
        for (let key in this.state.boxForm) {
            formElementsArray.push({
                id: key,
                config: this.state.boxForm[key]
            });
            if(!this.state.boxForm[key].valid) {
                inValidArr.push(1)
            }
        }
        const encFormElementsArray = [];
        for (let key in this.state.encKeyForm) {
              encFormElementsArray.push({
                id: key,
                config: this.state.encKeyForm[key]
            });
            if(!this.state.encKeyForm[key].valid) {
                inValidArr.push(1)
            }
        }

        const dataSetFormElementsArray = [];
        if(this.state.dataSetForm.length > 0) {
            this.state.dataSetForm.map( (element,index) => {
                dataSetFormElementsArray.push({
                    id: 'dataset_' + index,
                    config: element
                })
                if(!element.valid) {
                    inValidArr.push(1)
                }
                return inValidArr
            })
        }

        const sizeFormElementsArray = [];
        if(this.state.sizeForm.length > 0) {
            this.state.sizeForm.map( (element,index) => {
                sizeFormElementsArray.push({
                    id: 'size_' + index,
                    config: element
                })
                if(!element.valid) {
                    inValidArr.push(1)
                }
                return inValidArr
            })
        }

        let successMsg = null
        let failureMsg = null
        if(this.state.success) {
            successMsg = <div className="alert alert-success alert-dismissible fade show" role="alert">
                            Data successfuly added!
                         </div>
        }
        if(this.state.failure) {
            failureMsg = <div className="alert alert-danger fade show" role="alert">
                Something went wrong!. Please try again
            </div>
        }

        let availBoxesClassName = this.state.availableBoxes  > 5 ? "btn btn-success btn-sm" : "btn btn-danger btn-sm"
        let form = <form className="form-group row" onSubmit={this.submitHandler}>
                    <div><button type="button" className={availBoxesClassName}>{this.state.availableBoxes} boxes available</button></div>
                    <div className="form-row">
                        {formElementsArray.map((formElement, index) => {
                            let className = "col-3 mt-3"
                            if(index === 0)  {
                                className = "col-6 mt-3"
                            }
                            return <div className={className} key={index}>
                                        <Input
                                            key={formElement.id}
                                            elementType={formElement.config.elementType}
                                            elementConfig={formElement.config.elementConfig}
                                            value={formElement.config.value}
                                            changed={(event) => this.inputChangedHandler(event, formElement.id)}/>
                                        <div className="invalid-feedback">
                                            <span>Please enter a valid value</span>
                                        </div>
                                </div>
                        })}

                        {encFormElementsArray.map((encFormElement, index) => {
                            return <div className="col-8 mt-3 p-1" key={index}>
                                <Input
                                    key={encFormElement.id}
                                    elementType={encFormElement.config.elementType}
                                    elementConfig={encFormElement.config.elementConfig}
                                    value={encFormElement.config.value}
                                />
                                <div className="invalid-feedback">
                                    <span>Please enter a valid value</span>
                                </div>
                            </div>
                        })}

                        <div className="col-8">
                        {dataSetFormElementsArray.map((formElement, index)=> {
                            let actionHandler = null
                            if(index > 0) {
                                actionHandler = <button type="submit" className="btn btn-danger btn-sm" onClick={(e) => this.removeDatasetHandler(e, index)}>Remove Dataset</button>
                            }

                            return <div className="row mt-3" key={index}>
                                    <div className="col-4 p-0">
                                        <Input
                                            key={formElement.id}
                                            elementType={formElement.config.elementType}
                                            elementConfig={formElement.config.elementConfig}
                                            value={formElement.config.value}
                                            changed={(event) => this.datasetInputChangedHandler(event, index)} />
                                        <div className="invalid-feedback">
                                            <span>Please enter a valid Dataset stable ID</span>
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <Input
                                            key={sizeFormElementsArray[index].id}
                                            elementType={sizeFormElementsArray[index].config.elementType}
                                            elementConfig={sizeFormElementsArray[index].config.elementConfig}
                                            value={sizeFormElementsArray[index].config.value}
                                            changed={(event) => this.sizeInputChangedHandler(event, index)}/>
                                    </div>
                                    <div className="col-2" >{actionHandler}</div>
                            </div>
                        })}
                        </div>
                        <div className="col-6 mt-3">
                            <button type="submit" className="btn btn-success btn-sm" onClick={this.addDatasetHandler}>Add Dataset</button>
                        </div>
                    </div>
                    <div className="col-6 mt-3 p-0">
                        <button type="submit" className="btn btn-primary" disabled={inValidArr.includes(1) || this.state.submitDisabled}>Submit</button>
                    </div>
                </form>

        let loading = null
        if(this.state.loading) {
            loading = <div className="col-lg-12 col-md-12 col-sm-12 mt-3 d-flex justify-content-center"><Loading /></div>
        }

        return (
            <div className="container">
                <div className="row mt-3">
                    <div className="col-12"><h2>Download Box Form</h2></div>
                    <div className="col-12">
                        {successMsg}
                        {failureMsg}
                        {loading}
                        {form}
                    </div>
                </div>
            </div>
        )
    }
}

export default DownloadBoxesForm


