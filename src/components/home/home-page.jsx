import React from 'react';
import styles from './home-page.less';

import * as FontAwesome from 'react-icons/lib/fa'

export class HomePage extends React.Component {
    render() {
        return (
           <div className={styles.wrap}>
               <h1>Welcome <FontAwesome.FaAmbulance /></h1>
           </div>
        );
    }
}