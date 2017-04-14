/**
 * Created by mancr on 14-Apr-17.
 */

import React from 'react';
import styles from './button.less';

export class Button extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <button className={[styles.btn, this._getBtnStyle(), this._getBtnSize()].join(' ')} onClick={this._onButtonClick.bind(this)}>
                {this.props.text}
                {this.props.children}
            </button>
        );
    }

    _getBtnStyle() {
        switch (this.props.type) {
            case "primary":
                return styles.btnPrimary;
            case "success":
                return styles.btnSuccess;
            case "info":
                return styles.btnInfo;
            case "warning":
                return styles.btnWarning;
            case "danger":
                return styles.btnDanger;
            default:
                return styles.btnDefault;
        }
    }

    _getBtnSize() {
        switch (this.props.size) {
            case "small": return styles.btnSmall;
            default: return;
        }
    }

    _onButtonClick() {
        this.props.onClick();
    }

}