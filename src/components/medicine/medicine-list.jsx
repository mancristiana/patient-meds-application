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
                {this.props.meds.map((med) =>
                    <div className={styles.item}>
                        <MedicineItem key={med._id} med={med} selectedPatient={this.props.selectedPatient} />
                    </div>)}
            </div>
        );
    }
}