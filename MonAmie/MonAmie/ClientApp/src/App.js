import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Layout from './components/pages/Layout';
import Home from './components/pages/Home';
import FetchData from './components/pages/FetchData';
import Login from './components/pages/Login';
import Registration from './components/pages/Registration';
import UserProfile from './components/pages/UserProfile';

const App = () => <div>
    <Switch>
            <Route path='/' exact component={Home} />
        <Route path='/login' exact component={Login} />
        <Route path='/registration' component={Registration} />
        <Layout>
            <Route path='/userprofile' component={UserProfile} />
            <Route path='/fetchdata' component={FetchData} />
        </Layout>
    </Switch>
</div>;

export default App;
