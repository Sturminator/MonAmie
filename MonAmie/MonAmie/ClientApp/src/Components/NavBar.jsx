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
        const { to, activename } = e.currentTarget.attributes;
        const { user } = this.props;

        if (activename.nodeValue != this.state.activeItem) {
            if (to.nodeValue == '/profile/')
                this.setState({
                    activeItem: activename.nodeValue, redirectTo: to.nodeValue +
                        user.firstName.toLowerCase() + '_' + user.id * 11
                });
            else
                this.setState({ activeItem: activename.nodeValue, redirectTo: to.nodeValue });
        }
    }

    render() {
        const { user } = this.props;
        const { activeItem, redirectTo } = this.state;

        if (redirectTo != '')
            return <Redirect to={redirectTo} />

        return (
            <Menu style={{ backgroundColor: '#24305e' }} inverted stackable fluid>
                <Menu.Item>
                    <Icon name='handshake' />
                    Mon Amie
                    </Menu.Item>
                <Menu.Item
                    activename='home'
                    to='/'
                    active={activeItem === 'home'}
                    onClick={this.handleRedirect}
                >
                    <Icon name='home' />
                    Home
                    </Menu.Item>
                <Menu.Item
                    activename='friends'
                    to='/'
                    active={activeItem === 'friends'}
                    onClick={this.handleRedirect}
                >
                    <Icon name='user' />
                    Friends
                    </Menu.Item>
                <Menu.Item
                    activename='groups'
                    to='/'
                    active={activeItem === 'groups'}
                    onClick={this.handleRedirect}
                >
                    <Icon name='group' />
                    Groups
                    </Menu.Item>
                <Menu.Item
                    activename='events'
                    to='/'
                    active={activeItem === 'events'}
                    onClick={this.handleRedirect}
                >
                    <Icon name='calendar alternate' />
                    Events
                    </Menu.Item>
                <Menu.Menu position='right'>
                    <Menu.Item
                        activename='messages'
                        to='/'
                        active={activeItem === 'messages'}
                        onClick={this.handleRedirect}
                    >
                        <Icon flipped='horizontally' name='chat' />Messages
                    </Menu.Item>
                    <Dropdown item text={user.firstName}>
                        <Dropdown.Menu>
                            <Dropdown.Item activename='profile'
                                to='/profile/'
                                onClick={this.handleRedirect}><Icon name='user circle' />
                                Profile</Dropdown.Item>
                            <Dropdown.Item><Icon name='settings' />Settings</Dropdown.Item>
                            <Dropdown.Item activename='logout'
                                to='/login'
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