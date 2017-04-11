/**
 * Created by mancr on 10-Apr-17.
 */

import React from 'react';
import styles from './app.less';

import {PatientStory} from './patient/patient-story.jsx';

export class App extends React.Component {
    render() {
        return (
            <div>
                <div className={styles.app}>Patient Meds App</div>
                <PatientStory />
            </div>
        )
    }
}
