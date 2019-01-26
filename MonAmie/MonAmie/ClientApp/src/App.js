import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { Login } from './components/Login'

export default class App extends Component {
    displayName = App.name

    render() {
        return (
            <Switch>
                <Route exact path='/' component={Login} />
                <Layout>
                    <Route exact path='/home' component={Home} />
                    <Route path='/counter' component={Counter} />
                    <Route path='/fetchdata' component={FetchData} />
                </Layout>
            </Switch>
        );
    }
}
