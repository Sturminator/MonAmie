import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Grid, Image, Dimmer, Loader } from 'semantic-ui-react';
import { NavigationBar } from '../../Components';
import { userActions } from '../../Actions';

import art from '../../Images/Categories/art.jpg';
import automotive from '../../Images/Categories/automotive.jpg';
import boardgames from '../../Images/Categories/boardgames.jpg';


class HomePage extends Component {
    componentDidMount() {
        const { user } = this.props;
        this.props.dispatch(userActions.getAll());
    }

    onCardClick = (e, { value }) => {
        var val = value;
    };

    createCards = () => {
        const { users } = this.props;

        var cards = []

        if (users.items) {
            // Outer loop to create parent
            for (let i = 0; i < users.items.length; i++) {
                var children = []
                //Inner loop to create children
                children.push(<Card.Header>{users.items[i].firstName + ' ' + users.items[i].lastName}</Card.Header>)
                children.push(<Card.Meta>{users.items[i].gender}</Card.Meta>)
                children.push(<Card.Description>{users.items[i].firstName + ' lives in ' +
                    users.items[i].state + ' and is ' + users.items[i].age + ' years old.'}</Card.Description>)
                //Create the parent and add the children
                cards.push(<Card onClick={this.onCardClick} value={users.items[i]} > <Card.Content textAlign='center' children={children} /></ Card>)
            }
        }

        return cards
    }

    render() {
        const { user, users } = this.props;

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
                <div style={{ padding: '25px' }}>
                    <Grid columns={5} stackable>
                        <Grid.Row stretched>
                            <Grid.Column>
                            </Grid.Column>
                            <Grid.Column>
                                <Card href='#card-example-link-card'>
                                    <Image src={art} />
                                    <Card.Content textAlign='center'>
                                        <Card.Header >Art</Card.Header>
                                        <Card.Description>Everything artistic, from painting to photography</Card.Description>
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                            <Grid.Column>
                                <Card href='#card-example-link-card'>
                                    <Image src={automotive} />
                                    <Card.Content textAlign='center'>
                                        <Card.Header >Automotive</Card.Header>
                                        <Card.Description>For those who are mechanically inclined</Card.Description>
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                            <Grid.Column>
                                <Card href='#card-example-link-card'>
                                    <Image src={boardgames} />
                                    <Card.Content textAlign='center'>
                                        <Card.Header >Board Games</Card.Header>
                                        <Card.Description>From Monopoly to Chess to D&D, the only requirement is a board</Card.Description>
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                            <Grid.Column>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    <Card.Group children={this.createCards()} />
                </div>
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

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };