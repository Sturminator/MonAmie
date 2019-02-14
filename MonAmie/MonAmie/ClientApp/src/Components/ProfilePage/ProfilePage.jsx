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
    state = { currentLength: 0, editMode: false };

    componentDidMount() {
        const { match: { params } } = this.props;
        var idStr = params.userId.split("_")[1];
        var id = parseInt(idStr) / 11;
        this.props.dispatch(userProfileActions.getById(id));
    }

    onBioChange = (e, { value }) => this.setState({ currentLength: value.length });

    onEditButtonClick = (e) => this.setState({ editMode: this.state.editMode ? false : true });

    createTable = () => {
        const { userProfile } = this.props;

        var categories = userProfile.items.categories;
        var table = []

        if (userProfile.items) {
            // Outer loop to create parent
            for (let i = 0; i < categories.length; i++) {
                var children = []
                //Inner loop to create children
                children.push(<Table.Cell>{categories[i].categoryName}</Table.Cell>)
                //Create the parent and add the children
                table.push(<Table.Row children={children} />)
            }
        }

        return table
    }

    render() {
        const { user, userProfile } = this.props;
        const { currentLength, editMode } = this.state;

        if (!userProfile.items)
            return (<div style={{ paddingTop: '600px' }}>
                <Dimmer active>
                    <Loader active size='massive' inline='centered' />
                </Dimmer>
            </div>);
        if (editMode) {

        }

        return (
            <div>
                <NavigationBar>
                </NavigationBar>
                <style>{`html, body {background-color: #41b3a3 !important; } `}</style>
                <Modal style={profileStyles.MiniCenteredModal} size=' tiny' open={editMode} onClose={this.close}>
                    <Modal.Header>Edit Profile</Modal.Header>
                    <Modal.Content>
                        <p>Are you sure you want to edit your profile?</p>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button onClick={this.onEditButtonClick} negative>No</Button>
                        <Button onClick={this.onEditButtonClick} positive icon='checkmark' labelPosition='right' content='Yes' />
                    </Modal.Actions>
                </Modal>
                <Container>
                    <Segment fluid secondary>
                        <Grid fluid columns='equal'>
                            <Grid.Column fluid>
                                <Header sub>Edit Mode: {editMode ? 'Enabled' : 'Disabled'}</Header>
                            </Grid.Column>
                            <Grid.Column fluid>
                            </Grid.Column>
                            <Grid.Column fluid>
                                <Popup trigger={<Button floated='right' onClick={this.onEditButtonClick} primary icon=' edit' />} content='Edit Profile' />
                            </Grid.Column>
                        </Grid>
                        <Container>
                            <Header as='h2' icon textAlign='center'>
                                <Icon name='user' circular />
                                <Header.Content>{userProfile.items.fullName}</Header.Content>
                            </Header>
                            <Grid fluid columns={3}>
                                <Grid.Column fluid style={{ textAlign: "left" }}>
                                    <Header sub>{userProfile.items.gender}</Header>
                                </Grid.Column>
                                <Grid.Column fluid style={{ textAlign: "center" }}>
                                    <Header sub>{userProfile.items.state}</Header>
                                </Grid.Column>
                                <Grid.Column fluid style={{ textAlign: "right" }}>
                                    <Header sub>{userProfile.items.age}</Header>
                                </Grid.Column>
                            </Grid>
                        </Container>
                        <Form fluid>
                            <Segment style={{ textAlign: "right" }}>
                                <TextArea
                                    value={userProfile.items.bio}
                                    style={{ minHeight: 100 }}
                                    MaxLength="500"
                                    onChange={this.onBioChange}
                                    placeholder="Give a brief bio of yourself"
                                />
                                <Divider />
                                <Header sub>Characters: {currentLength} / 500</Header>
                        </Segment>
                        </Form>
                        <Grid fluid stackable columns={2} style={{ paddingTop: '10px' }}>
                            <Grid.Column fluid>
                                <Segment>
                                    <Table style={{ textAlign: 'center' }} basic='very'>
                                        <Table.Header>
                                            <Table.Row>
                                                <Table.HeaderCell>
                                                    <Grid stackable fluid columns='equal'>
                                                        <Grid.Column fluid>
                                                        </Grid.Column>
                                                        <Grid.Column fluid>
                                                            <Header size='large'>Interests</Header>
                                                        </Grid.Column>
                                                        <Grid.Column fluid>
                                                            <Button
                                                                floated='right'
                                                                size='tiny' primary icon>
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
                            <Grid.Column fluid>
                                <Segment>
                                    <Table style={{ textAlign: 'center' }} basic='very'>
                                        <Table.Header>
                                            <Table.Row>
                                                <Table.HeaderCell>
                                                    <Grid stackable fluid columns='equal'>
                                                        <Grid.Column fluid>
                                                        </Grid.Column>
                                                        <Grid.Column fluid>
                                                            <Header size='large'>Groups</Header>
                                                        </Grid.Column>
                                                        <Grid.Column fluid>
                                                            <Button
                                                                floated='right'
                                                                size='tiny' primary icon>
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