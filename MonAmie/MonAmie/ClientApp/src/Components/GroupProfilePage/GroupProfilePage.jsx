import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { NavigationBar } from '../../Components';
import { categoryActions, groupActions } from '../../Actions';
import modalStyles from '../../Styles/modal.styles';
import { states } from '../../Enums';
import { Dimmer, Loader, Container, Segment, Grid, Divider, Button, Icon, Popup, Header, Modal, Form, TextArea, Label } from 'semantic-ui-react';
import { history } from '../../Helpers';

class GroupProfilePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            editedGroup: {
                state: "",
                groupName: "",
                categoryId: null,
                description: "",
            },
            canUpdateGroup: false,
            updateGroup: false,
            deleteGroup: false,
            confirmLeave: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
        this.handleStateChange = this.handleStateChange.bind(this);
    }

    componentDidMount() {
        const { match: { params }, group, categories } = this.props;

        var idStr = params.groupId.split("_")[1];
        var id = parseInt(idStr) / 11;

        if (!categories.items) {
            this.props.dispatch(categoryActions.getAll());
        }

        if (!group.group) {
            this.props.dispatch(groupActions.getGroup(id));
        }
        else if (group.group.groupId != id) {
            this.props.dispatch(groupActions.getGroup(id));
        }
    }

    createCategoryDropdown = () => {
        const { categories } = this.props;

        var categoryOptions = [];

        if (categories.items) {
            for (let i = 0; i < categories.items.length; i++) {
                categoryOptions.push({
                    key: categories.items[i].categoryId, text: categories.items[i].categoryName,
                    value: categories.items[i].categoryId
                });
            }
        }
        return categoryOptions;
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { editedGroup } = this.state;
        var otherField = name === 'groupName' ? editedGroup.description : editedGroup.groupName;

        this.setState({
            editedGroup: {
                ...editedGroup,
                [name]: value
            },
            canUpdateGroup: value != "" > 0 && editedGroup.categoryId > 0 && otherField != "" && editedGroup.state != ""
        });
    }

    handleCategoryChange(event, value) {
        const { editedGroup } = this.state;

        this.setState({
            editedGroup: {
                ...editedGroup,
                categoryId: value.value
            },
            canUpdateGroup: value.value != null && editedGroup.state != "" && editedGroup.groupName != "" && editedGroup.description != ""
        });
    }

    handleStateChange(event, value) {
        const { editedGroup } = this.state;

        this.setState({
            editedGroup: {
                ...editedGroup,
                state: value.value
            },
            canUpdateGroup: value.value != "" && editedGroup.categoryId != null && editedGroup.groupName != "" && editedGroup.description != ""
        });
    }

    onCancelEditGroupButtonClick = () => this.setState({
        updateGroup: false
    });

    onSaveEditGroupButtonClick = (e) => {
        const { editedGroup } = this.state;
        const { group } = this.props;

        group.group.state = editedGroup.state;
        group.group.groupName = editedGroup.groupName;
        group.group.description = editedGroup.description;
        group.group.categoryId = editedGroup.categoryId;

        this.props.dispatch(groupActions.updateGroup(group.group.groupId, group));

        this.setState({
            updateGroup: this.state.updateGroup ? false : true
        })
    };

    onEditGroupButtonClick = () => {
        const { editedGroup } = this.state;
        const { group } = this.props;

        this.setState({
            editedGroup: {
                ...editedGroup,
                state: group.group.state,
                groupName: group.group.groupName,
                description: group.group.description,
                categoryId: group.group.categoryId
            },
            updateGroup: true
        })
    };

    onLeaveGroupLabelClick = () => {
        this.setState({
            confirmLeave: true
        })
    }

    onJoinGroupLabelClick = () => {
        const { group, user } = this.props;

        this.props.dispatch(groupActions.addUserToGroup(user.id, group));
    }

    onCancelLeaveGroupClick = () => {
        this.setState({
            confirmLeave: false
        })
    }

    onConfirmLeaveGroupClick = () => {
        const { group, user } = this.props;

        this.props.dispatch(groupActions.removeUserFromGroup(user.id, group));

        this.setState({
            confirmLeave: false
        })
    }

    onConfirmDeleteGroupClick = () => {
        const { group } = this.props;

        this.props.dispatch(groupActions.deleteGroup(group.group.groupId, group));

        this.setState({
            confirmLeave: false,
            confirmDelete: false,
            deleteGroup: true
        })
    }

    renderMemberLabel = () => {
        const { group, user } = this.props;

        if (group.group.groupMembers.some(gm => gm.userId === user.id)) {
            return (<Popup trigger={<Label onHover={this.onLeaveGroupLabelClick} onClick={this.onLeaveGroupLabelClick} as='a' color='green' attached='top right'>
                <Icon name='checkmark' /> Member
                </Label>} content='Leave Group' />);
        } else {
            return (<Label onClick={this.onJoinGroupLabelClick} as='a' color='blue' attached='top right'>
                <Icon name='add' /> Join Group
                </Label>);
        }
    }

    render() {
        const { group, categories, user } = this.props;
        const { canUpdateGroup, editedGroup, updateGroup, deleteGroup, confirmLeave } = this.state;
        var memberFormat = "Member";

        if (group.loading)
            return (<div style={{ paddingTop: '600px' }}>
                <Dimmer active>
                    <Loader active size='massive' inline='centered' />
                </Dimmer>
            </div>);


        if (deleteGroup)
            return <Redirect to='/groups' />

        if (categories.loading)
            return (<div style={{ paddingTop: '600px' }}>
                <Dimmer active>
                    <Loader active size='massive' inline='centered' />
                </Dimmer>
            </div>);

        if (!group.group)
            return (<div>
                <NavigationBar>
                </NavigationBar>
                <style>{`html, body {background-color: #24305E !important; } `}</style>
            </div>);

        if (group.group.memberCount > 1)
            memberFormat = "Members";

        if (group.group.ownerId != user.id) {
            return (
                <div>
                    <NavigationBar>
                    </NavigationBar>
                    <style>{`html, body {background-color: #24305E !important; } `}</style>
                    <Modal style={modalStyles.confirmDeleteModal} size='tiny' open={confirmLeave} onClose={this.close}>
                        <Modal.Header style={{ backgroundColor: '#374785', color: 'white' }}>Leave Group</Modal.Header>
                        <Modal.Content style={{ backgroundColor: '#a8d0e6' }}>
                            <Header as='h2' style={{ color: 'white' }}>Are you sure you want to leave {group.group.groupName}?</Header>
                        </Modal.Content>
                        <Modal.Actions style={{ backgroundColor: '#374785' }}>
                            <Button negative onClick={this.onCancelLeaveGroupClick}>No</Button>
                            <Button positive onClick={this.onConfirmLeaveGroupClick} icon='checkmark' labelPosition='right' content='Yes' />
                        </Modal.Actions>
                    </Modal>
                    <Container style={{ marginTop: '50px' }}>
                        <Segment fluid='true' style={{ backgroundColor: '#a8d0e6' }}>
                            <Grid fluid='true' columns='equal'>
                                <Grid.Column>
                                    <Header floated='left' as='h3' style={{ color: 'white' }}>Created: {group.group.creationDate}</Header>
                                </Grid.Column>
                                <Grid.Column>
                                </Grid.Column>
                                <Grid.Column>
                                    {this.renderMemberLabel()}
                                </Grid.Column>
                            </Grid>
                            <Container>
                                <Header as='h1' icon textAlign='center'>
                                    <Icon name='group' />
                                    <Header.Content style={{ color: 'white' }}>{group.group.groupName}</Header.Content>
                                </Header>
                                <Grid fluid='true' columns={3}>
                                    <Grid.Column style={{ textAlign: "left" }}>
                                        <Header as='h3' style={{ color: 'white' }}>{group.group.categoryName}</Header>
                                    </Grid.Column>
                                    <Grid.Column style={{ textAlign: "center" }}>
                                        <Header as='h3' style={{ color: 'white' }}>{group.group.state}</Header>
                                    </Grid.Column>
                                    <Grid.Column style={{ textAlign: "right" }}>
                                        <Header as='h3' style={{ color: 'white' }}>{group.group.memberCount} {memberFormat}</Header>
                                    </Grid.Column>
                                </Grid>
                            </Container>
                            <Segment style={{ backgroundColor: '#374785', minHeight: '150px' }}>
                                <Header size='large' style={{ color: 'white' }} textAlign='center'>Description</Header>
                                <Divider style={{ backgroundColor: 'white' }} />
                                <Container style={{ color: 'white' }} content={group.group.description} />
                            </Segment>
                            <Segment style={{ backgroundColor: '#374785', minHeight: '150px' }}>
                                <Header size='large' style={{ color: 'white' }} textAlign='left'>Recent Activity</Header>
                                <Divider style={{ backgroundColor: 'white' }} />
                            </Segment>
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
                <Modal style={modalStyles.confirmDeleteModal} size='tiny' open={confirmLeave} onClose={this.close}>
                    <Modal.Header style={{ backgroundColor: '#374785', color: 'white' }}>Delete Group</Modal.Header>
                    <Modal.Content style={{ backgroundColor: '#a8d0e6' }}>
                        <Header as='h2' style={{ color: 'white' }}>Are you sure you want to delete {group.group.groupName}?</Header>
                    </Modal.Content>
                    <Modal.Actions style={{ backgroundColor: '#374785' }}>
                        <Button negative onClick={this.onCancelLeaveGroupClick}>No</Button>
                        <Button positive onClick={this.onConfirmDeleteGroupClick} icon='checkmark' labelPosition='right' content='Yes' />
                    </Modal.Actions>
                </Modal>
                <Modal style={modalStyles.createGroupModal} size='tiny' open={updateGroup} onClose={this.close}>
                    <Modal.Header style={{ backgroundColor: '#374785', color: 'white' }}>Edit Group</Modal.Header>
                    <Modal.Content style={{ backgroundColor: '#a8d0e6' }}>
                        <Form fluid='true'>
                            <Form.Input maxLength='50' type='text' fluid label="Name" placeholder="Name" value={editedGroup.groupName} name='groupName' onChange={this.handleChange} />
                            <Form.Group widths="equal">
                                <Form.Select clearable search fluid label="State" placeholder="Choose an option" options={states} noResultsMessage='No results found.' value={editedGroup.state} onChange={this.handleStateChange} />
                                <Form.Select clearable noResultsMessage='No results found.' placeholder="Search/Select a category" search fluid label="Category" options={this.createCategoryDropdown()} value={editedGroup.categoryId} onChange={this.handleCategoryChange} />
                            </Form.Group>
                            <Segment style={{ textAlign: "right", backgroundColor: '#374785' }}>
                                <TextArea
                                    name='description'
                                    value={editedGroup.description}
                                    style={{ minHeight: 110 }}
                                    maxLength="500"
                                    onChange={this.handleChange}
                                    placeholder="Give a brief description of the group"
                                />
                                <Header sub style={{ color: 'white' }}>Characters: {editedGroup.description ? editedGroup.description.length : 0} / 500</Header>
                            </Segment>
                        </Form>
                    </Modal.Content>
                    <Modal.Actions style={{ backgroundColor: '#374785' }}>
                        <Button onClick={this.onLeaveGroupLabelClick} negative icon='delete' floated='left' labelPosition='left' content='Delete Group' />
                        <Button onClick={this.onCancelEditGroupButtonClick} negative>Cancel</Button>
                        <Button disabled={!canUpdateGroup} onClick={this.onSaveEditGroupButtonClick} positive icon='checkmark' labelPosition='right' content='Save' />
                    </Modal.Actions>
                </Modal>
                <Container style={{ marginTop: '50px' }}>
                    <Segment fluid='true' style={{ backgroundColor: '#a8d0e6' }}>
                        <Grid fluid='true' columns='equal'>
                            <Grid.Column>
                                <Header floated='left' as='h3' style={{ color: 'white' }}>Created: {group.group.creationDate}</Header>
                            </Grid.Column>
                            <Grid.Column>
                            </Grid.Column>
                            <Grid.Column>
                                <Popup trigger={<Button floated='right' onClick={this.onEditGroupButtonClick} color='blue' icon='edit' />} content='Edit Group' />
                            </Grid.Column>
                        </Grid>
                        <Container>
                            <Header as='h1' icon textAlign='center'>
                                <Icon name='group' />
                                <Header.Content style={{ color: 'white' }}>{group.group.groupName}</Header.Content>
                            </Header>
                            <Grid fluid='true' columns={3}>
                                <Grid.Column style={{ textAlign: "left" }}>
                                    <Header as='h3' style={{ color: 'white' }}>{group.group.categoryName}</Header>
                                </Grid.Column>
                                <Grid.Column style={{ textAlign: "center" }}>
                                    <Header as='h3' style={{ color: 'white' }}>{group.group.state}</Header>
                                </Grid.Column>
                                <Grid.Column style={{ textAlign: "right" }}>
                                    <Header as='h3' style={{ color: 'white' }}>{group.group.memberCount} {memberFormat}</Header>
                                </Grid.Column>
                            </Grid>
                        </Container>
                        <Segment style={{ backgroundColor: '#374785', minHeight: '150px' }}>
                            <Header size='large' style={{ color: 'white' }} textAlign='center'>Description</Header>
                            <Divider style={{ backgroundColor: 'white' }} />
                            <Container style={{ color: 'white' }} content={group.group.description} />
                        </Segment>
                        <Segment style={{ backgroundColor: '#374785', minHeight: '150px' }}>
                            <Header size='large' style={{ color: 'white' }} textAlign='left'>Recent Activity</Header>
                            <Divider style={{ backgroundColor: 'white' }} />
                        </Segment>
                    </Segment>
                </Container>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { authentication, group, categories } = state;
    const { user } = authentication;
    return {
        user,
        group,
        categories
    };
}

const connectedGroupProfilePage = connect(mapStateToProps)(GroupProfilePage);
export { connectedGroupProfilePage as GroupProfilePage };