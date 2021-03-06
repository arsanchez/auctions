/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */

require('./bootstrap');
window.moment = require('moment');

/**
 * Next, we will create a fresh React component instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Link, Route, Switch} from 'react-router-dom';

import Main from './Router';
class Index extends Component {
render() {
    return (
    <BrowserRouter>
        <Route component={Main} />
    </BrowserRouter>
    );
}
}
ReactDOM.render(<Index/>, document.getElementById('app'));
