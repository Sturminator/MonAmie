import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { NavigationBar } from '../../Components';
import { userActions, friendActions } from '../../Actions';
import { Segment, Container, Grid, Header, Divider, Card, Dimmer, Loader, Button, Popup, Modal } from 'semantic-ui-react';
import { history } from '../../Helpers';
import modalStyles from '../../Styles/modal.styles';

class FriendsPage extends Component {
    state = {
        userSelected: false,
        redirectTo: "",
        confirmDelete: false,
        targetedFriendName: "",
        targetedFriendId: -1,
        updateUserList: false,
        acceptedRequest: false,
        currentUsers: []
    };

    componentDidMount() {
        const { user } = this.props;

        this.props.dispatch(friendActions.getAllFriends(user.id));
        this.props.dispatch(friendActions.getAllRequests(user.id));
        this.props.dispatch(userActions.getAllForUser(user.id));
    }

    componentDidUpdate() {
        const { user } = this.props;
        const { acceptedRequest, updateUserList } = this.state;

        if (updateUserList) {
            if (acceptedRequest) {
                this.props.dispatch(friendActions.getAllRequests(user.id));
            }
            this.props.dispatch(userActions.getAllForUser(user.id));

            this.setState({
                updateUserList: false,
                acceptedRequest: false
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

    onConfirmDeleteFriendClick = (e) => {
        const { user } = this.props;
        const { targetedFriendId } = this.state;

        if (targetedFriendId != -1) {
            this.props.dispatch(friendActions.removeFriend(user.id, targetedFriendId));
        }

        this.setState({
            confirmDelete: false,
            updateUserList: true,
            targetedFriendName: "",
            targetedFriendId: -1
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
        const { user } = this.props;       

        if (value) {
            this.props.dispatch(friendActions.addFriend(user.id, value.id));

            this.setState({
                updateUserList: true
            });
        }
    };

    acceptRequest = (e, { value }) => {
        const { user } = this.props;

        if (value) {
            this.props.dispatch(friendActions.acceptRequest(user.id, value.id));

            this.setState({
                updateUserList: true,
                acceptedRequest: true
            });
        }
    };

    denyRequest = (e, { value }) => {
        const { user } = this.props;

        if (value) {
            this.props.dispatch(friendActions.denyRequest(user.id, value.id));

            this.setState({
                updateUserList: true
            });
        }
    };

    cancelRequest = (e, { value }) => {
        const { user } = this.props;

        if (value) {
            this.props.dispatch(friendActions.cancelRequest(user.id, value.id));

            this.setState({
                updateUserList: true
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
                    children.push(<Card.Header>
                        <Grid fluid='true' columns='equal'>
                            <Grid.Column>
                                <Popup trigger={<Button value={friends.items[i]} floated='left' onClick={this.onDeleteFriendClick} color='red' icon='remove user' />} content='Remove Friend' />
                            </Grid.Column>
                            <Grid.Column>
                                {friends.items[i].firstName + ' ' + friends.items[i].lastName}
                            </Grid.Column>
                            <Grid.Column>
                                <Popup trigger={<Button value={friends.items[i]} floated='right' onClick={this.goToProfile} color='blue' icon='user' />} content='View Profile' />
                            </Grid.Column>
                        </Grid>
                    </Card.Header>)
                    children.push(<Card.Meta>{friends.items[i].gender}</Card.Meta>)
                    children.push(<Card.Description>{friends.items[i].firstName + ' lives in ' +
                        friends.items[i].state + ' and is ' + friends.items[i].age + ' years old.'}</Card.Description>)
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
                    children.push(<Card.Header>
                        <Grid fluid='true' columns='equal'>
                            <Grid.Column>
                            </Grid.Column>
                            <Grid.Column>
                                {requests.items[i].firstName + ' ' + requests.items[i].lastName}
                            </Grid.Column>
                            <Grid.Column>
                                <Popup trigger={<Button value={requests.items[i]} floated='right' onClick={this.goToProfile} color='blue' icon='user' />} content='View Profile' />
                            </Grid.Column>
                        </Grid>
                        </Card.Header>)
                    children.push(<Card.Meta>{requests.items[i].gender}</Card.Meta>)
                    children.push(<Card.Description>{requests.items[i].firstName + ' lives in ' +
                        requests.items[i].state + ' and is ' + requests.items[i].age + ' years old.'}</Card.Description>)
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
            for (let i = 0; i < users.items.length; i++) {
                if (user.id != users.items[i].id) {
                    var children = []
                    //Inner loop to create children
                    children.push(<Card.Header>
                        <Grid fluid='true' columns='equal'>
                            <Grid.Column>
                            </Grid.Column>
                            <Grid.Column>
                                {users.items[i].firstName + ' ' + users.items[i].lastName}
                            </Grid.Column>
                            <Grid.Column>
                                <Popup trigger={<Button value={users.items[i]} floated='right' onClick={this.goToProfile} color='blue' icon='user' />} content='View Profile' />
                            </Grid.Column>
                        </Grid>
                    </Card.Header>)
                    children.push(<Card.Meta key={i + 1}>{users.items[i].gender}</Card.Meta>)
                    children.push(<Card.Description key={i + 2}></Card.Description>)
                    children.push(<Card.Content extra><Divider style={{ backgroundColor: 'white' }} />
                        <Button onClick={this.addFriend} value={users.items[i]} fluid color='green'>Send Friend Request</Button>
                            </Card.Content>)
                    //Create the parent and add the children
                    cards.push(<Card style={{ backgroundColor: '#374785' }} key={i + 1} value={users.items[i]} > <Card.Content textAlign='center' children={children} /></ Card>)
                }
            }
        }

        return cards
    }

    render() {
        const { user, users, friends, requests } = this.props;
        const { userSelected, redirectTo, confirmDelete, targetedFriendName } = this.state;

        if (!user) {
            return <Redirect to='/login' />
        }

        if (userSelected)
            return <Redirect to={redirectTo} />

        if (!users.items || !requests.items || !friends.items)
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
                    <Grid stackable columns='equal'>
                        <Grid.Column>
                            <Segment fluid='true' style={{ backgroundColor: '#a8d0e6', minHeight: '275px' }}>
                                <Header as='h1' textAlign='center'>
                                    <Header.Content style={{ color: 'white' }}>Friends</Header.Content>
                                </Header>
                                <Divider style={{backgroundColor: 'white'}} />
                                <Card.Group stackable centered itemsPerRow={3} children={this.createFriendCards()} />
                            </Segment>
                        </Grid.Column>
                        <Grid.Column>
                            <Grid stackable columns='equal'>
                                <Grid.Column>
                                    <Segment fluid='true' style={{ backgroundColor: '#a8d0e6', minHeight: '275px' }}>
                                        <Header as='h1' textAlign='center'>
                                            <Header.Content style={{ color: 'white' }}>Incoming Requests</Header.Content>
                                        </Header>
                                        <Divider style={{ backgroundColor: 'white' }} />
                                        <Card.Group fluid itemsPerRow={1} children={this.createRequestCards(true)} />
                                    </Segment>
                                </Grid.Column>
                                <Grid.Column>
                                    <Segment fluid='true' style={{ backgroundColor: '#a8d0e6', minHeight: '275px' }}>
                                        <Header as='h1' textAlign='center'>
                                            <Header.Content style={{ color: 'white' }}>Outgoing Requests</Header.Content>
                                        </Header>
                                        <Divider style={{ backgroundColor: 'white' }} />
                                        <Card.Group fluid itemsPerRow={1} children={this.createRequestCards(false)} />
                                    </Segment>
                                </Grid.Column>
                            </Grid>
                        </Grid.Column>
                    </Grid>
                    <Segment fluid='true' style={{ backgroundColor: '#a8d0e6' }}>
                        <Header as='h1' textAlign='center'>
                            <Header.Content style={{ color: 'white' }}>Find New Friends</Header.Content>
                        </Header>
                        <Divider style={{ backgroundColor: 'white' }} />
                        <Card.Group centered children={this.createUserCards()} />
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