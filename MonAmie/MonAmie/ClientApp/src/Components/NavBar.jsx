import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Menu, Icon, Dropdown, Image } from 'semantic-ui-react';

class NavigationBar extends Component {
    constructor(props) {
        super(props)

        this.state = { activeItem: 'home', redirectTo: '' }

        this.handleRedirect = this.handleRedirect.bind(this);
    }

    handleRedirect(e) {
        const { nodeValue } = e.currentTarget.attributes.name;

        this.setState({ redirectTo: '/' + nodeValue });
    }

    render() {
        const { user } = this.props;
        const { activeItem, redirectTo } = this.state;

        if (redirectTo != '')
            return <Redirect to={redirectTo} />

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
                    name='/'
                    active={activeItem === 'home'}
                    onClick={this.handleRedirect}
                >
                    <Icon name='home' />
                    Home
                    </Menu.Item>
                <Menu.Item
                    name='friends'
                    active={activeItem === 'friends'}
                    onClick={this.handleRedirect}
                >
                    <Icon name='user' />
                    Friends
                    </Menu.Item>
                <Menu.Item
                    name='groups'
                    active={activeItem === 'groups'}
                    onClick={this.handleRedirect}
                >
                    <Icon name='group' />
                    Groups
                    </Menu.Item>
                <Menu.Item
                    name='events'
                    active={activeItem === 'events'}
                    onClick={this.handleRedirect}
                >
                    <Icon name='calendar alternate' />
                    Events
                    </Menu.Item>
                <Menu.Menu position='right'>
                    <Menu.Item
                        name='messages'
                        active={activeItem === 'messages'}
                        onClick={this.handleRedirect}
                    >
                        <Icon name='chat' />
                    </Menu.Item>
                    <Dropdown item text={user.firstName}>
                        <Dropdown.Menu>
                            <Dropdown.Item name='profile'
                                active={activeItem === 'profile'}
                                onClick={this.handleRedirect}><Icon name='user circle' />
                                Profile</Dropdown.Item>
                            <Dropdown.Item><Icon name='settings' />Settings</Dropdown.Item>
                            <Dropdown.Item name='login'
                                active={activeItem === 'logout'}
                                onClick={this.handleRedirect}><Icon name='power' />
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