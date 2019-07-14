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
import DatePicker from 'react-datepicker'
import moment from 'moment'

class DateRangeForm extends Component {
    state = {
        startDate: moment(this.props.defaultDates.startDate, 'YYYYMMDD'),
        endDate: moment(this.props.defaultDates.endDate, 'YYYYMMDD')
    }
    handleChangeStart = (date) => {
        const state = {...this.state}
        state.startDate = date
        this.setState(state)
    }

    handleChangeEnd = (date) => {
        const state = {...this.state}
        state.endDate = date
        this.setState(state)
    }

    onSearch = () => {
        this.props.clicked(this.state)
    }

    render () {
        const dateFormat = 'DD/MM/YYYY'
        let btnClass = 'btn btn-primary btn-sm disabled'
        if (this.state.startDate && this.state.endDate ) {
            btnClass = 'btn btn-primary btn-sm active'
        }
        return (
            <div className="container">
                <div className="row mt-3">
                    <div className="col-2"></div>
                    <form className="form-inline">
                            <DatePicker
                                id="startDate"
                                dateFormat={dateFormat}
                                placeholderText="Start Date"
                                selected={this.state.startDate}
                                startDate={this.state.startDate}
                                endDate={this.state.endDate}
                                onChange={this.handleChangeStart}
                            />&nbsp;
                            <DatePicker
                                id="endDate"
                                dateFormat={dateFormat}
                                placeholderText="End Date"
                                selected={this.state.endDate}
                                selectsEnd
                                startDate={this.state.startDate}
                                endDate={this.state.endDate}
                                onChange={this.handleChangeEnd}
                            />
                    </form>
                    <div className="col-2">
                        <button type="submit" className={btnClass} onClick={this.onSearch}>Search</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default DateRangeForm
