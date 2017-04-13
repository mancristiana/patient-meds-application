import React from 'react';
import styles from './patient-story.less';
import myData from './patients.json';
import {PatientForm} from './patient-form.jsx';


export class PatientStory extends React.Component {

    constructor() {
        super();

        this.state = {
            isSelectedPatient: true,
            selectedPatient: this._getPatients()[0]
        };
    }

    render() {
        let colHeaders = [];
        let patientForm;
        if (this.state.isSelectedPatient) {
            patientForm = <PatientForm patient={this.state.selectedPatient}/>
        }

        return (
            <div className={styles.story}>
                <div className={styles.itemsWrapper}>
                    <h1>Patients</h1>

                    <table className="table">
                        <colgroup>
                            <col className={styles.keyCol} />
                            <col className={styles.defCol} />
                            <col className={styles.defCol} />
                            <col className={styles.defCol} />
                            <col className={styles.defCol} />
                        </colgroup>
                        <thead>
                        <tr>
                            {this._getPatientsHeaders().map((header) => <th key={header}>{header}</th>)}
                        </tr>
                        </thead>
                        <tbody>
                        {this._getPatients().map((patient) =>
                            <tr key={patient.id.toString()} onClick={this._handlePatientItemClick.bind(this, patient)}>
                                <td>{patient.id}</td>
                                <td>{patient.firstName} {patient.lastName}</td>
                                <td>{patient.email}</td>
                                <td>{patient.phone}</td>
                                <td>{patient.bdate}</td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
                <div className={styles.detailsWrapper}>
                    {patientForm}
                </div>
            </div>
        );
    }

    _getPatientsHeaders() {
        return ["#", "Name", "Email", "Phone", "Birth Date"];
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
            isSelectedPatient: true,
            selectedPatient: patient
        });
        console.log("patient selected", patient);
    }
}