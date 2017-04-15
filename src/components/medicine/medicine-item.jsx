import React from 'react';

export class MedicineItem extends React.Component {
    render() {
        return (
            <div>
                Med id = {this.props.id}
            </div>
        );
    }
}