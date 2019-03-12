import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Card, Grid, Container, Dimmer, Loader, Segment, Header, Popup, Divider, Button } from 'semantic-ui-react';
import { NavigationBar } from '../../Components';
import { groupActions, friendActions } from '../../Actions';
import { history } from '../../Helpers';
import './card_theme.css';

class HomePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            groupSelected: false,
            userSelected: false,
            whereTo: ""
        };
    }

    componentDidMount() {
        const { user } = this.props;

        this.props.dispatch(friendActions.getAllFriends(user.id));
        this.props.dispatch(groupActions.getAllForUser(user.id));
    }

    createUserGroupCards = () => {
        const { userGroups } = this.props;

        var cards = [];

        if (userGroups.groups) {
            for (let i = 0; i < userGroups.groups.length; i++) {
                var children = [];
                children.push(<Card.Content>
                    <Popup trigger={<Button onClick={this.goToGroupProfile} value={userGroups.groups[i]} floated='right' color='blue' icon='group' />} content='View Profile' />
                </Card.Content>)
                children.push(<Card.Header textAlign='left'>
                    {userGroups.groups[i].groupName}
                </Card.Header>)
                children.push(<Card.Meta textAlign='left'>{userGroups.groups[i].state} - {userGroups.groups[i].categoryName}</Card.Meta>)

                if (userGroups.groups[i].memberCount > 1) {
                    children.push(<Card.Meta textAlign='left'>{userGroups.groups[i].memberCount} Members</Card.Meta>)
                }
                else {
                    children.push(<Card.Meta textAlign='left'>{userGroups.groups[i].memberCount} Member</Card.Meta>)
                }

                cards.push(<Card style={{ backgroundColor: '#374785' }} key={i + 1} value={userGroups.groups[i]} > <Card.Content textAlign='center' children={children} /></ Card>)
            }
        }
        return cards;
    }

    createFriendCards = () => {
        const { friends, user } = this.props;

        var cards = []

        if (friends.items) {
            // Outer loop to create parent
            for (let i = 0; i < friends.items.length; i++) {
                if (user.id !== friends.items[i].id) {
                    var children = []
                    //Inner loop to create children
                    children.push(<Card.Content>
                        <Popup trigger={<Button value={friends.items[i]} floated='right' onClick={this.goToProfile} color='blue' icon='user' />} content='View Profile' />
                    </Card.Content>)
                    children.push(<Card.Header textAlign='center'>
                        {friends.items[i].firstName + ' ' + friends.items[i].lastName}
                    </Card.Header>)
                    children.push(<Card.Meta textAlign='center'>{friends.items[i].state} - {friends.items[i].age} years old</Card.Meta>)
                    //Create the parent and add the children
                    cards.push(<Card style={{ backgroundColor: '#374785' }} key={i + 1} value={friends.items[i]} > <Card.Content textAlign='center' children={children} /></ Card>)
                }
            }
        }

        return cards
    }

    goToGroupProfile = (e, { value }) => {
        history.push('/');

        var groupName = value.groupName.replace(/ /g, '');

        this.setState({
            groupSelected: true,
            whereTo: '/group/' +
                groupName.toLowerCase() + '_' + value.groupId * 11
        });
    };

    goToProfile = (e, { value }) => {
        history.push('/');

        this.setState({
            userSelected: true,
            whereTo: '/profile/' +
                value.firstName.toLowerCase() + '_' + value.id * 11
        });
    };

    render() {
        const { user } = this.props;
        const { groupSelected, userSelected, whereTo } = this.state;

        if (!user) {
            return <Redirect to='/login' />
        }

        if (userSelected)
            return <Redirect to={whereTo} /> 

        if (groupSelected)
            return <Redirect to={whereTo} /> 

        return (
            <div>
                <NavigationBar>
                </NavigationBar>
                <style>{`html, body {background-color: #24305E !important; } `}</style>
                <Container fluid style={{ margin: '5px' }}>
                    <Header as='h1' textAlign='left'>
                        <Header.Content style={{ color: 'white', paddingLeft: '10px' }}>Welcome back, {user.firstName}!</Header.Content>
                    </Header>
                    <Segment fluid='true' style={{ backgroundColor: '#a8d0e6' }}>
                        <Grid columns='equal'>
                            <Grid.Column>
                            </Grid.Column>
                            <Grid.Column>
                                <Header as='h1' textAlign='center'>
                                    <Header.Content style={{ color: 'white' }}>My Friends</Header.Content>
                                </Header>
                            </Grid.Column>
                            <Grid.Column>
                                <Popup trigger={<Button floated='right' color='blue' icon='refresh' onClick={this.onRefreshButtonClick} />} content='Refresh' />
                            </Grid.Column>
                        </Grid>
                        <Divider style={{ backgroundColor: 'white' }} />
                        <Card.Group stackable centered children={this.createFriendCards()} />
                    </Segment>
                    <Segment fluid='true' style={{ backgroundColor: '#a8d0e6' }}>
                        <Grid columns='equal'>
                            <Grid.Column>
                            </Grid.Column>
                            <Grid.Column>
                                <Header as='h1' textAlign='center'>
                                    <Header.Content style={{ color: 'white' }}>My Groups</Header.Content>
                                </Header>
                            </Grid.Column>
                            <Grid.Column>
                                <Popup trigger={<Button floated='right' color='blue' icon='refresh' onClick={this.onRefreshButtonClick} />} content='Refresh' />
                            </Grid.Column>
                        </Grid>
                        <Divider style={{ backgroundColor: 'white' }} />
                        <Card.Group stackable centered children={this.createUserGroupCards()} />
                    </Segment>
                </Container>
            </div>
        );
    }
}


function mapStateToProps(state) {
    const { authentication, userGroups, friends } = state;
    const { user } = authentication;
    return {
        user,
        userGroups,
        friends
    };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };