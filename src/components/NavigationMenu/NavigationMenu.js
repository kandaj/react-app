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
import {NavLink, withRouter} from 'react-router-dom'

class NavigationMenu extends Component {
    constructor(props) {
        super(props);
        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            collapsed: true,
        };
    }
    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }
    render () {
        const downBoxesClass =  this.props.location.pathname.includes('/download-boxes/') ? 'dropdown current-nav-link-parent' : 'dropdown'
        const downStatsClass =  this.props.location.pathname.includes('/downloader-stats/') ? 'dropdown current-nav-link-parent' : 'dropdown'
        const collapsed = this.state.collapsed;
        const classOne = collapsed ? 'collapse navbar-collapse' : 'collapse navbar-collapse show';
        const classTwo = collapsed ? 'navbar-toggler navbar-toggler-right collapsed' : 'navbar-toggler navbar-toggler-right';

        return (
            <nav className="navbar navbar-expand-lg navbar-light navbar-primary">
                <div className="container">
                    <button onClick={this.toggleNavbar} className={`${classTwo}`} type="button" data-toggle="collapse" data-target="#navbarCollapse">
                        <span className="navbar-toggler-icon"></span>
                        <span>&nbsp; Menu</span>
                    </button>
                    <div className={`${classOne}`} id="navbarCollapse">
                        <ul className="nav navbar-nav navbar-left">
                            <li className="nav-item"><NavLink className="nav-link" to="/" exact>Home</NavLink></li>
                            <li className="nav-item"><NavLink className="nav-link" to="/archive-status/terms" exact>Archive Status Terms</NavLink></li>
                            <li className="nav-item"><NavLink className="nav-link" to="/file-details">File Details</NavLink></li>
                            <li className={downBoxesClass}>Download Box
                                <ul className="dropdown-menu">
                                    <li className="nav-item"><NavLink className="nav-link" to="/download-boxes/form">Log Form</NavLink></li>
                                    <li className="nav-item"><NavLink className="nav-link" to="/download-boxes/list">Boxes List</NavLink></li>
                                </ul>
                            </li>
                            &nbsp;
                            <li className={downStatsClass}>Downloader
                                <ul className="dropdown-menu">
                                    <li className="nav-item"><NavLink className="nav-link" to="/downloader-stats/volume">Volume Stats</NavLink></li>
                                    <li className="nav-item"><NavLink className="nav-link" to="/downloader-stats/success">Success Stats</NavLink></li>
                                    <li className="nav-item"><NavLink className="nav-link" to="/downloader-stats/user/success">User Stats</NavLink></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}


export default withRouter(NavigationMenu)