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
import './App.css';
import Layout from './components/Layout/Layout';
import {BrowserRouter} from 'react-router-dom';
import {connect} from 'react-redux'
import * as actions from './store/actions/actions'

class App extends Component {
    componentDidMount = () => {
        this.props.getStatusTerms()
    }

    render() {
        return (
            <BrowserRouter>
                <Layout/>
            </BrowserRouter>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getStatusTerms: () => dispatch(actions.setStatusTerms())
    }
}

export default connect(null, mapDispatchToProps)(App);
