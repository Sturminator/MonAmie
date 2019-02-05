import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { NavigationBar } from '../../Components';

class HomePage extends Component {
    render() {
        const { user } = this.props;

        return (
            <div>
                <NavigationBar>
                </NavigationBar>
                <div>
                    <h1>Welcome to Mon Amie, {user.firstName}!</h1>
                    <p>This is the Home page.</p>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { authentication } = state;
    const { user } = authentication;
    return {
        user
    };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };