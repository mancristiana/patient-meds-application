import React from 'react';

export class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {term: ''}
    }

    _onInputChange(event) {
        let term = event.target.value;
        this.setState({term: term});
        this.props.onTermChange(term);
    }

    _onSubmit(event) {
        event.preventDefault();
    }

    render() {
        return (
            <div>

                <form onSubmit={this._onSubmit.bind(this)}>
                    <label>
                        <input
                            name="term"
                            type="text"
                            placeholder={this.props.placeholder}
                            onChange={this._onInputChange.bind(this)}/>
                    </label>
                </form>
            </div>
        );
    }
}