import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
import { Menu, Icon, Dropdown } from 'semantic-ui-react'

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
                    name='logo'
                    active={activeItem === 'logo'}
                >
                    <Icon name='handshake' />
                    Mon Amie
                    </Menu.Item>
                <Menu.Menu position='right'>
                    <Menu.Item
                        name='home'
                        active={activeItem === 'home'}
                    >
                        <Icon name='home' />
                        Home
                    </Menu.Item>
                    <Dropdown item text={user.firstName}>
                        <Dropdown.Menu>
                            <Dropdown.Item><Icon name='user' />My Profile</Dropdown.Item>
                            <Dropdown.Item><Icon name='settings' />Settings</Dropdown.Item>
                            <Dropdown.Item name='logout'
                                active={activeItem === 'logout'}
                                onClick={this.handleItemClick}><Icon name='power' />
                                Logout</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
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