import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavigationBar } from '../../Components';
import { categoryActions, groupActions } from '../../Actions';
import {
    Container, Grid, Header, Segment, Popup, Button, Divider,
    Modal, Form, TextArea, Search, Label
} from 'semantic-ui-react';
import { states } from '../../Enums';
import modalStyles from '../../Styles/modal.styles';

class GroupsPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            newGroup: {
                state: "",
                groupName: "",
                categoryId: null,
                description: "",
            },
            categories: [],
            canCreateGroup: false,
            createGroup: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
        this.handleStateChange = this.handleStateChange.bind(this);
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

    componentDidMount() {
        const { categories } = this.props;

        if (!categories.items) {
            this.props.dispatch(categoryActions.getAll());
        }
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { newGroup } = this.state;
        var otherField = name === 'groupName' ? newGroup.description : newGroup.groupName;

        this.setState({
            newGroup: {
                ...newGroup,
                [name]: value
            },
            canCreateGroup: value != "" > 0 && newGroup.categoryId > 0 && otherField != "" && newGroup.state != ""
        });
    }

    handleCategoryChange(event, value) {
        const { newGroup } = this.state;
        this.setState({
            newGroup: {
                ...newGroup,
                categoryId: value.value
            },
            canCreateGroup: value.value != null && newGroup.state != "" && newGroup.groupName != "" && newGroup.description != ""
        });
    }

    handleStateChange(event, value) {
        const { newGroup } = this.state;
        this.setState({
            newGroup: {
                ...newGroup,
                state: value.value
            },
            canCreateGroup: value.value != "" && newGroup.categoryId != null && newGroup.groupName != "" && newGroup.description != ""
        });
    }

    onDescriptionChange = (e, { value }) => this.setState({
        description: value
    });

    onCreateGroupButtonClick = (e) => this.setState({
        createGroup: this.state.createGroup ? false : true,
        categories: this.createCategoryDropdown
    });

    onCancelCreateGroupClick = (e) => this.setState({
        createGroup: this.state.createGroup ? false : true,
        newGroup: {
            categoryId: null,
            groupName: "",
            description: "",
            state: "",
        }
    });

    onSaveCreateGroupClick = (e) => {
        const { user } = this.props;
        const { newGroup } = this.state;

        this.props.dispatch(groupActions.addGroup(user.id, newGroup));

        this.setState({
            createGroup: this.state.createGroup ? false : true,
            newGroup: {
                categoryId: null,
                groupName: "",
                description: "",
                state: ""
            }
        })
    };

    render() {
        const { newGroup, createGroup, canCreateGroup } = this.state;

        return (
            <div>
                <NavigationBar>
                </NavigationBar>
                <style>{`html, body {background-color: #24305E !important; } `}</style>
                <Modal style={modalStyles.createGroupModal} size='tiny' open={createGroup} onClose={this.close}>
                    <Modal.Header style={{ backgroundColor: '#374785', color: 'white' }}>Create Group</Modal.Header>
                    <Modal.Content style={{ backgroundColor: '#a8d0e6' }}>
                        <Form fluid='true'>
                            <Form.Input maxLength='50' type='text' fluid label="Name" placeholder="Name" value={newGroup.groupName} name='groupName' onChange={this.handleChange} />
                            <Form.Group widths="equal">
                                <Form.Select clearable search fluid label="State" placeholder="Choose an option" options={states} noResultsMessage='No results found.' value={newGroup.state} onChange={this.handleStateChange} />
                                <Form.Select clearable noResultsMessage='No results found.' placeholder="Search/Select a category" search fluid label="Category" options={this.createCategoryDropdown()}  value={newGroup.categoryId} onChange={this.handleCategoryChange} />
                            </Form.Group>
                            <Segment style={{ textAlign: "right", backgroundColor: '#374785' }}>
                                <TextArea
                                    name='description'
                                    value={newGroup.description}
                                    style={{ minHeight: 110 }}
                                    maxLength="500"
                                    onChange={this.handleChange}
                                    placeholder="Give a brief description of the group"
                                />
                                <Header sub style={{ color: 'white' }}>Characters: {newGroup.description ? newGroup.description.length : 0} / 500</Header>
                            </Segment>
                        </Form>
                    </Modal.Content>
                    <Modal.Actions style={{ backgroundColor: '#374785' }}>
                        <Button onClick={this.onCancelCreateGroupClick} negative>Cancel</Button>
                        <Button disabled={!canCreateGroup} onClick={this.onSaveCreateGroupClick} positive icon='checkmark' labelPosition='right' content='Create' />
                    </Modal.Actions>
                </Modal>
                <Container fluid style={{ margin: '5px' }}>
                    <Segment fluid='true' style={{ backgroundColor: '#a8d0e6' }}>
                        <Grid columns='equal'>
                            <Grid.Column>
                            </Grid.Column>
                            <Grid.Column>
                                <Header as='h1' textAlign='center'>
                                    <Header.Content style={{ color: 'white' }}>My Groups</Header.Content>
                                </Header>
                            </Grid.Column>
                            <Grid.Column>
                                <Popup trigger={<Button floated='right' color='blue' icon='add' onClick={this.onCreateGroupButtonClick} />} content='Create New Group' />
                            </Grid.Column>
                        </Grid>
                        <Divider style={{ backgroundColor: 'white' }} />
                    </Segment>
                    <Segment fluid='true' style={{ backgroundColor: '#a8d0e6' }}>
                        <Grid columns='equal'>
                            <Grid.Column>
                            </Grid.Column>
                            <Grid.Column>
                                <Header as='h1' textAlign='center'>
                                    <Header.Content style={{ color: 'white' }}>All Groups</Header.Content>
                                </Header>
                            </Grid.Column>
                            <Grid.Column>
                                <Popup trigger={<Button floated='right' color='blue' icon='refresh' />} content='Refresh' />
                            </Grid.Column>
                        </Grid>
                        <Divider style={{ backgroundColor: 'white' }} />
                    </Segment>
                </Container>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { authentication, categories } = state;
    const { user } = authentication;
    return {
        user,
        categories
    };
}

const connecetedGroupsPage = connect(mapStateToProps)(GroupsPage);
export { connecetedGroupsPage as GroupsPage };