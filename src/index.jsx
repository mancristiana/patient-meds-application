import React from 'react';
import ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader';

import {App} from './components/app.jsx';

const render = (component) => {
    ReactDOM.render(
        <AppContainer>
            <App />
        </AppContainer>,
        document.getElementById('root')
    )
};

render(App);

// Hot Module Replacement
if (module.hot) {
    module.hot.accept('./components/app.jsx', () => {
        render(App)
    });
}