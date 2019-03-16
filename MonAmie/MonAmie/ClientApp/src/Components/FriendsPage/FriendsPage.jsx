import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { NavigationBar } from '../../Components';
import { userActions, friendActions } from '../../Actions';
import { Segment, Container, Grid, Header, Divider, Card, Dimmer, Loader, Button, Popup, Modal, Checkbox, Icon } from 'semantic-ui-react';
import { history } from '../../Helpers';
import modalStyles from '../../Styles/modal.styles';

class FriendsPage extends Component {
    state = {
        userSelected: false,
        redirectTo: "",
        confirmDelete: false,
        targetedFriendName: "",
        targetedFriendId: -1,
        acceptedRequest: false,
        refreshUsers: false,
        addToUsers: false,
        removeFromUsers: false,
        showAllStates: false
    };

    componentDidMount() {
        const { user, users } = this.props;
        const { showAllStates } = this.state;

        if (!users.items) {
            this.props.dispatch(friendActions.getAllFriends(user.id));
            this.props.dispatch(friendActions.getAllRequests(user.id));

            if (showAllStates) {
                this.props.dispatch(userActions.getAllForUser(user.id));
            } else {
                this.props.dispatch(userActions.getAllForUser(user.id, user.state));
            }
        }
    }

    componentDidUpdate() {
        const { user, users, friends } = this.props;
        const { acceptedRequest, refreshUsers, addToUsers, removeFromUsers, targetedFriendId, showAllStates } = this.state;

        if (addToUsers) {
            this.props.dispatch(userActions.addToCurrentUsers(user.id, targetedFriendId, users.items));

            this.setState({
                addToUsers: false,
                targetedFriendId: -1
            });
        }

        if (removeFromUsers) {
            this.props.dispatch(userActions.removeFromCurrentUsers(targetedFriendId, users.items));

            this.setState({
                removeFromUsers: false,
                targetedFriendId: -1
            });
        }

        if (acceptedRequest) {
            this.props.dispatch(friendActions.addToCurrentFriends(targetedFriendId, friends.items));

            this.setState({
                acceptedRequest: false,
                targetedFriendId: -1
            });
        }

        if (refreshUsers) {
            if (showAllStates) {
                this.props.dispatch(userActions.getAllForUser(user.id));
            } else {
                this.props.dispatch(userActions.getAllForUser(user.id, user.state));
            }

            this.setState({
                refreshUsers: false
            });
        }
    }

    onDeleteFriendClick = (e, { value }) => this.setState({
        confirmDelete: this.state.confirmDelete ? false : true,
        targetedFriendName: value.firstName + " " + value.lastName,
        targetedFriendId: value.id
    });

    onCancelDeleteFriendClick = (e) => this.setState({
        confirmDelete: false,
        targetedFriendName: "",
        targetedFriendId: -1
    });

    refreshUsers = (e) => this.setState({
        refreshUsers: true
    });

    onConfirmDeleteFriendClick = (e) => {
        const { user, friends } = this.props;
        const { targetedFriendId } = this.state;

        if (targetedFriendId != -1) {
            this.props.dispatch(friendActions.removeFriend(user.id, targetedFriendId, friends.items));
        }

        this.setState({
            confirmDelete: false,
            addToUsers: true,
            targetedFriendName: ""
        });
    };

    goToProfile = (e, { value }) => {
        history.push('/friends');

        this.setState({
            userSelected: true,
            redirectTo: '/profile/' +
                value.firstName.toLowerCase() + '_' + value.id * 11
        });
    };

    addFriend = (e, { value }) => {
        const { user, requests } = this.props;

        if (value) {
            this.props.dispatch(friendActions.addFriend(user.id, value.id, requests.items));

            this.setState({
                removeFromUsers: true,
                targetedFriendId: value.id
            });
        }
    };

    acceptRequest = (e, { value }) => {
        const { user, requests } = this.props;

        if (value) {
            this.props.dispatch(friendActions.acceptRequest(user.id, value.id, requests.items));

            this.setState({
                acceptedRequest: true,
                targetedFriendId: value.id
            });
        }
    };

    denyRequest = (e, { value }) => {
        const { user, requests } = this.props;

        if (value) {
            this.props.dispatch(friendActions.denyRequest(user.id, value.id, requests.items));

            this.setState({
                addToUsers: true,
                targetedFriendId: value.id
            });
        }
    };

    cancelRequest = (e, { value }) => {
        const { user, requests } = this.props;

        if (value) {
            this.props.dispatch(friendActions.cancelRequest(user.id, value.id, requests.items));

            this.setState({
                addToUsers: true,
                targetedFriendId: value.id
            });
        }
    };

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
                        <object data={"/api/UserImage/ViewImageDirect/" + friends.items[i].id} type="image/png" width="60" height="60">
                            <Icon name='user' size='huge' />
                        </object>
                        <Popup trigger={<Button value={friends.items[i]} floated='left' onClick={this.onDeleteFriendClick} color='red' icon='remove user' />} content='Remove Friend' />
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

