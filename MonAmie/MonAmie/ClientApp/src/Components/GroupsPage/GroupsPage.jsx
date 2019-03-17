import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { NavigationBar } from '../../Components';
import { categoryActions, groupActions } from '../../Actions';
import {
    Container, Grid, Header, Segment, Popup, Button, Divider,
    Modal, Form, TextArea, Image, Card, Dimmer, Loader, Icon, Rail, Sticky
} from 'semantic-ui-react';
import { states } from '../../Enums';
import modalStyles from '../../Styles/modal.styles';
import { history } from '../../Helpers';

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
            createGroup: false,
            whereTo: "",
            whereToCategoryId: -1,
            groupSelected: false,
            refreshUserGroups: false,
            context: null
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
        this.handleStateChange = this.handleStateChange.bind(this);
    }

    handleContextRef = ref => {
        this.setState({ context: ref });
    };

    componentDidMount() {
        const { categories, userGroups, user } = this.props;

        if (!categories.items) {
            this.props.dispatch(categoryActions.getAll());
        }

        this.props.dispatch(groupActions.getAllForUser(user.id));
    }

    componentDidUpdate() {
        const { user } = this.props;
        const { refreshUserGroups } = this.state;

        if (refreshUserGroups) {
            this.props.dispatch(groupActions.getAllForUser(user.id));

            this.setState({
                refreshUserGroups: false
            })
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

    createCategoryCards = () => {
        const { categories } = this.props;

        var cards = [];

        if (categories.items) {
            for (let i = 0; i < categories.items.length; i++) {
                var children = [];

                children.push(<Image src={require(`../../Images/Categories/` + categories.items[i].imageSource)} />);
                children.push(<Card.Header style={{ marginTop: '10px' }} textAlign='center'>
                    {categories.items[i].categoryName}
                </Card.Header>)

                cards.push(<Card onClick={this.onCardClick} style={{ backgroundColor: '#374785' }} key={i + 1} value={categories.items[i]} > <Card.Content textAlign='center' children={children} /></ Card>)
            }
        }
        return cards;
    }

    createUserGroupCards = () => {
        const { userGroups } = this.props;

        var cards = [];

        if (userGroups.groups) {
            for (let i = 0; i < userGroups.groups.length; i++) {
                var children = [];
                children.push(<Card.Content style={{ paddingBottom: '10px' }}>
                    <object data={"/api/GroupImage/ViewImageDirect/" + userGroups.groups[i].groupId} type="image/png" width="140" height="120">
                        <Icon name='group' size='massive'/>
                    </object>
                    <Popup trigger={<Button onClick={this.goToProfile} value={userGroups.groups[i]} floated='right' color='blue' icon='group' />} content='View Profile' />
                </Card.Content>)
                children.push(<Card.Header textAlign='left'>
                    {userGroups.groups[i].groupName}
                </Card.Header>)
                children.push(<Card.Meta textAlign='left'>{userGroups.groups[i].state} - {userGroups.groups[i].categoryName}</Card.Meta>)

                if (userGroups.groups[i].memberCount > 1) {
                    children.push(<Card.Meta textAlign='left'>{userGroups.groups[i].memberCount} Members</Card.Meta>)
                }
                else {
                    children.push(<Card.Meta textAlign='left'>{userGroups.groups[i].memberCount} Member</Card.Meta>)
                }

                cards.push(<Card style={{ backgroundColor: '#374785' }} key={i + 1} value={userGroups.groups[i]} > <Card.Content textAlign='center' children={children} /></ Card>)
            }
        }
        return cards;
    }

    onCardClick = (event, value) => {
        var categoryName = value.value.categoryName.replace(" ", "");
        history.push('/groups');

        this.setState({
            whereTo: '/groups/' + categoryName.toLowerCase() + '_' + (value.value.categoryId * 11),
            whereToCategoryId: value.value.categoryId
        });
    };

    goToProfile = (e, { value }) => {
        history.push('/groups');

        var groupName = value.groupName.replace(/ /g, '');

        this.setState({
            groupSelected: true,
            whereTo: '/group/' +
                groupName.toLowerCase() + '_' + value.groupId * 11
        });
    };

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

    onRefreshButtonClick = () => {
        const { user } = this.props;

        this.props.dispatch(groupActions.getAllForUser(user.id));
    }

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
        const { user, userGroups } = this.props;
        const { newGroup } = this.state;

        this.props.dispatch(groupActions.addGroup(user.id, newGroup, userGroups.groups));       

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
        const { categories, userGroups } = this.props;
        const { newGroup, createGroup, canCreateGroup, whereTo, whereToCategoryId, groupSelected } = this.state;

        if (groupSelected)
            return <Redirect to={whereTo} /> 

        if (whereTo != "" && whereToCategoryId != -1) {
            return <Redirect to={{ pathname: whereTo, state: { categoryId: whereToCategoryId } }} />
        }

        if (categories.loading)
            return (<div style={{ paddingTop: '600px' }}>
                <Dimmer active>
                    <Loader active size='massive' inline='centered' />
                </Dimmer>
            </div>);

        if (userGroups.loading)
            return (<div style={{ paddingTop: '600px' }}>
                <Dimmer active>
                    <Loader active size='massive' inline='centered' />
                </Dimmer>
            </div>);

        if (!userGroups.groups)
            return (<div style={{ paddingTop: '600px' }}>
                <Dimmer active>
                    <Loader active size='massive' inline='centered' />
                </Dimmer>
            </div>);

        return (
            <div ref={this.handleContextRef}>
                <Rail
                    internal
                    position="left"
                    attached
                    style={{ width: "100%" }}
                >
                    <Sticky context={this.state.context}>
                        <NavigationBar />
                    </Sticky>
                </Rail>
                <style>{`html, body {background-color: #24305E !important; } `}</style>
                <Modal style={modalStyles.createGroupModal} size='tiny' open={createGroup} onClose={this.close}>
                    <Modal.Header style={{ backgroundColor: '#374785', color: 'white' }}>Create Group</Modal.Header>
                    <Modal.Content style={{ backgroundColor: '#a8d0e6' }}>
                        <Form fluid='true'>
                            <Form.Input maxLength='50' type='text' fluid label="Name" placeholder="Name" value={newGroup.groupName} name='groupName' onChange={this.handleChange} />
                            <Form.Group widths="equal">
                                <Form.Select clearable search fluid label="State" placeholder="Choose an option" options={states} noResultsMessage='No results found.' value={newGroup.state} onChange={this.handleStateChange} />
                                <Form.Select clearable noResultsMessage='No results found.' placeholder="Search/Select a category" search fluid label="Category" options={this.createCategoryDropdown()} value={newGroup.categoryId} onChange={this.handleCategoryChange} />
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
                <Container fluid style={{ margin: '5px', marginTop: '50px'  }}>
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
                                <Popup trigger={<Button floated='right' color='blue' icon='refresh' onClick={this.onRefreshButtonClick} />} content='Refresh' />
                            </Grid.Column>
                        </Grid>
                        <Divider style={{ backgroundColor: 'white' }} />
                        <Card.Group stackable centered children={this.createUserGroupCards()} />
                    </Segment>
                    <Segment fluid='true' style={{ backgroundColor: '#a8d0e6' }}>
                        <Grid columns='equal'>
                            <Grid.Column>
                            </Grid.Column>
                            <Grid.Column>
                                <Header as='h1' textAlign='center'>
                                    <Header.Content style={{ color: 'white' }}>Group Categories</Header.Content>
                                </Header>
                            </Grid.Column>
                            <Grid.Column>
                            </Grid.Column>
                        </Grid>
                        <Divider style={{ backgroundColor: 'white' }} />
                        <Card.Group centered children={this.createCategoryCards()} />
                    </Segment>
                </Container>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { authentication, categories, userGroups } = state;
    const { user } = authentication;
    return {
        user,
        categories,
        userGroups
    };
}

const connecetedGroupsPage = connect(mapStateToProps)(GroupsPage);
export { connecetedGroupsPage as GroupsPage };