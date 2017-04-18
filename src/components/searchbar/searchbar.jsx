import React from 'react';
import styles from './searchbar.less';
import FaSearch from 'react-icons/lib/fa/search';

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
            <form onSubmit={this.onSubmit.bind(this)}>
                <div className={styles.searchbar}>
                    <label>
                        <input
                            name="term"
                            type="text"
                            placeholder={this.props.placeholder}
                            onChange={this.onInputChange.bind(this)}/>

                    </label>
                    <div className={styles.icon}><FaSearch /></div>
                </div>
            </form>
        );
    }
}