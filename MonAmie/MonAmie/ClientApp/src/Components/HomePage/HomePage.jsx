import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Card, Grid, Container, Dimmer, Loader, Segment, Header, Popup, Divider, Button, Icon } from 'semantic-ui-react';
import { NavigationBar } from '../../Components';
import { groupActions, friendActions } from '../../Actions';
import { history } from '../../Helpers';
import './card_theme.css';


///
//Home page for user after login
//Home page will display friends, groups you are a member of and suggested groups to join
///
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
        this.props.dispatch(groupActions.getHomePageGroups(user.id, user.state));
    }

    createUserGroupCards = () => {
        const { homePageGroups } = this.props;

        var cards = [];

        if (homePageGroups.groups) {
            var userGroups = homePageGroups.groups.userGroups;
            for (let i = 0; i < userGroups.length; i++) {
                var children = [];
                children.push(<Card.Content style={{ paddingBottom: '10px' }}>
                    <object data={"/api/GroupImage/ViewImageDirect/" + userGroups[i].groupId} type="image/png" width="140" height="130">
                        <Icon name='group' size='massive' />
                    </object>
                    <Popup trigger={<Button onClick={this.goToGroupProfile} value={userGroups[i]} floated='right' color='blue' icon='group' />} content='View Profile' />
                </Card.Content>)
                children.push(<Card.Header textAlign='left'>
                    {userGroups[i].groupName}
                </Card.Header>)
                children.push(<Card.Meta textAlign='left'>{userGroups[i].state} - {userGroups[i].categoryName}</Card.Meta>)

                if (userGroups[i].memberCount > 1) {
                    children.push(<Card.Meta textAlign='left'>{userGroups[i].memberCount} Members</Card.Meta>)
                }
                else {
                    children.push(<Card.Meta textAlign='left'>{userGroups[i].memberCount} Member</Card.Meta>)
                }

                cards.push(<Card style={{ backgroundColor: '#374785' }} key={i + 1} value={userGroups[i]} > <Card.Content textAlign='center' children={children} /></ Card>)
            }
        }
        return cards;
    }

    createSuggestedGroupCards = () => {
        const { homePageGroups } = this.props;

        var cards = [];

        if (homePageGroups.groups) {
            var suggestedGroups = homePageGroups.groups.suggestedGroups;

            if (suggestedGroups.length > 0) {
                for (let i = 0; i < suggestedGroups.length; i++) {
                    var children = [];
                    children.push(<Card.Content style={{ paddingBottom: '10px' }}>
                        <object data={"/api/GroupImage/ViewImageDirect/" + suggestedGroups[i].groupId} type="image/png" width="140" height="130">
                            <Icon name='group' size='massive' />
                        </object>
                        <Popup trigger={<Button onClick={this.goToGroupProfile} value={suggestedGroups[i]} floated='right' color='blue' icon='group' />} content='View Profile' />
                    </Card.Content>)
                    children.push(<Card.Header textAlign='left'>
                        {suggestedGroups[i].groupName}
                    </Card.Header>)
                    children.push(<Card.Meta textAlign='left'>{suggestedGroups[i].state} - {suggestedGroups[i].categoryName}</Card.Meta>)

                    if (suggestedGroups[i].memberCount > 1) {
                        children.push(<Card.Meta textAlign='left'>{suggestedGroups[i].memberCount} Members</Card.Meta>)
                    }
                    else {
                        children.push(<Card.Meta textAlign='left'>{suggestedGroups[i].memberCount} Member</Card.Meta>)
                    }

                    cards.push(<Card style={{ backgroundColor: '#374785' }} key={i + 1} value={suggestedGroups[i]} > <Card.Content textAlign='center' children={children} /></ Card>)
                }
            }
            else {
                return (<Header as='h1' textAlign='center'>
                    <Header.Content style={{ color: 'white' }}>No suggestions. Try adding interests to your profile.</Header.Content>
                </Header>);
            }
        }
        return(<Card.Group stackable centered children={cards} />);
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
                    children.push(<Card.Content style={{ paddingBottom: '10px' }}>
                        <object data={"/api/UserImage/ViewImageDirect/" + friends.items[i].id} type="image/png" width="120" height="110">
                            <Icon name='user' size='massive' />
                        </object>
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

    onRefreshButtonClick = () => {
        const { user } = this.props;

        this.props.dispatch(friendActions.getAllFriends(user.id));
        this.props.dispatch(groupActions.getHomePageGroups(user.id, user.state));
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
        const { user, homePageGroups, friends } = this.props;
        const { groupSelected, userSelected, whereTo } = this.state;

        if (!user) {
            return <Redirect to='/login' />
        }

        if (userSelected)
            return <Redirect to={whereTo} /> 

        if (groupSelected)
            return <Redirect to={whereTo} /> 

        if (friends.loading)
            return (<div style={{ paddingTop: '600px' }}>
                <Dimmer active>
                    <Loader active size='massive' inline='centered' />
                </Dimmer>
            </div>);

        if (homePageGroups.loading)
            return (<div style={{ paddingTop: '600px' }}>
                <Dimmer active>
                    <Loader active size='massive' inline='centered' />
                </Dimmer>
            </div>);

        if (!homePageGroups.groups)
            return (<div style={{ paddingTop: '600px' }}>
                <Dimmer active>
                    <Loader active size='massive' inline='centered' />
                </Dimmer>
            </div>);

        return (
            <div>
                <NavigationBar>
                </NavigationBar>
                <style>{`html, body {background-color: #24305E !important; } `}</style>
                <Container fluid style={{ margin: '5px' }}>
                    <Grid columns='equal'>
                        <Grid.Column>
                            <Header as='h1' textAlign='left'>
                                <Header.Content style={{ color: 'white', paddingLeft: '10px' }}>Welcome back, {user.firstName}!</Header.Content>
                            </Header>
                        </Grid.Column>
                        <Grid.Column>
                        </Grid.Column>
                        <Grid.Column>
                            <Popup trigger={<Button floated='right' color='blue' icon='refresh' onClick={this.onRefreshButtonClick} />} content='Refresh' />
                        </Grid.Column>
                    </Grid>
                    <Segment fluid='true' style={{ backgroundColor: '#a8d0e6' }}>
                        <Header as='h1' textAlign='left'>
                            <Header.Content style={{ color: 'white' }}>My Friends</Header.Content>
                        </Header>
                        <Divider style={{ backgroundColor: 'white' }} />
                        <Card.Group stackable centered children={this.createFriendCards()} />
                    </Segment>
                    <Segment fluid='true' style={{ backgroundColor: '#a8d0e6' }}>
                        <Header as='h1' textAlign='left'>
                            <Header.Content style={{ color: 'white' }}>My Groups</Header.Content>
                        </Header>
                        <Divider style={{ backgroundColor: 'white' }} />
                        <Card.Group stackable centered children={this.createUserGroupCards()} />
                    </Segment>
                    <Segment fluid='true' style={{ backgroundColor: '#a8d0e6' }}>
                        <Header as='h1' textAlign='left'>
                            <Header.Content style={{ color: 'white' }}>Suggested Groups</Header.Content>
                        </Header>
                        <Divider style={{ backgroundColor: 'white' }} />
                        {this.createSuggestedGroupCards()}
                    </Segment>
                </Container>
            </div>
        );
    }
}


function mapStateToProps(state) {
    const { authentication, friends, homePageGroups } = state;
    const { user } = authentication;
    return {
        user,
        friends,
        homePageGroups
    };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };