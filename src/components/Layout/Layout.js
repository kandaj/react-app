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

import Aux from '../../hoc/Aux';
import Header from '../UI/Header/Header'
import FooterHome from '../UI/Footer/FooterHome'
import Footer from '../UI/Footer/Footer'
import NavigationMenu from '../NavigationMenu/NavigationMenu'
import Home from '../Pages/Home'
import ArchiveStatusTerms from '../Pages/ArchiveStatusTerms'
import asyncComponent from '../../hoc/asyncComponent'
import {Route,Switch,withRouter} from 'react-router-dom'

const AsyncListStatusFiles = asyncComponent( () => {
    return import('../ArchiveStatus/Files/ListStatusFiles')
})

const AsyncFileInfoForm = asyncComponent( () => {
    return import('../ArchiveStatus/Files/FileInfoForm')
})

const AsyncDownloadVolumeContainer = asyncComponent( () => {
    return import('../DownloaderStats/Volume/Stats/DownloaderVolumeContainer')
})

const AsyncDownloadSuccessContainer = asyncComponent( () => {
    return import('../DownloaderStats/Success/Stats/DownloaderSuccessContainer')
})

const AsyncUserStatsForm = asyncComponent( () => {
    return import('../DownloaderStats/UserStats/UserForm')
})

const AsyncArchiveVolumeStats = asyncComponent( () => {
    return import('../ArchiveVolume/Stats/ArchiveVolumeStatsContainer')
})

const AsyncDownloadBoxesStatsContainer = asyncComponent( () => {
    return import('../DownloadBoxes/Stats/DownloadBoxesStatsContainer')
})

const AsyncDownloadBoxesListContainer = asyncComponent( () => {
    return import('../DownloadBoxes/List/DownloadBoxesListContainer')
})



class Layout extends Component {

    render () {
        const footer = this.props.location.pathname === '/' ? <FooterHome /> : <Footer />
        return (
            <Aux>
                <Header/>
                <NavigationMenu/>
                <div className="main">
                    <div className="container">
                        <main>
                            {this.props.children}
                            <Route path="/" exact component={Home} />
                            <Route path="/archive-status/terms" exact component={ArchiveStatusTerms} />
                            <Route path="/archive-status/files/:id"  exact component={AsyncListStatusFiles} />
                            <Route path="/downloader-stats/volume"  exact component={AsyncDownloadVolumeContainer} />
                            <Route path="/downloader-stats/success"  exact component={AsyncDownloadSuccessContainer} />
                            <Route path="/archive-volume"  exact component={AsyncArchiveVolumeStats} />
                            <Route path="/download-boxes/form"  exact component={AsyncDownloadBoxesStatsContainer} />
                            <Route path="/download-boxes/list"  exact component={AsyncDownloadBoxesListContainer} />
                            <Switch>
                                <Route path="/file-details" component={AsyncFileInfoForm} />
                                <Route path="/downloader-stats/user/success" component={AsyncUserStatsForm} />
                            </Switch>
                        </main>
                    </div>
                </div>
                {footer}
            </Aux>
        )
    }
}

export default withRouter(Layout);