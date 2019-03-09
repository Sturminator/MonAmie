import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavigationBar } from '../../Components';
import { categoryActions, groupActions } from '../../Actions';
import modalStyles from '../../Styles/modal.styles';
import { states } from '../../Enums';
import { Dimmer, Loader, Container, Segment, Grid, Divider, Button, Icon, Popup, Header, Modal, Form, TextArea } from 'semantic-ui-react';

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
            deleteGroup: false
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

    render() {
        const { group, categories } = this.props;
        const { canUpdateGroup, editedGroup, updateGroup, deleteGroup } = this.state;
        var memberFormat = "Member";

        if (group.loading)
            return (<div style={{ paddingTop: '600px' }}>
                <Dimmer active>
                    <Loader active size='massive' inline='centered' />
                </Dimmer>
            </div>);

        if (categories.loading)
            return (<div style={{ paddingTop: '600px' }}>
                <Dimmer active>
                    <Loader active size='massive' inline='centered' />
                </Dimmer>
            </div>);

        if (!group.group)
            return (<div style={{ paddingTop: '600px' }}>
                <Dimmer active>
                    <Loader active size='massive' inline='centered' />
                </Dimmer>
            </div>);

        if (group.memberCount > 1)
            memberFormat = "Members";

        return (
            <div>
                <NavigationBar>
                </NavigationBar>
                <style>{`html, body {background-color: #24305E !important; } `}</style>
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