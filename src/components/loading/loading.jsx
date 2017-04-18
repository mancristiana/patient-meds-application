import React from 'react';
import styles from './loading.less';
import FaRefresh from 'react-icons/lib/fa/refresh';

export class Loading extends React.Component {

    render() {
        return (
            <div className={styles.loading}>
                <div className={styles.spin}>
                    <div className={styles.icon}>
                        <FaRefresh />
                    </div>
                </div>
            </div>
        );
    }
}
