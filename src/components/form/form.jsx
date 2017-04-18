import React from 'react';
import styles from './form.less';

export class Form extends React.Component {

    constructor(props) {
        super(props);
        this.state = this.fieldsToState(props.fields);
    }


    componentWillReceiveProps(nextProps) {
        this.setState(this.fieldsToState(nextProps.fields));
    }


    render() {
        return (
            <form className={styles.form} onSubmit={this.onSubmit.bind(this)}>
                {this.props.legend && <legend>{this.props.legend}</legend>}
                <fieldset>

                    {this.props.fields.filter((field) => field.type !== "immutable").map((field, index) =>
                        <label key={index}>
                            {field.label}
                            <input
                                name={field.name}
                                type={field.type}
                                value={this.state[field.name]}
                                onChange={this.onInputChange.bind(this)}/>
                        </label>
                    )}

                    <input type="submit" value="Submit"/>
                </fieldset>
            </form>
        );
    }

    fieldsToState(fields) {
        let state = {};
        fields.map((field) => state[field.name] = field.value || '');
        return state;
    }


    onInputChange(event) {
        let target = event.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        let name = target.name;

        this.setState({
            [name]: value
        });
    }

    onSubmit(event) {
        event.preventDefault();
        this.props.onSubmit(this.state);
    }

}
