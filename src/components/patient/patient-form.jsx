/**
 * Created by mancr on 13-Apr-17.
 */
import React from "react";

export class PatientForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.patient.id || '',
            firstName: props.patient.firstName || '',
            lastName: props.patient.lastName || '',
            email: props.patient.email || '',
            phone: props.patient.phone || '',
            bdate: props.patient.bdate || ''
        }
    }

    _updateState(props) {
        this.setState({
            id: props.patient.id || '',
            firstName: props.patient.firstName || '',
            lastName: props.patient.lastName || '',
            email: props.patient.email || '',
            phone: props.patient.phone || '',
            bdate: props.patient.bdate || ''
        });
    }

    _handleChange(event) {
        let target = event.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        let name = target.name;

        this.setState({
            [name]: value
        });
    }

    _handleSubmit(event) {
        alert('A name was submitted: ' + this.state.firstName);
        console.log("STATE on submit", this.state);
        console.log("PROPS on submit", this.props);
        event.preventDefault();
    }

    componentWillReceiveProps(nextProps) {
        console.log("COMPONENT WILL RECEIVE PROPS", nextProps);
        this._updateState(nextProps);
    }


    render() {
        return (
            <div>


                <form onSubmit={this._handleSubmit.bind(this)}>
                    <legend>Patient #{this.state.id} Details</legend>
                    <fieldset>

                        <label>
                            First Name:
                            <input
                                name="firstName"
                                type="text"
                                value={this.state.firstName}
                                onChange={this._handleChange.bind(this)}/>
                        </label>

                        <label>
                            Last Name:
                            <input
                                name="lastName"
                                type="text"
                                value={this.state.lastName}
                                onChange={this._handleChange.bind(this)}/>
                        </label>

                        <label>
                            Email:
                            <input
                                name="email"
                                type="text"
                                value={this.state.email}
                                onChange={this._handleChange.bind(this)}/>
                        </label>

                        <label>
                            Phone:
                            <input
                                name="phone"
                                type="text"
                                value={this.state.phone}
                                onChange={this._handleChange.bind(this)}/>
                        </label>

                        <label>
                            Birth date:
                            <input
                                name="bdate"
                                type="text"
                                value={this.state.bdate}
                                onChange={this._handleChange.bind(this)}/>
                        </label>
                        <input type="submit" value="Submit"/>
                    </fieldset>
                </form>
            </div>
        );
    }

}
