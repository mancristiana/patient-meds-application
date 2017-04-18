import React from 'react';

export class Form extends React.Component {

    constructor(props) {
        super(props);
        this.state = this.fieldsToState(props.fields);
    }


    componentWillReceiveProps(nextProps) {
        this.updateState(nextProps);
    }


    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit.bind(this)}>
                    {this.props.legend && <legend>{this.props.legend}</legend>}
                    <fieldset>

                        {this.props.fields.map((field) =>
                            <label>
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
            </div>
        );
    }

    updateState(props) {
        this.setState(this.fieldsToState(props.fields));

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
