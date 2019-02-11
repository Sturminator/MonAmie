import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Grid, Image, Button } from 'semantic-ui-react';
import { NavigationBar } from '../../Components';
import art from '../../Images/Categories/art.jpg';
import automotive from '../../Images/Categories/automotive.jpg';
import boardgames from '../../Images/Categories/boardgames.jpg';


class HomePage extends Component {
    render() {
        const { user } = this.props;

        return (
            <div>
                <NavigationBar>
                </NavigationBar>
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
            </div>
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

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };