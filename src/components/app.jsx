/**
 * Created by mancr on 10-Apr-17.
 */

import React from 'react';
import styles from './app.less';

export class App extends React.Component {
    render() {
        return (
            <div>
                <p className={styles.app}>Hello React!</p>
            </div>
        )
    }
}
