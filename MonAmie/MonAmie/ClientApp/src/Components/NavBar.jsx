import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import { Menu, Icon, Dropdown, Image, Label } from 'semantic-ui-react';
import { history } from '../Helpers';

class NavigationBar extends Component {
    constructor(props) {
        super(props)

        this.state = { activeItem: 'home', redirectTo: '' }
        this.handleRedirect = this.handleRedirect.bind(this);
    }

    handleRedirect(e) {
        const { to, activename } = e.currentTarget.attributes;
        const { user } = this.props;
        var path = window.location.pathname;

        if (to.nodeValue != '/login') {
            history.push(path);
        }

        if (to.nodeValue != path) {
            if (to.nodeValue === '/profile/')
            {
                var profilePath = to.nodeValue + user.firstName.toLowerCase() + '_' + user.id * 11;

                if (profilePath != path) {
                    this.setState({
                        redirectTo: profilePath
                    });
                }
            }
            else
                this.setState({ redirectTo: to.nodeValue });
        }
    }

    render() {
        const { user } = this.props;
        const { activeItem, redirectTo } = this.state;

        var path = window.location.pathname;

        var userPath = '/profile/' + user.firstName.toLowerCase() + '_' + user.id * 11;

        if (redirectTo != '') {
            if (redirectTo.includes('profile') && path != redirectTo) {
                var redirect = redirectTo;
                this.setState({ redirectTo: '' });
                return <Redirect to={redirect} />
            }
            else {
                return <Redirect to={redirectTo} />
            }

        }

        return (
            <Menu style={{ backgroundColor: '#FFFFFF' }}  stackable fluid>
                <Menu.Item style={{ color: '#24305E' }}>
                    <Icon name='handshake' />
                    Mon Amie
                    </Menu.Item>
                <Menu.Item style={{ color: '#24305E' }}
                    to='/'
                    active={path === '/'}
                    onClick={this.handleRedirect}
                >
                    <Icon name='home' />
                    Home
                    </Menu.Item>
                <Menu.Item style={{ color: '#24305E' }}
                    to='/friends'
                    active={path === '/friends'}
                    onClick={this.handleRedirect}
                >
                    <Icon name='user' />
                    Friends
                    </Menu.Item>
                <Menu.Item style={{ color: '#24305E' }}
                    activename='/groups'
                    to='/groups'
                    active={path === '/groups'}
                    onClick={this.handleRedirect}
                >
                    <Icon name='group' />
                    Groups
                    </Menu.Item>
                <Menu.Item style={{ color: '#24305E' }}
                    activename='/events'
                    to='/events'
                    active={path === '/events'}
                    onClick={this.handleRedirect}
                >
                    <Icon name='calendar alternate' />
                    Events
                    </Menu.Item>
                <Menu.Menu position='right'>
                    <Menu.Item style={{ color: '#24305E' }}
                        activename='/messages'
                        to='/messages'
                        active={path === '/messages'}
                        onClick={this.handleRedirect}
                    >
                        <Icon flipped='horizontally' name='chat' />Messages
                    </Menu.Item>
                    <Dropdown style={{ color: '#24305E' }} item text={user.firstName}>
                        <Dropdown.Menu style={{ color: '#24305E' }}>
                            <Dropdown.Item activename='profile'
                                to='/profile/'
                                active={path === userPath}
                                onClick={this.handleRedirect}><Icon name='user circle' />
                                Profile</Dropdown.Item>
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

const connectedNavBar = withRouter(connect(mapStateToProps)(NavigationBar));
export { connectedNavBar as NavigationBar };