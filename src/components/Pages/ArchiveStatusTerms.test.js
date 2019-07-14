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
import React from 'react'
import { configure, shallow, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {ArchiveStatusTerms} from './ArchiveStatusTerms'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
configure({adapter: new Adapter()});

describe('<ArchiveStatusTerms />', () => {
    it('should render no table', () => {
        const wrapper = shallow(<ArchiveStatusTerms archiveStatusTerms={[]}/>);
        expect(wrapper.find(BootstrapTable)).toHaveLength(0);
    });

    it('should set state loading false on ComponentDidMount', () => {
        const wrapper = shallow(<ArchiveStatusTerms archiveStatusTerms={[]} />);
        expect(wrapper.state().loading).toBe(false);
    })

    it('should receive props and render one table ', () => {
        const statusTerms = [{
            archive_status_term_id: -1,
            archive_status: "File repeated and previously archived",
            grouping: "Complete",
            state: "Complete",
            created: "2016-11-14T15:33:47.000Z",
            updated: "2017-11-29T09:28:54.000Z"
            },
            {
                archive_status_term_id: 0,
                archive_status: "Withdrawn",
                grouping: "Complete",
                state: "Complete",
                created: "2016-03-15T09:24:58.000Z",
                updated: "2017-11-29T09:28:54.000Z"
            }];
        const wrapper = mount(<ArchiveStatusTerms archiveStatusTerms={statusTerms}/>);
        expect(wrapper.find(BootstrapTable)).toHaveLength(1);
        expect(wrapper.props().archiveStatusTerms.length).toBe(2)
    })
})
