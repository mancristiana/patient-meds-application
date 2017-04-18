import React from 'react';

export class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {term: ''}
    }

    onInputChange(event) {
        let term = event.target.value;
        this.setState({term: term});
        this.props.onTermChange(term);
    }

    onSubmit(event) {
        event.preventDefault();
    }

    render() {
        return (
            <div>

                <form onSubmit={this.onSubmit.bind(this)}>
                    <label>
                        <input
                            name="term"
                            type="text"
                            placeholder={this.props.placeholder}
                            onChange={this.onInputChange.bind(this)}/>
                    </label>
                </form>
            </div>
        );
    }
}