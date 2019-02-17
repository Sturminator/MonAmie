import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { NavigationBar } from '../../Components';
import { userProfileActions } from '../../Actions';
import {
    Table, Form, Segment, TextArea, Divider, Header,
    Icon, Grid, Container, Loader, Dimmer, Button, Popup, Modal
} from 'semantic-ui-react';

import profileStyles from '../../Styles/profile.styles';

class ProfilePage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            bio: "",
            editMode: false
        };
    }

    componentDidMount() {
        const { match: { params } } = this.props;
        var idStr = params.userId.split("_")[1];
        var id = parseInt(idStr) / 11;
        this.props.dispatch(userProfileActions.getById(id));
    }

    onBioChange = (e, { value }) => this.setState({
        bio: value
    });

    onEditButtonClick = (e) => this.setState({
        editMode: this.state.editMode ? false : true,
        bio: this.props.userProfile.items.bio
    });

    onCancelEditClick = (e) => this.setState({
        editMode: this.state.editMode ? false : true
    });

    onSaveEditClick = (e) => {
        const { userProfile } = this.props;
        const { bio } = this.state;

        userProfile.items.bio = bio;

        this.setState({
            editMode: this.state.editMode ? false : true
        });

        this.props.dispatch(userProfileActions.update(userProfile))       
    };

    createTable = () => {
        const { userProfile } = this.props;

        var categories = userProfile.items.categories;
        var table = []

        if (userProfile.items) {
            // Outer loop to create parent
            for (let i = 0; i < categories.length; i++) {
                var children = []
                //Inner loop to create children
                children.push(<Table.Cell key={i + 1}>{categories[i].categoryName}</Table.Cell>)
                //Create the parent and add the children
                table.push(<Table.Row key={i + 1} children={children} />)
            }
        } 

        return table
    }

    render() {
        const { user, userProfile } = this.props;
        const { bio, editMode } = this.state;

        if (!userProfile.items) {
            return (<div style={{ paddingTop: '600px' }}>
                <Dimmer active>
                    <Loader active size='massive' inline='centered' />
                </Dimmer>
            </div>);
        }

        if (userProfile.items.id != user.id) {
            return (
                <div>
                    <NavigationBar>
                    </NavigationBar>
                    <style>{`html, body {background-color: #24305E !important; } `}</style>
                    <Container style={{ marginTop: '50px' }}>
                        <Segment fluid='true' style={{ backgroundColor: '#a8d0e6' }}>
                            <Grid fluid='true' columns='equal'>
                                <Grid.Column>
                                </Grid.Column>
                                <Grid.Column>
                                </Grid.Column>
                                <Grid.Column>
                                </Grid.Column>
                            </Grid>
                            <Container>
                                <Header as='h1' icon textAlign='center'>
                                    <Icon name='user' />
                                    <Header.Content style={{ color: 'white' }}>{userProfile.items.fullName}</Header.Content>
                                </Header>
                                <Grid fluid='true' columns={3}>
                                    <Grid.Column style={{ textAlign: "left" }}>
                                        <Header as='h3' style={{ color: 'white' }}>{userProfile.items.gender}</Header>
                                    </Grid.Column>
                                    <Grid.Column style={{ textAlign: "center" }}>
                                        <Header as='h3' style={{ color: 'white' }}>{userProfile.items.state}</Header>
                                    </Grid.Column>
                                    <Grid.Column style={{ textAlign: "right" }}>
                                        <Header as='h3' style={{ color: 'white' }}>{userProfile.items.age}</Header>
                                    </Grid.Column>
                                </Grid>
                            </Container>
                            <Segment style={{ backgroundColor: '#374785', minHeight: '150px' }}>
                                <Header size='large' style={{ color: 'white' }} textAlign='center'>Bio</Header>
                                <Divider style={{ backgroundColor: 'white' }} />
                                <Container style={{ color: 'white' }} content={userProfile.items.bio} />
                            </Segment>
                            <Grid fluid='true' stackable columns={2} style={{ paddingTop: '10px' }}>
                                <Grid.Column>
                                    <Segment style={{ backgroundColor: '#374785', minHeight: '250px' }}>
                                        <Table style={{ textAlign: 'center', color: 'white' }} basic='very'>
                                            <Table.Header>
                                                <Table.Row>
                                                    <Table.HeaderCell>
                                                        <Grid stackable fluid='true' columns='equal'>
                                                            <Grid.Column>
                                                            </Grid.Column>
                                                            <Grid.Column>
                                                                <Header size='large' style={{ color: 'white' }}>Interests</Header>
                                                            </Grid.Column>
                                                            <Grid.Column>
                                                            </Grid.Column>
                                                        </Grid>
                                                    </Table.HeaderCell>
                                                </Table.Row>
                                            </Table.Header>
                                            <Table.Body>
                                                {this.createTable()}
                                            </Table.Body>
                                        </Table>
                                    </Segment>
                                </Grid.Column>
                                <Grid.Column>
                                    <Segment style={{ backgroundColor: '#374785', minHeight: '250px' }}>
                                        <Table style={{ textAlign: 'center', color: 'white' }} basic='very' celled>
                                            <Table.Header>
                                                <Table.Row>
                                                    <Table.HeaderCell>
                                                        <Grid stackable fluid='true' columns='equal'>
                                                            <Grid.Column>
                                                            </Grid.Column>
                                                            <Grid.Column>
                                                                <Header size='large' style={{ color: 'white' }}>Groups</Header>
                                                            </Grid.Column>
                                                            <Grid.Column>    
                                                            </Grid.Column>
                                                        </Grid>
                                                    </Table.HeaderCell>
                                                </Table.Row>
                                            </Table.Header>
                                            <Table.Body>
                                                {this.createTable()}
                                            </Table.Body>
                                        </Table>
                                    </Segment>
                                </Grid.Column>
                            </Grid>
                        </Segment>
                    </Container>
                </div>
            );
        }

        return (
            <div>
                <NavigationBar>
                </NavigationBar>
                <style>{`html, body {background-color: #24305E !important; } `}</style>
                <Modal style={profileStyles.MiniCenteredModal} size='tiny' open={editMode} onClose={this.close}>
                    <Modal.Header style={{ backgroundColor: '#374785', color: 'white' }}>Edit Profile</Modal.Header>
                    <Modal.Content style={{ backgroundColor: '#a8d0e6' }}>
                        <Form fluid='true'>
                            <Segment style={{ textAlign: "right", backgroundColor: '#374785' }}>
                                <TextArea
                                    value={bio}
                                    style={{ minHeight: 100 }}
                                    maxLength="500"
                                    onChange={this.onBioChange}
                                    placeholder="Give a brief bio of yourself"
                                />
                                <Header sub style={{ color: 'white' }}>Characters: {bio ? bio.length : 0} / 500</Header>
                            </Segment>
                        </Form>
                    </Modal.Content>
                    <Modal.Actions style={{ backgroundColor: '#374785'}}>
                        <Button onClick={this.onCancelEditClick} negative>Cancel</Button>
                        <Button onClick={this.onSaveEditClick} positive icon='checkmark' labelPosition='right' content='Save' />
                    </Modal.Actions>
                </Modal>
                <Container style={{ marginTop: '50px' }}>
                    <Segment fluid='true' style={{ backgroundColor: '#a8d0e6' }}>
                        <Grid fluid='true' columns='equal'>
                            <Grid.Column>
                            </Grid.Column>
                            <Grid.Column>
                            </Grid.Column>
                            <Grid.Column>
                                <Popup trigger={<Button floated='right' onClick={this.onEditButtonClick} style={{ backgroundColor: '#24305e' }} inverted icon='edit' />} content='Edit Profile' />
                            </Grid.Column>
                        </Grid>
                        <Container>
                            <Header as='h1' icon textAlign='center'>
                                <Icon name='user' />
                                <Header.Content style={{ color: 'white' }}>{userProfile.items.fullName}</Header.Content>
                            </Header>
                            <Grid fluid='true' columns={3}>
                                <Grid.Column style={{ textAlign: "left" }}>
                                    <Header as='h3' style={{ color: 'white' }}>{userProfile.items.gender}</Header>
                                </Grid.Column>
                                <Grid.Column style={{ textAlign: "center" }}>
                                    <Header as='h3'  style={{ color: 'white' }}>{userProfile.items.state}</Header>
                                </Grid.Column>
                                <Grid.Column style={{ textAlign: "right" }}>
                                    <Header as='h3'  style={{ color: 'white' }}>{userProfile.items.age}</Header>
                                </Grid.Column>
                            </Grid>
                        </Container>
                        <Segment style={{ backgroundColor: '#374785', minHeight: '150px' }}>
                            <Header size='large' style={{ color: 'white' }} textAlign='center'>Bio</Header>
                            <Divider style={{ backgroundColor: 'white' }} />
                            <Container style={{ color: 'white' }} content={userProfile.items.bio} />
                        </Segment>
                        <Grid fluid='true' stackable columns={2} style={{ paddingTop: '10px' }}>
                            <Grid.Column>
                                <Segment style={{ backgroundColor: '#374785', minHeight: '250px' }}>
                                    <Table style={{ textAlign: 'center', color: 'white' }} basic='very'>
                                        <Table.Header>
                                            <Table.Row>
                                                <Table.HeaderCell>
                                                    <Grid stackable fluid='true' columns='equal'>
                                                        <Grid.Column>
                                                        </Grid.Column>
                                                        <Grid.Column>
                                                            <Header size='large' style={{ color: 'white' }}>Interests</Header>
                                                        </Grid.Column>
                                                        <Grid.Column>
                                                            <Button
                                                                floated='right'
                                                                style={{ backgroundColor: '#24305e' }} inverted
                                                                size='tiny' icon>
                                                                <Icon name='edit' />
                                                            </Button>
                                                        </Grid.Column>
                                                    </Grid>
                                                </Table.HeaderCell>
                                            </Table.Row>
                                        </Table.Header>
                                        <Table.Body>
                                            {this.createTable()}
                                        </Table.Body>
                                    </Table>
                                </Segment>
                            </Grid.Column>
                            <Grid.Column>
                                <Segment style={{ backgroundColor: '#374785', minHeight: '250px' }}>
                                    <Table style={{ textAlign: 'center', color: 'white' }} basic='very' celled>
                                        <Table.Header>
                                            <Table.Row>
                                                <Table.HeaderCell>
                                                    <Grid stackable fluid='true' columns='equal'>
                                                        <Grid.Column>
                                                        </Grid.Column>
                                                        <Grid.Column>
                                                            <Header size='large' style={{ color: 'white' }}>Groups</Header>
                                                        </Grid.Column>
                                                        <Grid.Column>
                                                            <Button
                                                                floated='right'
                                                                style={{ backgroundColor: '#24305e' }}
                                                                inverted
                                                                size='tiny' icon>
                                                                <Icon name='edit' />
                                                            </Button>
                                                        </Grid.Column>
                                                    </Grid>
                                                </Table.HeaderCell>
                                            </Table.Row>
                                        </Table.Header>
                                        <Table.Body>
                                            {this.createTable()}
                                        </Table.Body>
                                    </Table>
                                </Segment>
                            </Grid.Column>
                        </Grid>
                    </Segment>
                </Container>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { userProfile, authentication } = state;
    const { user } = authentication;
    return {
        user,
        userProfile
    };
}

const connectedProfilePage = connect(mapStateToProps)(ProfilePage);
export { connectedProfilePage as ProfilePage };