    createRequestCards = (incoming) => {
        const { requests, user } = this.props;

        var cards = []

        if (requests.items) {
            // Outer loop to create parent
            for (let i = 0; i < requests.items.length; i++) {
                if (incoming === requests.items[i].incoming) {
                    var children = []
                    //Inner loop to create children
                    children.push(<Card.Content style={{ paddingBottom: '10px' }}>
                        <object data={"/api/UserImage/ViewImageDirect/" + requests.items[i].id} type="image/png" width="60" height="60">
                            <Icon name='user' size='huge' />
                        </object>
                        <Popup trigger={<Button value={requests.items[i]} floated='right' onClick={this.goToProfile} color='blue' icon='user' />} content='View Profile' />
                    </Card.Content>)
                    children.push(<Card.Header textAlign='center'>
                        {requests.items[i].firstName + ' ' + requests.items[i].lastName}
                    </Card.Header>)
                    children.push(<Card.Meta textAlign='center'>{requests.items[i].state} - {requests.items[i].age} years old</Card.Meta>)
                    if (incoming) {
                        children.push(<Card.Content extra><Divider style={{ backgroundColor: 'white' }} />
                            <Grid stackable columns='equal'>
                                <Grid.Column>
                                    <Button onClick={this.acceptRequest} value={requests.items[i]} fluid color='green'>Accept Request</Button>
                                </Grid.Column>
                                <Grid.Column>
                                    <Button onClick={this.denyRequest} value={requests.items[i]} fluid color='red'>Deny Request</Button>
                                </Grid.Column>
                            </Grid>
                        </Card.Content>)
                    }
                    else {
                        children.push(<Card.Content extra><Divider style={{ backgroundColor: 'white' }} />
                            <Button value={false} onClick={this.cancelRequest} value={requests.items[i]} fluid color='red'>Cancel Request</Button>
                        </Card.Content>)
                    }
                    //Create the parent and add the children
                    cards.push(<Card style={{ backgroundColor: '#374785' }} key={i + 1} value={requests.items[i]} > <Card.Content textAlign='center' children={children} /></ Card>)
                }
            }
        }

        return cards
    }

    createUserCards = () => {
        const { users, user } = this.props;

        var cards = []

        if (users.items) {
            // Outer loop to create parent
            var userList = users.items;
            if (userList.length > 0) {
                for (let i = 0; i < userList.length; i++) {
                    if (user.id != userList[i].id) {
                        var children = []
                        //Inner loop to create children
                        children.push(<Card.Content style={{paddingBottom: '10px'}}>
                            <object data={"/api/UserImage/ViewImageDirect/" + userList[i].id} type="image/png" width="60" height="60">
                                <Icon name='user' size='huge' />
                            </object>
                            <Popup trigger={<Button value={userList[i]} floated='right' onClick={this.goToProfile} color='blue' icon='user' />} content='View Profile' />
                        </Card.Content>)
                        children.push(<Card.Header textAlign='left'>
                            {userList[i].firstName + ' ' + userList[i].lastName}
                        </Card.Header>)
                        children.push(<Card.Meta textAlign='left'>{userList[i].state} - {userList[i].age} years old</Card.Meta>)
                        children.push(<Card.Meta textAlign='left'>
                            Shared Interests: {userList[i].sharedCount}
                        </Card.Meta>)
                        children.push(<Card.Description textAlign='left'>
                            {userList[i].interestsInfo}
                        </Card.Description>)
                        children.push(<Card.Content extra><Divider style={{ backgroundColor: 'white' }} />
                            <Button onClick={this.addFriend} value={userList[i]} fluid color='green'>Send Friend Request</Button>
                        </Card.Content>)
                        //Create the parent and add the children
                        cards.push(<Card style={{ backgroundColor: '#374785'}} key={i + 1} value={userList[i]} > <Card.Content textAlign='center' children={children} /></ Card>)
                    }
                }
            } else {
                return (<Header as='h1' textAlign='center'>
                    <Header.Content style={{ color: 'white' }}>No users found</Header.Content>
                </Header>);
            }
        }

        return (<Card.Group stackable centered children={cards} />);
    }

    toggleAllStates = () => {
        const { showAllStates } = this.state;
        const { user } = this.props;

        if (!showAllStates) {
            this.props.dispatch(userActions.getAllForUser(user.id));
        } else {
            this.props.dispatch(userActions.getAllForUser(user.id, user.state));
        }

        this.setState({ showAllStates: showAllStates ? false : true })
    }

