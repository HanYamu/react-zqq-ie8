import React from 'react';
import ReactDom from 'react-dom';
// import {Provider} from 'react-redux';
// import store from './store/initState';
import { Router } from 'react-router-dom';
import history from './history';
import App from './app';
import './style/reset.css'
console.log(history)

ReactDom.render(
    // <Provider store={store}>
        <Router history={history}>
            <App/>
        </Router>,
    // </Provider>,
    document.getElementById('app')
);
