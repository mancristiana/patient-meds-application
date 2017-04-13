/**
 * Created by mancr on 13-Apr-17.
 */
import React from "react";

export class PatientForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
    }


    render() {
        return (
            <div>
                <h3>Hello</h3>
                <p>Form goes here</p>
                {this.props.patient.firstName}
                {this.props.patient.lastName}

                <form onSubmit={this._onSubmit.bind(this)}>
                    <label>
                        First Name:
                        <input type="text" value={this.state.value} onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Submit"/>
                </form>
            </div>
        );
    }

}
