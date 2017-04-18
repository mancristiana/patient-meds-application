import React from 'react';
import styles from './loading.less';
import FaRefresh from 'react-icons/lib/fa/refresh';

export class Loading extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: this.props.isLoading
        };
    }

    render() {
        return (
            <div className={styles.loading}>
                {this.state.isLoading &&
                <div className={styles.spin}>
                    <div className={styles.icon}>
                        <FaRefresh />
                    </div>
                </div>
                }
            </div>
        );
    }
}
