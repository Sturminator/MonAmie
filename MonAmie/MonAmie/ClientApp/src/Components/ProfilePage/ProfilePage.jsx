import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { NavigationBar } from '../../Components';
import { userProfileActions, categoryActions } from '../../Actions';
import {
    Table, Form, Segment, TextArea, Divider, Header,
    Icon, Grid, Container, Loader, Dimmer, Button, Popup, Modal
} from 'semantic-ui-react';

import profileStyles from '../../Styles/profile.styles';

class ProfilePage extends Component {
    state = {
        originalCategories: [],
        newCategories: [],
        bio: "",
        editProfile: false,
        editCategories: false
    };

    componentDidMount() {
        const { match: { params } } = this.props;
        var idStr = params.userId.split("_")[1];
        var id = parseInt(idStr) / 11;
        this.props.dispatch(userProfileActions.getById(id));
        this.props.dispatch(categoryActions.getAll());
    }

    componentWillReceiveProps(props) {
        const { location } = this.props;

        if (location.pathname != props.location.pathname) {
            var idStr = props.location.pathname.split("_")[1];
            var id = parseInt(idStr) / 11;
            this.props.dispatch(userProfileActions.getById(id));
        }
    }

    onBioChange = (e, { value }) => this.setState({
        bio: value
    });

    onEditCategoriesButtonClick = (e) => {
        const { originalCategories, newCategories } = this.state;
        const { userProfile } = this.props;

        var currentCategories = userProfile.items.categories;

        for (let i = 0; i < currentCategories.length; i++) {
            originalCategories.push(currentCategories[i]);
            newCategories.push(currentCategories[i]);
        }

        this.setState({
            originalCategories: originalCategories,
            newCategories: newCategories,
            editCategories: this.state.editCategories ? false : true,
        })
    };

    onCancelCategoriesEditClick = (e) => this.setState({
        originalCategories: [],
        newCategories: [],
        editCategories: this.state.editCategories ? false : true
    });

    onSaveCategoriesEditClick = (e) => {
        var categories = [...this.state.newCategories];
        const { userProfile } = this.props;

        userProfile.items.categories = categories;

        this.setState({
            originalCategories: [],
            newCategories: [],
            editCategories: this.state.editCategories ? false : true
        })

        this.props.dispatch(userProfileActions.updateCategories(userProfile));  
    };

    onEditProfileButtonClick = (e) => this.setState({
        editProfile: this.state.editProfile ? false : true,
        bio: this.props.userProfile.items.bio
    });

    onCancelProfileEditClick = (e) => this.setState({
        editProfile: this.state.editProfile ? false : true
    });

    onAddInterestToUser = (e, { value }) => {
        var array = [...this.state.newCategories];

        array.push(value);

        array.sort(function (a, b) {
            var nameA = a.categoryName.toLowerCase(); // ignore upper and lowercase
            var nameB = b.categoryName.toLowerCase(); // ignore upper and lowercase
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }

            // names must be equal
            return 0;
        });

