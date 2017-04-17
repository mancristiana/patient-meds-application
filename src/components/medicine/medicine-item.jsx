import React from 'react';
import styles from './medicine-item.less';
import {Button} from '../button/button.jsx';
import {PatientsApi} from "../../api/patients-api";

export class MedicineItem extends React.Component {
    render() {
        return (
            <div className={styles.item}>
                <h3>{this.props.med.productName}</h3>
                <h4>{this.props.med.id}</h4>
                <p>
                    <dl>
                        <dt>typeName</dt>
                        <dd>{this.props.med.typeName} </dd>
                        <dt>typeId</dt>
                        <dd>{this.props.med.typeId} </dd>
                        <dt>atcId</dt>
                        <dd>{this.props.med.atcId} </dd>
                        <dt>atcCatName</dt>
                        <dd>{this.props.med.atcCatName} </dd>
                        <dt>atcName</dt>
                        <dd>{this.props.med.atcName} </dd>
                        <dt>substanceName</dt>
                        <dd>{this.props.med.substanceName} </dd>
                        <dt>form</dt>
                        <dd>{this.props.med.form} </dd>
                        <dt>strength</dt>
                        <dd>{this.props.med.strength} </dd>
                        <dt>units</dt>
                        <dd>{this.props.med.units} </dd>
                        {/*//<dt>packages</dt> <dd>{this.props.med.packages} </dd>*/}
                        {/*<dt>areaOfUse</dt> <dd>{this.props.med.areaOfUse} </dd>*/}
                        {/*<dt>dosis</dt> <dd>{this.props.med.dosis}*/}
                    </dl>
                </p>
                <div className={styles.button}>
                    <Button type="primary" text="Prescribe" onClick={this._onPrescription.bind(this)} />
                </div>
            </div>
        );
    }

    _onPrescription() {
        console.log("Prescribe " + this.props.med.productName + " ID = " + this.props.med.id + " to " + this.props.selectedPatient);

        let patient = this.props.selectedPatient;
        let med = this.props.med;

        this.props.selectedPatient.meds.push(this.props.med);

        PatientsApi.prescribeMed(patient, med, function (err, res) {
            alert("Sucessfully prescribed " + med.productName + " to " + patient.firstName + " " + patient.lastName);
            if (res && res.text) {
                console.log("res", res);
            }
        });

    }
}
