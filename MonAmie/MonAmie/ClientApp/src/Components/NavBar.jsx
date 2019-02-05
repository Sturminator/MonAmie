import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
import { Menu, Icon } from 'semantic-ui-react'

class NavigationBar extends Component {
    constructor(props) {
        super(props)

        this.state = { activeItem: 'home', logout: false }
    }


    handleItemClick = event => {
        this.setState({
            logout: true
        });
    }

    render() {
        const { user } = this.props;
        const { activeItem, logout } = this.state;

        if (logout)
            return <Redirect to="/login" />

        return (
            <Menu inverted>
                <Menu.Item
                    name='home'
                    active={activeItem === 'home'}
                    onClick={this.handleItemClick}
                >
                    <Icon name='home' />
                    Home
                    </Menu.Item>
                <Menu.Menu position='right'>
                    <Menu.Item
                        name='logout'
                        active={activeItem === 'logout'}
                        onClick={this.handleItemClick}
                    >
                        <Icon name='power' />
                        Logout
                    </Menu.Item>
                </Menu.Menu>
            </Menu>
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