        this.setState({
            newCategories: array
        });
    };

    onRemoveInterestFromUser = (e, { value }) => {
        var array = [...this.state.newCategories];

        var index = array.indexOf(value)
        if (index !== -1) {
            array.splice(index, 1);
        }

        this.setState({
            newCategories: array
        });
    };

    onSaveProfileEditClick = (e) => {
        const { userProfile } = this.props;
        const { bio } = this.state;

        userProfile.items.bio = bio;

        this.setState({
            editProfile: this.state.editProfile ? false : true
        });

        this.props.dispatch(userProfileActions.update(userProfile));     
    };

    createUserCategoriesTable = () => {
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

    createCategoriesTable = (userHas) => {
        const { categories } = this.props;
        const { newCategories } = this.state;

        var table = []

        if (categories.items) {
            if (userHas) {
                for (let i = 0; i < newCategories.length; i++) {
                    var children = []
                    //Inner loop to create children
                    children.push(<Table.Cell key={i + 1}>{newCategories[i].categoryName}</Table.Cell>)
                    children.push(<Table.Cell key={i + 1}><Button onClick={this.onRemoveInterestFromUser} value={newCategories[i]} size='tiny' icon color='red'><Icon name='minus' /></Button></Table.Cell>)
                    //Create the parent and add the children
                    table.push(<Table.Row key={i + 1} children={children} />)
                }
            }
            else {
                // Outer loop to create parent
                for (let i = 0; i < categories.items.length; i++) {
                    if (!newCategories.some(uc => uc.categoryId === categories.items[i].categoryId)) {
                        var children = []
                        //Inner loop to create children
                        children.push(<Table.Cell key={i + 1}>{categories.items[i].categoryName}</Table.Cell>)
                        children.push(<Table.Cell key={i + 1}><Button onClick={this.onAddInterestToUser} value={categories.items[i]} size='tiny' icon color='green'><Icon name='plus' /></Button></Table.Cell>)
                        //Create the parent and add the children
                        table.push(<Table.Row key={i + 1} children={children} />)
                    }                    
                }
            }    
        }

        return table
    }

    render() {
        const { user, userProfile } = this.props;
        const { bio, editProfile, editCategories } = this.state;

        if (!user) {
            return <Redirect to='/login' />
        }

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
                                                {this.createUserCategoriesTable()}
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
                                                {this.createUserCategoriesTable()}
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
                <Modal style={profileStyles.EditCategoriesModal} size='tiny' open={editCategories} onClose={this.close}>
                    <Modal.Header style={{ backgroundColor: '#374785', color: 'white' }}>Edit Interests</Modal.Header>
                    <Modal.Content style={{ backgroundColor: '#a8d0e6' }}>
                        <Grid fluid='true' stackable columns={2} style={{ paddingTop: '10px' }}>
                            <Grid.Column>
                                <Segment style={{ backgroundColor: '#374785', minHeight: '250px' }}>
                                    <Header size='large' style={{ textAlign: 'center', color: 'white' }}>Interests</Header>
                                    <Table style={{ textAlign: 'center', color: 'white' }} basic='very' celled>
                                        <Table.Body>
                                            {this.createCategoriesTable(false)}
                                        </Table.Body>
                                    </Table>
                                </Segment>
                            </Grid.Column>
                            <Grid.Column>
                                <Segment style={{ backgroundColor: '#374785', minHeight: '250px' }}>
                                    <Header size='large' style={{ textAlign: 'center', color: 'white' }}>My Interests</Header>
                                    <Table style={{ textAlign: 'center', color: 'white' }} basic='very' celled>
                                        <Table.Body>
                                            {this.createCategoriesTable(true)}
                                        </Table.Body>
                                    </Table>
                                </Segment>
                            </Grid.Column>
                        </Grid>
                    </Modal.Content>
                    <Modal.Actions style={{ backgroundColor: '#374785' }}>
                        <Button onClick={this.onCancelCategoriesEditClick} negative>Cancel</Button>
                        <Button onClick={this.onSaveCategoriesEditClick} positive icon='checkmark' labelPosition='right' content='Save' />
                    </Modal.Actions>
                </Modal>
                <Modal style={profileStyles.EditProfileModal} size='tiny' open={editProfile} onClose={this.close}>
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
                        <Button onClick={this.onCancelProfileEditClick} negative>Cancel</Button>
                        <Button onClick={this.onSaveProfileEditClick} positive icon='checkmark' labelPosition='right' content='Save' />
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
                                <Popup trigger={<Button floated='right' onClick={this.onEditProfileButtonClick} color='blue' icon='edit' />} content='Edit Profile' />
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
                                                            <Popup trigger={<Button floated='right' onClick={this.onEditCategoriesButtonClick} color='blue' icon='edit' size='tiny' />} content='Edit Interests' />
                                                        </Grid.Column>
                                                    </Grid>
                                                </Table.HeaderCell>
                                            </Table.Row>
                                        </Table.Header>
                                        <Table.Body>
                                            {this.createUserCategoriesTable()}
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
                                            {this.createUserCategoriesTable()}
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
    const { userProfile, authentication, categories } = state;
    const { user } = authentication;
    return {
        user,
        userProfile,
        categories
    };
}

const connectedProfilePage = connect(mapStateToProps)(ProfilePage);
export { connectedProfilePage as ProfilePage };