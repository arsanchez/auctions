import React from 'react';
import {BrowserRouter, Link, Route, Switch} from 'react-router-dom';
import Home from './components/Home';
import Login from './views/Login';
import NotFound from './views/NotFound'
import ItemDetail from './views/ItemDetail'

const Main = props => (
    <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/login' component={Login}/>
        <Route path='/details/:id' component={ItemDetail} />
        <Route component={NotFound}/>

    </Switch>
);
export default Main;
