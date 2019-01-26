import React, { Component } from 'react';
import { Route, Redirect, Switch, NavLink } from 'react-router-dom';
import "./css/App.css";
import Layout from './components/Layout';
import Home from './components/Home';
import FetchData from './components/FetchData';
import Counter from './components/Counter';
import Login from './components/Login';
import Registration from './components/Registration';

export default class App extends Component {
    displayName = App.name

    render() {
        return (
            <div className="App">
                <Switch>
                    <Route exact path='/' component={Login} />
                    <Route path='/registration' component={Registration} />
                    <Layout>
                        <Route exact path='/home' component={Home} />
                        <Route path='/counter' component={Counter} />
                        <Route path='/fetchdata' component={FetchData} />
                    </Layout>
                </Switch>
            </div>
        );
    }
}
