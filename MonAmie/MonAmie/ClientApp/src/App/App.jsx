import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from '../Helpers';
import { alertActions } from '../Actions';
import { PrivateRoute } from '../Components';

import { HomePage } from '../Components/HomePage';
import { LoginPage } from '../Components/LoginPage';
import { RegistrationPage } from '../Components/RegistrationPage';
import { ProfilePage } from '../Components/ProfilePage';
import { FriendsPage } from '../Components/FriendsPage';
import { GroupsPage } from '../Components/GroupsPage';
import { GroupsCategoryPage } from '../Components/GroupsCategoryPage';
import { EventsPage } from '../Components/EventsPage';
import { MessagesPage } from '../Components/MessagesPage';
import { GroupProfilePage } from '../Components/GroupProfilePage';

class App extends Component {
    constructor(props) {
        super(props);

        const { dispatch } = this.props;
        history.listen((location, action) => {
            // clear alert when location changes
            dispatch(alertActions.clear());
        });
    }

    render() {
        const { alert } = this.props;

        return (
            <div>
                <div>
                    <div>
                        {alert.message &&
                            <div className={'alert ${alert.type}'}>{alert.message}</div>
                        }
                        <Router history={history}>
                            <div>
                                <PrivateRoute exact path="/" component={HomePage} />
                                <Route path="/login" component={LoginPage} />
                                <Route path="/registration" component={RegistrationPage} />
                                <PrivateRoute path="/profile/:userId" component={ProfilePage} />
                                <PrivateRoute path="/friends" component={FriendsPage} />
                                <PrivateRoute exact path="/groups" component={GroupsPage} />
                                <PrivateRoute path="/groups/:categoryName" component={GroupsCategoryPage} />
                                <PrivateRoute path="/group/:groupId" component={GroupProfilePage} />
                                <PrivateRoute path="/events" component={EventsPage} />
                                <PrivateRoute path="/messages" component={MessagesPage} />
                            </div>
                        </Router>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { alert } = state;
    return {
        alert
    };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App };