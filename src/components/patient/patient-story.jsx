import React from 'react';
import styles from './patient-story.less';
import myData from './patients.json';
import {PatientForm} from './patient-form.jsx';
import {Button} from '../button/button.jsx';

import * as FontAwesome from 'react-icons/lib/fa'


export class PatientStory extends React.Component {

    constructor() {
        super();

        let patientList = this._getPatients();

        this.state = {
            idCount: patientList.length,
            patientList: patientList,
            selectedPatient: patientList[0],
            isNewPatient: false
        };
    }

    render() {
        let colHeaders = [];
        let detailsLegend = "Patient #" + this.state.selectedPatient.id;
        if(this.state.isNewPatient) {
            detailsLegend = "New patient";
        }
        return (
            <div className={styles.story}>
                <div className={styles.itemsWrapper}>
                    <h1>Patients</h1>
                    <div>
                        <Button type="primary" text="Create New" onClick={this._onCreateNew.bind(this)} />
                    </div>
                    <table>
                        <colgroup>
                            <col className={styles.keyCol} />
                            <col className={styles.defCol} />
                            <col className={styles.defCol} />
                            <col className={styles.defCol} />
                            <col className={styles.defCol} />
                            <col className={styles.keyCol} />
                            <col className={styles.keyCol} />
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
                                <td className={styles.editCol} onClick={this._handlePatientItemClick.bind(this, patient)}>
                                    <FontAwesome.FaPencil  />
                                </td>
                                <td className={styles.deleteCol} onClick={this._onDelete.bind(this, patient)}>
                                    <FontAwesome.FaTrashO />
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
                <div className={styles.detailsWrapper}>
                    <PatientForm patient={this.state.selectedPatient}
                                 legend={detailsLegend}
                                 onSubmit={this._onDetailsSubmit.bind(this)} />
                </div>
            </div>
        );
    }

    _getPatientsHeaders() {
        return ["#", "Name", "Email", "Phone", "Birth Date", "Edit", "Delete"];
    }

    _getPatients() {
        return myData;
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

    _handlePatientItemClick(patient) {
        this.setState({
            isNewPatient: false,
            selectedPatient: patient
        });
        console.log("patient selected", patient);
    }

    _onCreateNew() {
        this.setState({
            isNewPatient: true,
            selectedPatient: this._getBlankPatient()
        })
    }

    _onDelete(patient) {
        if(confirm('Delete the item?')) {
            console.log("Patient " + patient.firstName + " deleted");
            if(this.state.selectedPatient === patient) {
                console.log("SELECTED IS DELETED");
                this._onCreateNew();
            }

            let updatedPatientList = this.state.patientList.slice();
            console.log("PATENT LIST", updatedPatientList);
            let foundIndex = updatedPatientList.findIndex((p) => {return p.id === patient.id});

            console.log("FOUND INDEX", foundIndex, updatedPatientList[foundIndex]);
            updatedPatientList.splice(foundIndex, 1);
            console.log("LIST AFTER SLICE", updatedPatientList);

            this.setState({
                patientList: updatedPatientList
            });

        }
    }

    _onDetailsSubmit(patient) {
        if(this.state.isNewPatient) {
            this._onCreateSubmit(patient);
        } else {
            this._onEditSubmit(patient);
        }
    }

    _onCreateSubmit(patient) {
        patient.id = this.state.idCount + 1;
        let updatedPatientList = this.state.patientList.slice();
        updatedPatientList.push(patient);
        this.setState({
            idCount: this.state.idCount + 1,
            patientList: updatedPatientList
        });

    }

    _onEditSubmit(patient) {
        console.log("onEdit", patient);
        let updatedPatientList = this.state.patientList.slice();
        let foundIndex = updatedPatientList.findIndex((p) => {return p.id === patient.id});
        console.log("Patient to edit", updatedPatientList[foundIndex]);
        updatedPatientList[foundIndex] = patient;
        console.log("updatedPatientList", updatedPatientList);
        this.setState({
            patientList: updatedPatientList
        });

    }
}