    render() {
        const { user, users, friends, requests } = this.props;
        const { userSelected, redirectTo, confirmDelete, targetedFriendName, showAllStates } = this.state;

        if (!user) {
            return <Redirect to='/login' />
        }

        if (userSelected)
            return <Redirect to={redirectTo} />

        if (users.loading)
            return (<div style={{ paddingTop: '600px' }}>
                <Dimmer active>
                    <Loader active size='massive' inline='centered' />
                </Dimmer>
            </div>);

        if (friends.loading)
            return (<div style={{ paddingTop: '600px' }}>
                <Dimmer active>
                    <Loader active size='massive' inline='centered' />
                </Dimmer>
            </div>);

        if (requests.loading)
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
                <Modal style={modalStyles.confirmDeleteModal} size='tiny' open={confirmDelete} onClose={this.close}>
                    <Modal.Header style={{ backgroundColor: '#374785', color: 'white' }}>Remove Friend</Modal.Header>
                    <Modal.Content style={{ backgroundColor: '#a8d0e6' }}>
                        <Header as='h2' style={{ color: 'white' }}>Are you sure you want to remove {targetedFriendName} from your friends?</Header>
                    </Modal.Content>
                    <Modal.Actions style={{ backgroundColor: '#374785' }}>
                        <Button negative onClick={this.onCancelDeleteFriendClick}>No</Button>
                        <Button positive onClick={this.onConfirmDeleteFriendClick} icon='checkmark' labelPosition='right' content='Yes' />
                    </Modal.Actions>
                </Modal>
                <Container fluid style={{ margin: '5px' }}>
                    <Segment fluid='true' style={{ backgroundColor: '#a8d0e6', minHeight: '275px' }}>
                        <Grid stackable columns='equal'>
                            <Grid.Column>
                                <Container fluid='true' style={{ backgroundColor: '#a8d0e6', minHeight: '275px' }}>
                                    <Header as='h1' textAlign='center'>
                                        <Header.Content style={{ color: 'white' }}>Friends</Header.Content>
                                    </Header>
                                    <Divider style={{ backgroundColor: 'white' }} />
                                    <Card.Group stackable centered itemsPerRow={3} children={this.createFriendCards()} />
                                </Container>
                            </Grid.Column>
                            <Grid.Column>
                                <Grid stackable columns='equal'>
                                    <Grid.Column>
                                        <Container fluid='true' style={{ backgroundColor: '#a8d0e6', minHeight: '275px' }}>
                                            <Header as='h1' textAlign='center'>
                                                <Header.Content style={{ color: 'white' }}>Incoming Requests</Header.Content>
                                            </Header>
                                            <Divider style={{ backgroundColor: 'white' }} />
                                            <Card.Group fluid itemsPerRow={1} children={this.createRequestCards(true)} />
                                        </Container>
                                    </Grid.Column>
                                    <Grid.Column>
                                        <Container fluid='true' style={{ backgroundColor: '#a8d0e6', minHeight: '275px' }}>
                                            <Header as='h1' textAlign='center'>
                                                <Header.Content style={{ color: 'white' }}>Outgoing Requests</Header.Content>
                                            </Header>
                                            <Divider style={{ backgroundColor: 'white' }} />
                                            <Card.Group fluid itemsPerRow={1} children={this.createRequestCards(false)} />
                                        </Container>
                                    </Grid.Column>
                                </Grid>
                            </Grid.Column>
                        </Grid>
                    </Segment>
                    <Segment fluid='true' style={{ backgroundColor: '#a8d0e6' }}>
                        <Grid columns='equal'>
                            <Grid.Column>
                                <Popup trigger={<Checkbox style={{ color: 'white' }} toggle onChange={this.toggleAllStates} checked={showAllStates} />} content='Show All States' />
                            </Grid.Column>
                            <Grid.Column>
                                <Header as='h1' textAlign='center'>
                                    <Header.Content style={{ color: 'white' }}>Find New Friends</Header.Content>
                                </Header>
                            </Grid.Column>
                            <Grid.Column>
                                <Popup trigger={<Button floated='right' onClick={this.refreshUsers} color='blue' icon='refresh' />} content='Refresh' />
                            </Grid.Column>
                        </Grid>
                        <Divider style={{ backgroundColor: 'white' }} />
                        {this.createUserCards()}
                    </Segment>
                </Container>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { users, friends, requests, authentication } = state;
    const { user } = authentication;
    return {
        user,
        friends,
        requests,
        users
    };
}

const connectedFriendsPage = connect(mapStateToProps)(FriendsPage);
export { connectedFriendsPage as FriendsPage };