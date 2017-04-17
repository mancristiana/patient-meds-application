import React from 'react';
import styles from './patient-page.less';
import {SearchBar} from '../searchbar/searchbar.jsx';
import {Button} from '../button/button.jsx';
import {Form} from '../form/form.jsx';

import {PatientsApi} from '../../api/patients-api.js';

import * as FontAwesome from 'react-icons/lib/fa'


export class PatientPage extends React.Component {

    constructor(props) {
        super(props);

        let isNewPatient = (this.props.selectedPatient) ? false : true;
        this.state = {
            patientList: [],
            selectedPatient: this.props.selectedPatient || this._getBlankPatient(),
            isNewPatient: isNewPatient
        };
    }

    componentDidMount() {
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
                    <SearchBar placeholder="Search through patients"
                               onTermChange={(term) => this._onSearch.bind(this)(term)}/>

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
                                    <Button type="primary" text="" size="small"
                                            onClick={this._onEdit.bind(this, patient)}>
                                        <FontAwesome.FaPencil  />
                                    </Button>
                                </td>
                                <td>
                                    <Button type="danger" text="" size="small"
                                            onClick={this._onDelete.bind(this, patient)}>
                                        <FontAwesome.FaTrashO />
                                    </Button>
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
                <div className={styles.detailsWrapper}>
                    {this.state.selectedPatient.meds.length > 0 &&
                    <div>
                        <h2 className={styles.headers}>Medicine</h2>
                        <p className={styles.meds}>
                            {this.state.selectedPatient.meds.map((med) => <h3 key={med.medName}>{med.medName}</h3>)}
                        </p>
                    </div>
                    }

                    <h2 className={styles.headers}>{this._getDetailsLegend()}</h2>
                    <Form fields={this._getPatientFormFields()}
                                 onSubmit={this._onDetailsSubmit.bind(this)}/>

                </div>
            </div>
        );
    }

    _getPatientFormFields() {
        let patient = this.state.selectedPatient;
        return [
            {
                "name": "firstName",
                "type": "text",
                "label": "First Name",
                "value": patient.firstName || ""
            },
            {
                "name": "lastName",
                "type": "text",
                "label": "Last Name",
                "value": patient.lastName || ""
            },
            {
                "name": "phone",
                "type": "number",
                "label": "Phone",
                "value": patient.phone || ""
            },
            {
                "name": "email",
                "type": "text",
                "label": "Email",
                "value": patient.email || ""
            },
            {
                "name": "bdate",
                "type": "date",
                "label": "Date of Birth",
                "value": patient.bdate || ""
            }
        ]
    }

    _getPatientsHeaders() {
        return ["#", "Name", "Email", "Phone", "DOB", "Select", "Delete"];
    }

    _getPatients() {
        let that = this;
        PatientsApi.getAll(function (err, res) {
            let patientList = JSON.parse(res.text);

            that.setState({
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
            phone: 0,
            bdate: "",
            meds: []
        };
    }

    _getDetailsLegend() {
        let detailsLegend = "Details";
        if (this.state.isNewPatient) {
            detailsLegend = "New patient";
        }
        return detailsLegend;
    }

    _onEdit(patient) {
        this.props.onSelectedPatientChange(patient);
    }

    _onEditSubmit(patient) {
        let that = this;
        PatientsApi.update(patient, function (err, res) {
            if (res && res.text) {
                let editedPatient = JSON.parse(res.text);
                that.setState({selectedPatient: editedPatient});
            }

            that._getPatients();
            this.props.onSelectedPatientChange(patient);
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
        PatientsApi.create(patient, function (err, res) {
            console.log("err", err);
            console.log("res", res);
            if (res && res.text) {
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
            PatientsApi.remove(patient, function (err, res) {
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

    _onSearch(term) {
        let that = this;
        if (term) {
            console.log("term", term);
            PatientsApi.search(term, function (err, res) {
                console.log("SEARCH res", res);
                let patientList = JSON.parse(res.text);
                that.setState({
                    patientList: patientList
                });
            });
        } else {
            this._getPatients();
        }

    }

}