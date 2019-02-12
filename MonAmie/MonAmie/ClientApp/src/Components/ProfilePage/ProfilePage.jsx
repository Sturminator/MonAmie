import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { NavigationBar } from '../../Components';
import { userProfileActions } from '../../Actions';
import {
    Table, Form, Segment, TextArea, Divider, Header,
    Icon, Grid, Container, Loader, Dimmer, Button, Popup
} from 'semantic-ui-react';

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
                <div style={{ padding: '25px' }}>
                    <Segment>
                        <Popup trigger={<Button onClick={this.onEditButtonClick} primary icon='edit' />} content='Edit Profile' />
                        <Header sub>Edit Mode: {editMode ? 'Enabled' : 'Disabled'}</Header>
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
                                Characters: {currentLength} / 500
                        </Segment>
                        </Form>
                        <Grid columns={2} style={{ paddingTop: '10px' }}>
                            <Grid.Column>
                                <Segment>
                                    <Table style={{ textAlign: 'center' }} basic='very'>
                                        <Table.Header>
                                            <Table.Row>
                                                <Table.HeaderCell>Interests</Table.HeaderCell>
                                            </Table.Row>
                                        </Table.Header>
                                        <Table.Body>
                                            {this.createTable()}
                                        </Table.Body>
                                    </Table>
                                </Segment>
                            </Grid.Column>
                            <Grid.Column>
                                <Segment>
                                    <Table style={{ textAlign: 'center' }} basic='very'>
                                        <Table.Header>
                                            <Table.Row>
                                                <Table.HeaderCell>Groups</Table.HeaderCell>
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
                </div>
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