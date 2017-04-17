import React from 'react';

export class Form extends React.Component {

    constructor(props) {
        super(props);
        this.state = this._fieldsToState(props.fields);
    }


    _updateState(props) {
        this.setState(this._fieldsToState(props.fields));

    }

    _fieldsToState(fields) {
        let state = {};
        fields.map((field) => state[field.name] = field.value || '');
        return state;
    }


    _onInputChange(event) {
        let target = event.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        let name = target.name;

        this.setState({
            [name]: value
        });
    }

    _onSubmit(event) {
        event.preventDefault();
        this.props.onSubmit(this.state);
    }

    componentWillReceiveProps(nextProps) {
        this._updateState(nextProps);
    }


    render() {
        return (
            <div>
                <form onSubmit={this._onSubmit.bind(this)}>
                    {this.props.legend && <legend>{this.props.legend}</legend>}
                    <fieldset>

                        {this.props.fields.map((field) =>
                            <label>
                                {field.label}
                                <input
                                    name={field.name}
                                    type={field.type}
                                    value={this.state[field.name]}
                                    onChange={this._onInputChange.bind(this)}/>
                            </label>
                        )}

                        <input type="submit" value="Submit"/>
                    </fieldset>
                </form>
            </div>
        );
    }

}
