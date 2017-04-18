import React from 'react';
import * as FontAwesome from 'react-icons/lib/fa';
import {Button} from '../button/button.jsx';

export class Table extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <table>
                    <colgroup>
                        {this.props.cols.map((col, index) => <col key={index} style={this.getColSize(col)}/>)}
                    </colgroup>
                    <thead>
                    <tr>
                        {this.props.cols.map((col, index) => <th key={index}>{col.header}</th>)}
                    </tr>
                    </thead>
                    <tbody>
                    {this.props.rows.map((row, index) =>
                        <tr key={index}>
                            {this.props.cols.map((col, index) => <td key={index}>{this.getColValue(row, col)}</td>)}
                        </tr>
                    )}
                    </tbody>
                </table>

            </div>
        );
    }

    getColSize(col) {
        let style = {};
        if (col.size) {
            style.width = col.size;
        }
        return style;
    }

    getColValue(row, col) {
        switch(col.name) {
            case 'edit' :
                return (
                    <Button type="primary" text="" size="small"
                            onClick={this.props.onEdit(row)}>
                        <FontAwesome.FaPencil  />
                    </Button>
                );
            case 'delete' :
                return (
                    <Button type="danger" text="" size="small"
                            onClick={this.props.onDelete(row)}>
                        <FontAwesome.FaTrashO />
                    </Button>
                );
            default :
                return (<span>{row[col.name]}</span>);
        }
    }
}