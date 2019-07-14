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
import UserDownloadStatsContainer from './UserDownloadStatsContainer'
import Input from '../../UI/Input/Input'

class UserInfoForm extends Component {
    state = {
        userForm : {
            email : {
                elementType: 'input',
                elementConfig: {
                    type:'email',
                    className:'form-control',
                    placeholder:'Enter valid email address',
                    required:true
                },
                value: ''

            }
        }
    }

    componentDidMount = () => {
        let paramsArray = this.props.location.pathname.split('/')
        const state = {...this.state}
        if (paramsArray.length >= 4) {
            state.userForm.email.value = paramsArray[4] || ''
            this.setState(state)
        }
    }

    inputChangedHandler = (event) => {
        const state = {...this.state}
        state.userForm.email.value = event.target.value;
        this.setState(state);
    }

    showUserStatsHandler = (e) => {
        e.preventDefault();
        const userEmail = this.state.userForm.email.value
        if(userEmail) {
            this.props.history.push({pathname:`/downloader-stats/user/success/${userEmail}`})
        }
    }


    render () {

        const userStatsContainer = (
            <div className="row mt-3">
                 <Route path={this.props.match.url + '/:email'} component={UserDownloadStatsContainer}/>
             </div>
        )

        const formElement = {
            id: 'email',
            config: this.state.userForm.email
        }


        let form = (
            <form  className="form-group row" onSubmit={this.showUserStatsHandler}>
                <div className="col-10">
                        <Input
                            key={formElement.id}
                            elementType={formElement.config.elementType}
                            elementConfig={formElement.config.elementConfig}
                            value={formElement.config.value}
                            changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                </div>
                <div className="col-2">
                    <button type="submit" className="btn btn-primary">Get Detail</button>
                </div>
            </form>
        );

        return (
            <div className="container">
                <div className="row justify-content-center mt-4">
                    <div className="col-10">
                        {form}
                    </div>
                </div>
                {userStatsContainer}
            </div>

        )
    }
}

export default UserInfoForm