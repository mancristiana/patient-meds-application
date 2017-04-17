/**
 * Created by mancr on 10-Apr-17.
 */

import React from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'

import classNames from 'classnames/bind';
import styles from './app.less';

import {PatientPage} from './patient/patient-page.jsx';
import {MedicinePage} from './medicine/medicine-page.jsx';
import {HomePage} from './home/home-page.jsx';

export class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isMenuOn: false,
            selectedPatient: null
        }
    }

    render() {
        let cx = classNames.bind(styles);
        return (
            <Router>
                <div>
                    <div className={cx({menuSection: true, on: this.state.isMenuOn})}>
                        Patient Meds App
                        <div className={cx({menuToggle: true, on: this.state.isMenuOn})}
                             onClick={this._onMenuToggle.bind(this)}>
                            <div className={styles.one}></div>
                            <div className={styles.two}></div>
                            <div className={styles.three}></div>
                        </div>
                        <nav onClick={this._onMenuToggle.bind(this)}>
                            <ul role="navigation" className={cx({
                                hidden: !this.state.isMenuOn
                            })}>
                                <li><Link to={'/'}>home</Link></li>
                                <li><Link to={'/patients'}>patients</Link></li>
                                <li><Link to={'/medicine'}>medicine</Link></li>
                            </ul>
                        </nav>
                    </div>
                    <div className={styles.patientSection}>{this._getSelectedPatient()}</div>
                    <Route exact={true} path="/" component={HomePage} />
                    <Route path="/patients" component={() => <PatientPage selectedPatient={this.state.selectedPatient} onSelectedPatientChange={(patient) => this._onSelectedPatientChange.bind(this)(patient)} />}/>
                    <Route path="/medicine" component={() => <MedicinePage selectedPatient={this.state.selectedPatient} />} />
                </div>
            </Router>
        )
    }

    _onMenuToggle() {
        this.setState({
            isMenuOn: !this.state.isMenuOn
        });
    }

    _getSelectedPatient() {
        if(this.state.selectedPatient) {
            return (
                <div>
                    <h1 className={styles.patientName}>{this.state.selectedPatient.firstName} {this.state.selectedPatient.lastName}</h1>
                    <h2 className={styles.patientId}>ID # {this.state.selectedPatient.id}</h2>
                </div>
            );
        } else {
            return (<h1 className={styles.patientName}>No selected patient</h1>);
        }
    }

    _onSelectedPatientChange(patient) {
        console.log("on SELECTED PATIENT", patient);
        this.setState({selectedPatient: patient});
    }
}
