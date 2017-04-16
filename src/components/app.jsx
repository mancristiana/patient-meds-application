/**
 * Created by mancr on 10-Apr-17.
 */

import React from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'

import classNames from 'classnames/bind';
import styles from './app.less';

import {PatientPage} from './patient/patient-page.jsx';
import {MedicinePage} from './medicine/medicine-page.jsx';
import {HomePage} from './home/home-page.jsx';

export class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isMenuOn: false
        }
    }

    render() {
        let cx = classNames.bind(styles);
        return (
            <Router>
                <div>
                    <div className={cx({menuSection: true, on: this.state.isMenuOn})}>
                        Patient Meds App
                        <div className={cx({menuToggle: true, on: this.state.isMenuOn})}
                             onClick={this._onMenuToggle.bind(this)}>
                            <div className={styles.one}></div>
                            <div className={styles.two}></div>
                            <div className={styles.three}></div>
                        </div>
                        <nav onClick={this._onMenuToggle.bind(this)}>
                            <ul role="navigation" className={cx({
                                hidden: !this.state.isMenuOn
                            })}>
                                <li><Link to={'/'}>home</Link></li>
                                <li><Link to={'/patients'}>patients</Link></li>
                                <li><Link to={'/medicine'}>medicine</Link></li>
                            </ul>
                        </nav>
                    </div>
                    <Route exact={true} path="/" component={HomePage} />
                    <Route path="/patients" component={PatientPage}/>
                    <Route path="/medicine" component={MedicinePage}/>
                </div>
            </Router>
        )
    }

    _onMenuToggle() {
        this.setState({
            isMenuOn: !this.state.isMenuOn
        });
    }
}
