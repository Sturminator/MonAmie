import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavBar } from 'react-bootstrap';

class NavigationBar extends Component {
    render() {
        const { user } = this.props;

        return (
            <nav class="navbar navbar-inverse">
                <div class="container-fluid">
                    <div class="navbar-header">
                        <a class="navbar-brand" href="/">Mon Amie</a>
                    </div>
                    <ul class="nav navbar-nav navbar-right">
                        <li><a href="/login"><span class="glyphicon glyphicon-log-out"></span> Logout</a></li>
                    </ul>
                </div>
            </nav>
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

const connectedNavBar = connect(mapStateToProps)(NavigationBar);
export { connectedNavBar as NavigationBar };