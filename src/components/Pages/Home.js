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
import React, { Component } from 'react';
import { connect } from 'react-redux'
import Aux from '../../hoc/Aux'
import StatusGraph from '../ArchiveStatus/Status/StatusGraph'
import VolumeGraph from '../ArchiveVolume/Stats/ArchiveVolumeGraph'
import { getArchiveStatusData } from '../ArchiveStatus/Data/ArchiveStatusData';
import { getRecentDailyArchiveVolumeData } from '../ArchiveVolume/Data/ArchiveVolumeData';
import WithLoading from '../../hoc/WithLoading';
import Loading from '../UI/Loading/Loading'

const StatusGraphWL = WithLoading(StatusGraph)
const VolumeGraphWL = WithLoading(VolumeGraph)

class Home extends Component {

    state = {
        countData: null,
        errStatesRowLength: null,
        error: null,
        statusID:null,
        sortedData: null,
        manualErrorStates: null,
        errorStates: null,
        processingStates: null,
        volumeData:null,
        volumeChartData: {
            archiveVolume: [],
            queuedVolume: [],
            pendingVolume: [],
            dates:[]
        },
        loading: true
    }


    componentDidMount = () => {
        getArchiveStatusData(this.state).then(data => {
            this.setState({data})
            getRecentDailyArchiveVolumeData(this.state).then(data => {
                data.loading = false
                data.errStatesRowLength = (12/this.getStatuslength(data))
                this.setState({data})

            })
        })
    }

    getStatuslength = (data) => {
        const errArray  = ['errorStates', 'processingStates', 'manualErrorStates']
        let length = 0
        Object.keys(data).forEach(function (item) {
            if(errArray.includes(item)) {
                length += data[item].length > 0 ? 1 : 0
            }
        });
        return length
    }

    showArchiveVolumeHandler = () => {
        this.props.history.push({pathname:`/archive-volume`})
    }

    redirect = (url) => {
        this.props.history.push(url)
    }

    render () {
        let errorChart = null
        let manualErrorChart = null
        let processingChart = null
        let volumeChart = null
        let rowClass = null
        let loading = null

        if(this.state.loading) {
            loading = <div className="col-lg-12 col-md-12 col-sm-12 mt-3 d-flex justify-content-center"><Loading /></div>
        }

        if(this.state.errStatesRowLength){
            rowClass = `col-lg-${this.state.errStatesRowLength} col-md-${this.state.errStatesRowLength} col-sm-12`
        }

        if( this.state.manualErrorStates && this.state.manualErrorStates.length > 0) {
            manualErrorChart =  <div className={rowClass}><StatusGraphWL isLoading={this.state.loading} data={this.state.manualErrorStates} statusTerms={this.props.archiveStatusTerms} redirect={(url) => this.redirect(url)}><div className="col-12 d-flex justify-content-center"><button className="btn btn-outline-danger btn-md">Submission Error states</button></div></StatusGraphWL></div>
        }

        if(this.state.errorStates &&  this.state.errorStates.length > 0) {
            errorChart =  <div className={rowClass}><StatusGraphWL isLoading={this.state.loading} data={this.state.errorStates} statusTerms={this.props.archiveStatusTerms} redirect={(url) => this.redirect(url)}><div className="col-12 d-flex justify-content-center"><button className="btn btn-outline-danger btn-md">Error states</button></div></StatusGraphWL></div>
        }

        if(this.state.processingStates &&  this.state.processingStates.length > 0) {
            processingChart =  <div className={rowClass}><StatusGraphWL isLoading={this.state.loading} data={this.state.processingStates} statusTerms={this.props.archiveStatusTerms} redirect={(url) => this.redirect(url)}><div className="col-12 d-flex justify-content-center"><button className="btn btn-outline-warning btn-md">Processing states</button></div></StatusGraphWL></div>
        }

        if(this.state.volumeChartData.dates.length) {
            volumeChart =  <Aux>
                <div className="col-12 d-flex justify-content-center">
                    <button className="btn btn-outline-info btn-md">Last five days Archive Volume</button>&nbsp;&nbsp;
                    <button className="btn btn-info btn-md" onClick={() => this.showArchiveVolumeHandler()}>Click for more info</button>
                </div>
                <VolumeGraphWL isLoading={this.state.loading} data={this.state.volumeChartData} />
            </Aux>
        }


        return (

            <Aux>
                <div className="row mt-3">
                    {loading}
                    {manualErrorChart}
                    {errorChart}
                    {processingChart}
                </div>
                <div className="row mt-3">
                    <div className="col-12">
                        {volumeChart}
                    </div>
                </div>
            </Aux>

        );
    }
}

const mapStateToProps = state => {
    return {
        archiveStatusTerms: state.archiveStatusTerms
    }
}

export default connect(mapStateToProps)(Home)