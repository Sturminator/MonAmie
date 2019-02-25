import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Card, Grid, Image, Dimmer, Loader } from 'semantic-ui-react';
import { NavigationBar } from '../../Components';
import { userActions } from '../../Actions';

import './card_theme.css';

import art from '../../Images/Categories/art.jpg';
import automotive from '../../Images/Categories/automotive.jpg';
import boardgames from '../../Images/Categories/boardgames.jpg';


class HomePage extends Component {
    state = { userSelected: false, redirectTo: "" };

    render() {
        const { user, users } = this.props;
        const { userSelected, redirectTo } = this.state;

        if (!user) {
            return <Redirect to='/login' />
        }

        if (userSelected)
            return <Redirect to={redirectTo} />

        return (
            <div>
                <NavigationBar>
                </NavigationBar>
                <style>{`html, body {background-color: #24305E !important; } `}</style>
                <div style={{ padding: '25px' }}>
                    <Grid columns='equal' stackable>
                        <Grid.Row stretched>
                            <Grid.Column>
                            </Grid.Column>
                            <Grid.Column>
                                <Card href='#card-example-link-card'>
                                    <Image src={art}/>
                                    <Card.Content textAlign='center'>
                                        <Card.Header>Art</Card.Header>
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