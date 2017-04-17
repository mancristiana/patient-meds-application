import React from 'react';
import request from 'superagent';

import {SearchBar} from '../searchbar/searchbar.jsx';
import {MedicineList} from './medicine-list.jsx';

import * as FontAwesome from 'react-icons/lib/fa'
import styles from './medicine-page.less';


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
            <div className={styles.wrap}>
                <h1><FontAwesome.FaSearch /> Search for medicine</h1>
                <SearchBar placeholder="Search..." onTermChange={(term) => this._onTermChange.bind(this)(term)}/>
                <MedicineList meds={this.state.meds} selectedPatient={this.props.selectedPatient} />
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