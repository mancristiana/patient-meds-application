import React from 'react';

import {SearchBar} from '../searchbar/searchbar.jsx';
import {MedicineList} from './medicine-list.jsx';
import {Loading} from '../loading/loading.jsx';


import * as FontAwesome from 'react-icons/lib/fa'
import styles from './medicine-page.less';
import {MedicineApi} from "../../api/medicine-api";


export class MedicinePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            meds: [],
            isLoading: false
        }
    }

    render() {
        return (
            <div className={styles.wrap}>
                <h1><FontAwesome.FaSearch /> Search for medicine</h1>
                <div className={styles.searchbar}>
                    <SearchBar placeholder="Search..." onTermChange={(term) => this.onTermChange.bind(this)(term)}/>
                </div>
                {this.state.isLoading &&
                <Loading />
                }
                <MedicineList meds={this.state.meds} selectedPatient={this.props.selectedPatient}/>
            </div>
        );
    }

    onTermChange(term) {
        if (term) {
            this.setState({
                isLoading: true
            });
            console.log("TERM", term);
            console.log("ON TERM CHANGE STATE", this.state);

            let that = this;
            MedicineApi.search(term, function (err, res) {

                let meds = res.body;
                that.setState({
                    meds: meds,
                    isLoading: false
                });


            });

        } else {
            this.setState({meds: []});
        }

    }
}