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
import React from 'react'
import ebiLogo from '../../../assets/ega-archive/images/ebi.png'
import crgLogo from '../../../assets/ega-archive/images/CRG_blue.jpg'
import elixirLogo from '../../../assets/ega-archive/images/Logo_CDR-mini.png'
const footerHome = () => (
    <div>
        <div className="blue-links links-inline">
            <div className="container">
                <div className="row">
                    <div className="col-md-5 col-sm-4 col-xs-6 nopad-r browse-container">
                        <div className="browse-menu">
                            <p>BROWSE</p>
                            <ul>
                                <li>
                                    <a href="https://ega-archive.org/submission-form.php/studies"><i className="fa fa-folder-open fa-fw"></i><span className="hover-line-white">Studies</span></a>
                                </li>
                                <li>
                                    <a href="https://ega-archive.org/submission-form.phpdatasets"><i className="fa fa-copy fa-fw"></i><span className="hover-line-white">Datasets</span></a>
                                </li>
                                <li>
                                    <a href="https://ega-archive.org/submission-form.php/dacs"><i className="fa fa-map-marker  fa-fw"></i><span className="hover-line-white">DACs</span></a>
                                </li>
                                <li>
                                    <a href="https://ega-archive.org/beacon/"><i className="fa fa-share-square-o fa-fw"></i><span className="hover-line-white">Beacon</span></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-2 col-sm-4 col-xs-12 nopad-r data-container">
                        <div className="data-menu">
                            <p>DATA</p>
                            <ul>
                                <li>
                                    <a href="https://ega-archive.org/submission-form.php"><i className="fa fa-cloud-download fa-fw"></i><br /><span className="hover-line-white">Submit</span></a>
                                </li>
                                <li>
                                    <a href="https://ega-archive.org/access/data-access"><i className="fa fa-key fa-fw"></i><br /><span className="hover-line-white">Access</span></a>
                                </li>
                            </ul>
                            <div className="clearfix"></div>
                        </div>
                    </div>
                    <div className="col-md-5 col-sm-4 col-xs-6 pull-right nopad-r help-container">
                        <div className="help-menu">
                            <p>HELP</p>
                            <ul className="left-footer-links">
                                <li>
                                    <a href="https://ega-archive.org/submission/tools/ftp-aspera"><i className="fa fa-cloud-download fa-fw"></i><span className="hover-line-white">FTP & Aspera</span></a>
                                </li>
                                <li>
                                    <a href="https://ega-archive.org/tools"><i className="fa fa-wrench fa-fw"></i><span className="hover-line-white">Tools</span></a>
                                </li>
                                <li>
                                    <a href="https://ega-archive.org/blog/" target="_blank" rel="noopener noreferrer"><i className="fa fa-pencil fa-fw"></i><span className="hover-line-white">EGA Blog</span></a>
                                </li>
                                <li>
                                    <a href="mailto:ega-helpdesk@ebi.ac.uk"><i className="fa fa-phone fa-fw"></i><span className="hover-line-white">Contact us</span></a>
                                </li>
                                <li>
                                    <a href="https://twitter.com/EGAArchive" target="_blank" rel="noopener noreferrer"><i className="fa fa-twitter fa-fw"></i><span className="hover-line-white">Twitter</span></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="banner-home">
            {/*-- Elixir Banner Starts --*/}
            <div className="col-md-12 col-sm-12 col-xs-12 elixir-banner" >
                <div className="container">
                    <div className="row">
                        <div className="col-md-2 col-sm-2 col-xs-2 elixir-logo" >
                            <a href="https://www.elixir-europe.org/platforms/data/core-data-resources" target="_new"><img alt="Elixir_logo" src={elixirLogo} /></a>
                        </div>
                        <div className="col-md-10 col-sm-10 col-xs-10  elixir-banner-words" >
                            <h5><span>The European Genome-phenome Archive (EGA) is part of the ELIXIR infrastructure.</span></h5>
                            <span>EGA is an Elixir Core Data Resource.<strong><a href="https://www.elixir-europe.org/platforms/data/core-data-resources" target="_new" style={{color:'#666666'}}>  Learn more  ... </a></strong></span>
                        </div>
                    </div>
                </div>
            </div>
            {/*-- Elixir Banner Ends --*/}
            {/*-- Another Banner --*/}
        </div>
        <div className="partners">
            <div className="container">
                <div className="row alert">
                    {/*-- Footer starts --*/}
                    <div className="col-md-12 nopad-l text-center">
                        <ul className="footnote-links">
                            <li>
                                <strong>&copy; COPYRIGHT 2018. EGA CONSORTIUM</strong>
                            </li>
                        </ul>
                        <ul className="footnote-links">
                            <li>
                                <a href="https://ega-archive.org/submission-form.php/about">ABOUT THE EGA</a>
                            </li>
                            <li>
                                <a href="http://www.crg.eu/en/content/about-us/general-information" target="_new">ABOUT THE CRG</a>
                            </li>
                            <li>
                                <a href="http://www.ebi.ac.uk/about" target="_new">ABOUT EMBL-EBI</a>
                            </li>
                            <li>
                                <a href="mailto:ega-helpdesk@ebi.ac.uk">CONTACT US</a>
                            </li>
                            <li>
                                <a href="https://ega-archive.org/submission-form.php/legal-notice">LEGAL NOTICE</a>
                            </li>
                            <li>
                                <a href="https://ega-archive.org/submission-form.php/support">SUPPORT</a>
                            </li>
                        </ul>
                    </div>
                    {/*-- Footer Ends --*/}
                </div>
                <div className="row">
                    <div className="col-md-2 col-md-offset-1 hidden-sm hidden-xs"></div>
                    <div className="col-md-2 col-sm-6 col-xs-6">
                        <a href="http://www.crg.eu/" target="_new">
                            <img className="img-responsive" src={crgLogo} alt="CRG"/>
                        </a>
                    </div>
                    <div className="col-md-1 hidden-sm hidden-xs">&nbsp;</div>
                    <div className="col-md-3 col-sm-6 col-xs-6">
                        <a href="https://www.ebi.ac.uk" target="_new">
                            <img className="img-responsive" src={ebiLogo} alt="EMBl-EBI"/>
                        </a>
                    </div>
                </div>
            </div>
            <br/><br/>
        </div>
    </div>
)

export default footerHome