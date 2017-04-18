import React from 'react';
import {MedicineItem} from './medicine-item.jsx';
import styles from './medicine-list.less';


export class MedicineList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={styles.wrap}>
                {this.props.meds.map((med, index) =>
                    <div key={index} className={styles.item}>
                        <MedicineItem med={med} selectedPatient={this.props.selectedPatient} />
                    </div>)}
            </div>
        );
    }
}