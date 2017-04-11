import React from 'react';
import styles from './patient-story.less';

export class PatientStory extends React.Component {

    _getPatientsHeaders() {
        return ["#", "First Name", "Last Name", "Email", "Phone", "Birth Date"];
    }

    _getPatients() {
        return [
            {
                id: 1,
                firstName: "Superman",
                lastName: "Man",
                email: "mail1@smth.com",
                phone: "12345678",
                bdate: "25/09/95"
            },
            {
                id: 2,
                firstName: "Batman",
                lastName: "Man",
                email: "mail2@smth.com",
                phone: "12345678",
                bdate: "25/09/91"
            },
            {
                id: 3,
                firstName: "Cristiana",
                lastName: "Man",
                email: "mail3@smth.com",
                phone: "12345678",
                bdate: "25/09/90"
            },
            {
                id: 4,
                firstName: "Sansa",
                lastName: "Stark",
                email: "mail4@smth.com",
                phone: "12345678",
                bdate: "25/01/71"
            },
            {id: 5, firstName: "John", lastName: "Snow", email: "mail53@smth.com", phone: "12345678", bdate: "22/09/05"}
        ];
    }

    render() {
        let colHeaders = [];
        return (
            <div>
                <h1>Patients</h1>

                <table className="table">
                    <thead>
                    <tr>
                        {this._getPatientsHeaders().map((header) => <th key={header}>{header}</th>)}
                    </tr>
                    </thead>
                    <tbody>
                    {this._getPatients().map((patient) =>
                        <tr key={patient.id.toString()}>
                            <td>{patient.id}</td>
                            <td>{patient.firstName}</td>
                            <td>{patient.lastName}</td>
                            <td>{patient.email}</td>
                            <td>{patient.phone}</td>
                            <td>{patient.bdate}</td>
                        </tr>
                    )}
                    </tbody>
                </table>

            </div>
        );
    }
}