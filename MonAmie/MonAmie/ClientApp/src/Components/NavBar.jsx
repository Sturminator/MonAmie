import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Menu, Icon, Dropdown, Image } from 'semantic-ui-react';

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
                <Menu.Item
                    name='home'
                    active={activeItem === 'home'}
                    onClick={this.handleItemClick}
                >
                    <Icon name='home' />
                    Home
                    </Menu.Item>
                <Menu.Item
                    name='friends'
                    active={activeItem === 'friends'}
                    onClick={this.handleItemClick}
                >
                    <Icon name='user' />
                    Friends
                    </Menu.Item>
                <Menu.Item
                    name='groups'
                    active={activeItem === 'groups'}
                    onClick={this.handleItemClick}
                >
                    <Icon name='group' />
                    Groups
                    </Menu.Item>
                <Menu.Item
                    name='events'
                    active={activeItem === 'events'}
                    onClick={this.handleItemClick}
                >
                    <Icon name='calendar alternate' />
                    Events
                    </Menu.Item>
                <Menu.Menu position='right'>
                    <Menu.Item
                        name='messages'
                        active={activeItem === 'messages'}
                        onClick={this.handleItemClick}
                    >
                        <Icon name='chat' />
                    </Menu.Item>
                    <Dropdown item text={user.firstName}>
                        <Dropdown.Menu>
                            <Dropdown.Item><Icon name='user circle' />Profile</Dropdown.Item>
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