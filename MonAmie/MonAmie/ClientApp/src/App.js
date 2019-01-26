import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { Login } from './components/Login';
import "./css/App.css";

export default class App extends Component {
    displayName = App.name

    render() {
        return (
            <div>
                <div className="App-header">
                    <h2>Mon Amie</h2>
                </div>
                <Switch>
                    <Route exact path='/' component={Login} />
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
