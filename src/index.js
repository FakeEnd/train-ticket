import React from 'react';
import { render } from 'react-dom';

import App from './App';
import Login from './pages/Login';
import store from "./redux/store";
import './index.css';

import { Provider } from "react-redux";
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

render(
    <Provider store={store}>
        <Router>
            <Switch>
                <Route path="/admin" component={App} />
                <Route path="/login" component={Login} />
                <Redirect to="/admin" from="/" exact />
                <Redirect to="/404" />
            </Switch>
        </Router>
    </Provider>,
    document.querySelector('#root')
);
