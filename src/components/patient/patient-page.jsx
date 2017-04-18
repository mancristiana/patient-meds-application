import React from 'react';

import styles from './patient-page.less';


import {SearchBar} from '../searchbar/searchbar.jsx';
import {Button} from '../button/button.jsx';
import {Form} from '../form/form.jsx';
import {Table} from '../table/table.jsx';

import {PatientsApi} from '../../api/patients-api.js';


export class PatientPage extends React.Component {

    constructor(props) {
        super(props);

        let isNewPatient = (this.props.selectedPatient) ? false : true;
        let selectedPatient = this.props.selectedPatient || PatientsApi.getBlank();
        this.state = {
            patientList: [],
            selectedPatient: selectedPatient,
            isNewPatient: isNewPatient
        };
    }

    componentDidMount() {
        this.getPatients();
    }

    render() {

        return (
            <div className={styles.story}>
                <div className={styles.itemsWrapper}>
                    <div className={styles.toolbar}>

                        <div className={styles.createButton}>
                            <Button type="primary" text="Create New" onClick={this.onCreate.bind(this)}/>
                        </div>

                        <div className={styles.search}>
                            <SearchBar placeholder="Search..."
                                       onTermChange={(term) => this.onSearch.bind(this)(term)}/>
                        </div>
                    </div>
                    <Table
                        cols={this.getPatientTableCols()}
                        rows={this.state.patientList}
                        onEdit={(row) => this.onEdit.bind(this, row)}
                        onDelete={(row) => this.onDelete.bind(this, row)}/>

                </div>

                <div className={styles.detailsWrapper}>
                    {this.state.selectedPatient.meds.length > 0 &&
                    <div>
                        <h2 className={styles.headers}>Medicine</h2>
                        <ul className={styles.meds}>
                            {this.state.selectedPatient.meds.map((med, index) => <li key={index}>{med.medName}</li>)}
                        </ul>
                    </div>
                    }

                    <h2 className={styles.headers}>{this.getDetailsLegend()}</h2>
                    <Form fields={this.getPatientFormFields()}
                          onSubmit={this.onDetailsSubmit.bind(this)}/>

                </div>
            </div>
        );
    }

    getPatientFormFields() {
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

    getPatientTableCols() {
        return [
            {name: "id", header: "#", size: "10%"},
            {name: "firstName", header: "First Name"},
            {name: "email", header: "Email"},
            {name: "phone", header: "Phone"},
            {name: "bdate", header: "DOB"},
            {name: "edit", header: "Select", size: "10%"},
            {name: "delete", header: "Delete", size: "10%"}
        ]
    }

    getPatients() {
        let that = this;
        PatientsApi.getAll(function (err, res) {
            let patientList = JSON.parse(res.text);

            that.setState({
                patientList: patientList
            });
        });
    }

    getDetailsLegend() {
        let detailsLegend = "Edit details";
        if (this.state.isNewPatient) {
            detailsLegend = "New patient";
        }
        return detailsLegend;
    }

    onEdit(patient) {
        this.props.onSelectedPatientChange(patient);
    }

    onEditSubmit(patient) {
        let that = this;
        PatientsApi.update(patient, function (err, res) {
            if (res && res.text) {
                let editedPatient = JSON.parse(res.text);
                that.setState({selectedPatient: editedPatient});
            }

            that.getPatients();
            this.props.onSelectedPatientChange(patient);
        });
    }

    onCreate() {
        this.setState({
            isNewPatient: true,
            selectedPatient: PatientsApi.getBlank()
        })
    }

    onCreateSubmit(patient) {
        let that = this;
        PatientsApi.create(patient, function (err, res) {
            if (res && res.text) {
                let createdPatient = JSON.parse(res.text);
                that.setState({selectedPatient: createdPatient});
            }

            that.getPatients();
        });
    }

    onDelete(patient) {
        if (confirm('Delete patient #' + patient.id + '?')) {

            if (this.state.selectedPatient === patient) {
                this.onCreate();
            }

            let that = this;
            PatientsApi.remove(patient, function (err, res) {
                that.getPatients();
            });

        }
    }

    onDetailsSubmit(patient) {
        if (this.state.isNewPatient) {
            this.onCreateSubmit(patient);
        } else {
            this.onEditSubmit(patient);
        }
    }

    onSearch(term) {
        let that = this;
        if (term) {
            PatientsApi.search(term, function (err, res) {
                let patientList = JSON.parse(res.text);
                that.setState({
                    patientList: patientList
                });
            });
        } else {
            this.getPatients();
        }

    }

}