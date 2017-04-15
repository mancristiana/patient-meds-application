import React from 'react';
import request from 'superagent';

import {SearchBar} from './search-bar.jsx';
import {MedicineList} from './medicine-list.jsx';

export class MedicinePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            meds: [],
            x: ""
        }
    }

    render() {
        return (
            <div>
                <SearchBar onTermChange={(term) => this._onTermChange.bind(this)(term)}/>
                <MedicineList meds={this.state.meds}/>
            </div>
        );
    }

    _onTermChange(term) {
        console.log(term);
        console.log("ON TERM CHANGE");

        let that = this;

        if (term) {
            console.log("TERM CHANGE", term);
            const url = `https://fest-searcher.herokuapp.com/api/fest/s/${term}`;


            request.get(url, function (err, res) {
                that.setState({meds: res.body});
                console.log("STATE", that.state.meds);
            });
        } else {
            this.setState({meds: []});
            console.log("NO TERM", this.state.meds);
        }

    }
}