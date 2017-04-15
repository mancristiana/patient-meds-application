import React from 'react';
import {MedicineItem} from './medicine-item.jsx';

export class MedicineList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                {this.props.meds.map((med) => <MedicineItem key={med.id} id={med.id}/>)}
            </div>
        );
    }
}