import React from 'react';
import styles from './patient-page.less';
import {PatientForm} from './patient-form.jsx';
import {Button} from '../button/button.jsx';

import {PatientsApi} from '../../api/patients-api.js';

import * as FontAwesome from 'react-icons/lib/fa'


export class PatientPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            idCount: 0,
            patientList: [],
            selectedPatient: this._getBlankPatient(),
            isNewPatient: true
        };
    }

    componentWillMount() {
        this._getPatients();
    }

    render() {

        return (
            <div className={styles.story}>
                <div className={styles.itemsWrapper}>
                    <h1>Patients</h1>
                    <div className={styles.createButton}>
                        <Button type="primary" text="Create New" onClick={this._onCreate.bind(this)}/>
                    </div>
                    <table>
                        <colgroup>
                            <col className={styles.keyCol}/>
                            <col className={styles.defCol}/>
                            <col className={styles.defCol}/>
                            <col className={styles.defCol}/>
                            <col className={styles.defCol}/>
                            <col className={styles.keyCol}/>
                            <col className={styles.keyCol}/>
                        </colgroup>
                        <thead>
                        <tr>
                            {this._getPatientsHeaders().map((header) => <th key={header}>{header}</th>)}
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.patientList.map((patient) =>
                            <tr key={patient.id.toString()}>
                                <td>{patient.id}</td>
                                <td>{patient.firstName} {patient.lastName}</td>
                                <td>{patient.email}</td>
                                <td>{patient.phone}</td>
                                <td>{patient.bdate}</td>
                                <td>
                                    <Button type="primary" text="" size="small" onClick={this._onEdit.bind(this, patient)}>
                                        <FontAwesome.FaPencil  />
                                    </Button>
                                </td>
                                <td>
                                    <Button type="danger" text="" size="small" onClick={this._onDelete.bind(this, patient)}>
                                        <FontAwesome.FaTrashO />
                                    </Button>
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
                <div className={styles.detailsWrapper}>
                    <PatientForm patient={this.state.selectedPatient}
                                 legend={this._getDetailsLegend()}
                                 onSubmit={this._onDetailsSubmit.bind(this)}/>
                </div>
            </div>
        );
    }

    _getPatientsHeaders() {
        return ["#", "Name", "Email", "Phone", "Birth Date", "Edit", "Delete"];
    }

    _getPatients() {
        let that = this;
        PatientsApi.getAll(function(err, res) {
            let patientList = JSON.parse(res.text);

            that.setState({
                idCount: patientList.length,
                patientList: patientList
            });
        });
    }

    _getBlankPatient() {
        return {
            id: 0,
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            bdate: ""
        };
    }

    _getDetailsLegend() {
        let detailsLegend = "Patient #" + this.state.selectedPatient.id;
        if (this.state.isNewPatient) {
            detailsLegend = "New patient";
        }
        return detailsLegend;
    }

    _onEdit(patient) {
        this.setState({
            isNewPatient: false,
            selectedPatient: patient
        });
    }

    _onEditSubmit(patient) {
        let that = this;
        PatientsApi.update(patient, function(err, res) {
            if(res && res.text) {
                let editedPatient = JSON.parse(res.text);
                that.setState({selectedPatient: editedPatient});
            }

            that._getPatients();
        });
    }

    _onCreate() {
        this.setState({
            isNewPatient: true,
            selectedPatient: this._getBlankPatient()
        })
    }

    _onCreateSubmit(patient) {
        let that = this;
        PatientsApi.create(patient, function(err, res) {
            console.log("err", err);
            console.log("res", res);
            if(res && res.text) {
                let createdPatient = JSON.parse(res.text);
                that.setState({selectedPatient: createdPatient});
            }

            that._getPatients();
        });
    }

    _onDelete(patient) {
        if (confirm('Delete patient #' + patient.id + '?')) {

            if (this.state.selectedPatient === patient) {
                this._onCreate();
            }

            let that = this;
            PatientsApi.remove(patient, function(err, res) {
                console.log("err", err);
                console.log("res", res);
                that._getPatients();
            });

        }
    }

    _onDetailsSubmit(patient) {
        if (this.state.isNewPatient) {
            this._onCreateSubmit(patient);
        } else {
            this._onEditSubmit(patient);
        }
    }

}