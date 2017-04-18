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
                             onClick={this.onMenuToggle.bind(this)}>
                            <div className={styles.one}></div>
                            <div className={styles.two}></div>
                            <div className={styles.three}></div>
                        </div>
                        <nav onClick={this.onMenuToggle.bind(this)}>
                            <ul role="navigation" className={cx({
                                hidden: !this.state.isMenuOn
                            })}>
                                <li><Link to={'/home'}>home</Link></li>
                                <li><Link to={'/'}>patients</Link></li>
                                <li><Link to={'/medicine'}>medicine</Link></li>
                            </ul>
                        </nav>
                    </div>
                    <div className={styles.headerSection}>
                        {this.getPageHeader()}
                        {this.getSelectedPatient()}
                    </div>
                    <div className={styles.bodySection}>
                        <Route path="/home" component={HomePage}/>
                        <Route exact={true} path="/"
                               component={() => <PatientPage selectedPatient={this.state.selectedPatient}
                                                             onSelectedPatientChange={(patient) => this.onSelectedPatientChange.bind(this)(patient)}/>}/>
                        <Route path="/medicine"
                               component={() => <MedicinePage selectedPatient={this.state.selectedPatient}/>}/>
                    </div>
                </div>
            </Router>
        )
    }

    onMenuToggle() {
        this.setState({
            isMenuOn: !this.state.isMenuOn
        });
    }

    getPageHeader() {
        let header;
        switch (window.location.pathname) {
            case '/medicine':
                header = "Medicine";
                break;
            case '/home' :
                header = "Home";
                break;
            default:
                header = "Patients";
        }

        return (
            <div className={styles.titleSection}>
                <h1>{header}</h1>
            </div>
        );
    }

    getSelectedPatient() {
        if (this.state.selectedPatient) {
            return (
                <div className={styles.patientSection}>
                    <h1 className={styles.patientName}>{this.state.selectedPatient.firstName} {this.state.selectedPatient.lastName}</h1>
                    <h2 className={styles.patientId}>ID # {this.state.selectedPatient.id}</h2>
                </div>
            );
        } else {
            return (
                <div className={styles.patientSection}>
                    <h1 className={styles.patientName}>No selected patient</h1>
                </div>);
        }
    }

    onSelectedPatientChange(patient) {
        this.setState({selectedPatient: patient});
    }
}
