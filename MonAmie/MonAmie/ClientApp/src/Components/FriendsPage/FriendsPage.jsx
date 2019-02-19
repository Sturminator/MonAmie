import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { NavigationBar } from '../../Components';
import { userActions } from '../../Actions';
import { Segment, Container, Grid, Header, Divider, Card, Dimmer, Loader } from 'semantic-ui-react';
import { history } from '../../Helpers';

class FriendsPage extends Component {
    state = { userSelected: false, redirectTo: "" };

    componentDidMount() {
        this.props.dispatch(userActions.getAll());
    }

    onCardClick = (e, { value }) => {
        history.push('/friends');

        this.setState({
            userSelected: true,
            redirectTo: '/profile/' +
                value.firstName.toLowerCase() + '_' + value.id * 11
        });
    };

    createCards = () => {
        const { users, user } = this.props;

        var cards = []

        if (users.items) {
            // Outer loop to create parent
            for (let i = 0; i < users.items.length; i++) {
                if (user.id != users.items[i].id) {
                    var children = []
                    //Inner loop to create children
                    children.push(<Card.Header>{users.items[i].firstName + ' ' + users.items[i].lastName}</Card.Header>)
                    children.push(<Card.Meta>{users.items[i].gender}</Card.Meta>)
                    children.push(<Card.Description>{users.items[i].firstName + ' lives in ' +
                        users.items[i].state + ' and is ' + users.items[i].age + ' years old.'}</Card.Description>)
                    //Create the parent and add the children
                    cards.push(<Card style={{ backgroundColor: '#374785'}} onClick={this.onCardClick} value={users.items[i]} > <Card.Content textAlign='center' children={children} /></ Card>)
                }
            }
        }

        return cards
    }

    render() {
        const { user, users } = this.props;
        const { userSelected, redirectTo } = this.state;

        if (!user) {
            return <Redirect to='/login' />
        }

        if (userSelected)
            return <Redirect to={redirectTo} />

        if (!users.items)
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
                            <Segment fluid='true' style={{ backgroundColor: '#a8d0e6', minHeight: '250px' }}>
                                <Header as='h1' textAlign='center'>
                                    <Header.Content style={{ color: 'white' }}>Friends</Header.Content>
                                </Header>
                                <Divider style={{backgroundColor: 'white'}} />
                            </Segment>
                        </Grid.Column>
                        <Grid.Column>
                            <Segment fluid='true' style={{ backgroundColor: '#a8d0e6', minHeight: '250px' }}>
                                <Header as='h1' textAlign='center'>
                                    <Header.Content style={{ color: 'white' }}>Friend Requests</Header.Content>
                                </Header>
                                <Divider style={{ backgroundColor: 'white' }} />
                            </Segment>
                        </Grid.Column>
                    </Grid>
                    <Segment fluid='true' style={{ backgroundColor: '#a8d0e6' }}>
                        <Header as='h1' textAlign='center'>
                            <Header.Content style={{ color: 'white' }}>Find New Friends</Header.Content>
                        </Header>
                        <Divider style={{ backgroundColor: 'white' }} />
                        <Card.Group children={this.createCards()} />
                    </Segment>
                </Container>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return {
        user,
        users
    };
}

const connectedFriendsPage = connect(mapStateToProps)(FriendsPage);
export { connectedFriendsPage as FriendsPage };