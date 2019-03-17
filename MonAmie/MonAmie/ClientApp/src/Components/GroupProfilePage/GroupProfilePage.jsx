import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { NavigationBar } from '../../Components';
import { categoryActions, groupActions, commentsActions } from '../../Actions';
import modalStyles from '../../Styles/modal.styles';
import { states } from '../../Enums';
import { Sticky, Dimmer, Loader, Container, Segment, Grid, Divider, Button, Icon, Popup, Header, Modal, Form, TextArea, Label, Feed, Rail, Comment, Card } from 'semantic-ui-react';
import { history } from '../../Helpers';
import { group } from '../../Reducers/group.reducer';

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
            confirmLeave: false,
            userSelected: false,
            redirectTo: "",
            showAllActivity: false,
            context: null,
            targetedComment: "",
            newComment: "",
            newReply: "",
            commentToDelete: "",
            confirmDeleteComment: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
        this.handleStateChange = this.handleStateChange.bind(this);
    }

    handleContextRef = ref => {
        this.setState({ context: ref });
    };

    componentDidMount() {
        const { match: { params }, group, categories } = this.props;

        var idStr = params.groupId.split("_")[1];
        var id = parseInt(idStr) / 11;

        if (!categories.items) {
            this.props.dispatch(categoryActions.getAll());
        }

        if (!group.group) {
            this.props.dispatch(groupActions.getGroup(id));
            this.props.dispatch(commentsActions.getAllForGroup(id));
        }
        else if (group.group.groupId != id) {
            this.props.dispatch(groupActions.getGroup(id));
            this.props.dispatch(commentsActions.getAllForGroup(id));
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

    onNewCommentChange = (e, { value }) => this.setState({
        newComment: value
    });

    onNewReplyChange = (e, { value }) => this.setState({
        newReply: value
    });

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

    handleImageChange = () => {
        this.setState({
            canUpdateGroup: true
        });
    }


    onCancelEditGroupButtonClick = () => {
        this.setState({
            updateGroup: false
        });
        window.location.reload();
    }

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

        window.location.reload();
    };

    onAddCommentButtonClick = (e) => {
        const { newComment } = this.state;
        const { group, user, groupComments } = this.props;

        this.props.dispatch(commentsActions.addGroupComment(group.group.groupId, { userId: user.id, comment: newComment}, groupComments.comments));

        this.setState({
            newComment: ""
        })
    };

    onAddReplyButtonClick = (e) => {
        const { newReply, targetedComment } = this.state;
        const { group, user, groupComments } = this.props;

        this.props.dispatch(commentsActions.addGroupComment(group.group.groupId, { userId: user.id, comment: newReply, parentId: targetedComment }, groupComments.comments));

        this.setState({
            newReply: "",
            targetedComment: ""
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

    onCancelDeleteCommentClick = () => {
        this.setState({
            confirmDeleteComment: false,
            commentToDelete: ""
        })
    }

    onConfirmDeleteCommentClick = () => {
        const { groupComments } = this.props;
        const { commentToDelete } = this.state;

        this.props.dispatch(commentsActions.deleteGroupComment(commentToDelete, groupComments.comments));

        this.setState({
            confirmDeleteComment: false,
            commentToDelete: ""
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

    showAllActivityButtonClick = () => {
        const { showAllActivity } = this.state;

        this.setState({
            showAllActivity: showAllActivity ? false : true
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

    goToProfile = (e, { value }) => {
        var path = window.location.pathname;

        history.push(path);

        this.setState({
            userSelected: true,
            redirectTo: '/profile/' +
                value.firstName.toLowerCase() + '_' + value.userId * 11
        });
    };

    goToProfileFromComment = (e) => {
        var path = window.location.pathname;
        var firstName = e.target.getAttribute('firstName');
        var userId = e.target.getAttribute('userId');

        history.push(path);

        this.setState({
            userSelected: true,
            redirectTo: '/profile/' +
                firstName.toLowerCase() + '_' + parseInt(userId) * 11
        });
    };

    showReplyBoxForComment = (e) => {
        const { targetedComment } = this.state;
        var groupCommentId = e.target.getAttribute('commentId');

        if (targetedComment != groupCommentId) {
            this.setState({
                targetedComment: groupCommentId,
                newReply: ""
            });
        }
    };

    confirmDeleteComment = (e) => {
        var groupCommentId = e.target.getAttribute('commentId');

        this.setState({
            commentToDelete: groupCommentId,
            confirmDeleteComment: true
        });
    };

    createMemberLabels = () => {
        const { group } = this.props;

        var labels = []

        if (group.group) {
            labels.push(<Label value={group.group.owner} onClick={this.goToProfile} style={{ marginBottom: '5px' }} as='a' >
                <Icon name='star' /> {group.group.owner.firstName} {group.group.owner.lastName}
            </Label >)

            if (group.group.groupMembers) {
                for (let i = 0; i < group.group.groupMembers.length; i++) {
                    labels.push(<Label value={group.group.groupMembers[i]} onClick={this.goToProfile} style={{ marginBottom: '5px' }} as='a' >
                        {group.group.groupMembers[i].firstName} {group.group.groupMembers[i].lastName}
                    </Label >)
                }
            }
        }

        return labels
    }

    createActivityFeed = (createAll) => {
        const { group } = this.props;

        var activities = [];

        if (group.group) {
            var groupActivity = group.group.groupActivity;
            if (groupActivity) {

                if (createAll) {
                    var loopFor = groupActivity.length;
                } else {
                    var loopFor = groupActivity.length > 5 ? 5 : groupActivity.length;
                }

                for (let i = 0; i < loopFor; i++) {
                    if (groupActivity[i].type == 'CREATION') {
                        activities.push(<Feed.Event>
                            <Feed.Label>
                                <Icon style={{ color: 'white' }} name='group' />
                            </Feed.Label>
                            <Feed.Content>
                                <Feed.Summary style={{ color: 'white' }}>
                                    {group.group.groupName} was created
                                    <Feed.Date style={{ color: 'white' }}>{groupActivity[i].date}</Feed.Date>
                                </Feed.Summary>
                            </Feed.Content>
                        </Feed.Event>);
                    }
                    else if (groupActivity[i].type == 'JOIN') {
                        activities.push(<Feed.Event>
                            <Feed.Label>
                                <Icon style={{ color: 'white' }} name='add user' />
                            </Feed.Label>
                            <Feed.Content>
                                <Feed.Summary style={{ color: 'white' }}>
                                    <Label onClick={this.goToProfile} color='blue' value={groupActivity[i]} as='a' >
                                        {groupActivity[i].firstName} {groupActivity[i].lastName}
                                    </Label > joined the group
                                    <Feed.Date style={{ color: 'white' }}>{groupActivity[i].date}</Feed.Date>
                                </Feed.Summary>
                            </Feed.Content>
                        </Feed.Event>);
                    }
                    else if (groupActivity[i].type == 'LEAVE') {
                        activities.push(<Feed.Event>
                            <Feed.Label>
                                <Icon style={{ color: 'white' }} name='user delete' />
                            </Feed.Label>
                            <Feed.Content>
                                <Feed.Summary style={{ color: 'white' }}>
                                    <Label onClick={this.goToProfile} color='blue' value={groupActivity[i]} as='a' >
                                        {groupActivity[i].firstName} {groupActivity[i].lastName}
                                    </Label >  left the group
                                    <Feed.Date style={{ color: 'white' }}>{groupActivity[i].date}</Feed.Date>
                                </Feed.Summary>
                            </Feed.Content>
                        </Feed.Event>);
                    }
                    else if (groupActivity[i].type == 'DESC') {
                        activities.push(<Feed.Event>
                            <Feed.Label>
                                <Icon style={{ color: 'white' }} name='pencil' />
                            </Feed.Label>
                            <Feed.Content>
                                <Feed.Summary style={{ color: 'white' }}>
                                    {group.group.groupName} updated its description
                                    <Feed.Date style={{ color: 'white' }}>{groupActivity[i].date}</Feed.Date>
                                </Feed.Summary>
                                <Feed.Extra text style={{ color: 'white' }}>
                                    {groupActivity[i].newVal}
                                </Feed.Extra>
                            </Feed.Content>
                        </Feed.Event>);
                    }
                }
            }
        }
        return activities;
    }

    createCommentChildrenSection(comment) {
        const { user, group } = this.props;
        const { targetedComment, newReply } = this.state;

        var comments = [];

        if (comment.children.length > 0) {
            for (let i = 0; i < comment.children.length; i++) {
                if (comment.children[i].userId == user.id) {
                    comments.push(<Comment>
                        <Comment.Content>
                            <Segment style={{ maxWidth: '400px', display: 'inline-block' }}>
                                <Comment.Author onClick={this.goToProfileFromComment} firstName={comment.children[i].firstName} userId={comment.children[i].userId} as='a'>
                                    <object firstName={comment.children[i].firstName} userId={comment.children[i].userId} data={"/api/UserImage/ViewImageDirect/" + comment.children[i].userId} type="image/png" width="25" height="25">
                                        <Icon name='user' />
                                    </object> {comment.children[i].firstName} {comment.children[i].lastName}</Comment.Author>
                                <Comment.Metadata>
                                    <div>{comment.children[i].date}</div>
                                </Comment.Metadata>
                                <Comment.Text>&emsp;{comment.children[i].comment}</Comment.Text>
                            </Segment>
                            <Comment.Actions style={{ marginTop: '-9px' }}>
                                <Comment.Action commentId={comment.children[i].groupCommentId} onClick={this.showReplyBoxForComment} style={{ color: 'white' }}>&emsp; Reply</Comment.Action>
                                <Comment.Action commentId={comment.children[i].groupCommentId} onClick={this.confirmDeleteComment} style={{ color: 'white' }}>Delete</Comment.Action>
                            </Comment.Actions>
                            <Form reply hidden={comment.children[i].groupCommentId != targetedComment}>
                                <Form.TextArea onChange={this.onNewReplyChange} style={{ maxHeight: '60px', maxWidth: '400px' }} placeholder='Write a reply...' />
                                <Button onClick={this.onAddReplyButtonClick} color='green' disabled={newReply.replace(/\s/g, "").length < 1} content='Add Reply' labelPosition='left' icon='edit' />
                            </Form>
                        </Comment.Content>
                        {this.createCommentChildrenSection(comment.children[i])}
                    </Comment>);
                } else if (group.group.ownerId == user.id) {
                    comments.push(<Comment>
                        <Comment.Content>
                            <Segment style={{ maxWidth: '400px', display: 'inline-block' }}>
                                <Comment.Author onClick={this.goToProfileFromComment} firstName={comment.children[i].firstName} userId={comment.children[i].userId} as='a'>
                                    <object firstName={comment.children[i].firstName} userId={comment.children[i].userId} data={"/api/UserImage/ViewImageDirect/" + comment.children[i].userId} type="image/png" width="25" height="25">
                                        <Icon name='user' />
                                    </object> {comment.children[i].firstName} {comment.children[i].lastName}</Comment.Author>
                                <Comment.Metadata>
                                    <div>{comment.children[i].date}</div>
                                </Comment.Metadata>
                                <Comment.Text>&emsp;{comment.children[i].comment}</Comment.Text>
                            </Segment>
                            <Comment.Actions style={{ marginTop: '-9px' }}>
                                <Comment.Action commentId={comment.children[i].groupCommentId} onClick={this.showReplyBoxForComment} style={{ color: 'white' }}>&emsp; Reply</Comment.Action>
                                <Comment.Action commentId={comment.children[i].groupCommentId} onClick={this.confirmDeleteComment} style={{ color: 'white' }}>Delete</Comment.Action>
                            </Comment.Actions>
                            <Form reply hidden={comment.children[i].groupCommentId != targetedComment}>
                                <Form.TextArea onChange={this.onNewReplyChange} style={{ maxHeight: '60px', maxWidth: '400px' }} placeholder='Write a reply...' />
                                <Button onClick={this.onAddReplyButtonClick} color='green' disabled={newReply.replace(/\s/g, "").length < 1} content='Add Reply' labelPosition='left' icon='edit' />
                            </Form>
                        </Comment.Content>
                        {this.createCommentChildrenSection(comment.children[i])}
                    </Comment>);
                }
                else {
                    comments.push(<Comment>
                        <Comment.Content>
                            <Segment style={{ maxWidth: '400px', display: 'inline-block' }}>
                                <Comment.Author onClick={this.goToProfileFromComment} firstName={comment.children[i].firstName} userId={comment.children[i].userId} as='a'>
                                    <object firstName={comment.children[i].firstName} userId={comment.children[i].userId} data={"/api/UserImage/ViewImageDirect/" + comment.children[i].userId} type="image/png" width="25" height="25">
                                        <Icon name='user' />
                                    </object> {comment.children[i].firstName} {comment.children[i].lastName}</Comment.Author>
                                <Comment.Metadata>
                                    <div>{comment.children[i].date}</div>
                                </Comment.Metadata>
                                <Comment.Text>&emsp;{comment.children[i].comment}</Comment.Text>
                            </Segment>
                            <Comment.Actions style={{ marginTop: '-9px' }}>
                                <Comment.Action commentId={comment.children[i].groupCommentId} onClick={this.showReplyBoxForComment} style={{ color: 'white' }}>&emsp; Reply</Comment.Action>
                            </Comment.Actions>
                            <Form reply hidden={comment.children[i].groupCommentId != targetedComment}>
                                <Form.TextArea onChange={this.onNewReplyChange} style={{ maxHeight: '60px', maxWidth: '400px' }} placeholder='Write a reply...' />
                                <Button onClick={this.onAddReplyButtonClick} color='green' disabled={newReply.replace(/\s/g, "").length < 1} content='Add Reply' labelPosition='left' icon='edit' />
                            </Form>
                        </Comment.Content>
                        {this.createCommentChildrenSection(comment.children[i])}
                    </Comment>);
                }
            }

            return (<Comment.Group children={comments} />);
        }
    }

    createCommentSection() {
        const { groupComments, user, group } = this.props;
        const { targetedComment, newReply } = this.state;

        var comments = [];

        if (groupComments.loading)
            return (
                <Dimmer active>
                    <Loader active size='massive' inline='centered' />
                </Dimmer>);

        if (groupComments.comments) {
            if (groupComments.comments.length > 0) {
                for (let i = 0; i < groupComments.comments.length; i++) {
                    if (groupComments.comments[i].userId == user.id) {
                        comments.push(<Comment>
                            <Comment.Content>
                                <Segment style={{ maxWidth: '400px', display: 'inline-block' }}>
                                    <Comment.Author onClick={this.goToProfileFromComment} firstName={groupComments.comments[i].firstName} userId={groupComments.comments[i].userId} as='a'>
                                        <object firstName={groupComments.comments[i].firstName} userId={groupComments.comments[i].userId} data={"/api/UserImage/ViewImageDirect/" + groupComments.comments[i].userId} type="image/png" width="25" height="25">
                                            <Icon name='user' />
                                        </object> {groupComments.comments[i].firstName} {groupComments.comments[i].lastName}</Comment.Author>
                                    <Comment.Metadata>
                                        <div>{groupComments.comments[i].date}</div>
                                    </Comment.Metadata>
                                    <Comment.Text>&emsp;{groupComments.comments[i].comment}</Comment.Text>
                                </Segment>
                                <Comment.Actions style={{ marginTop: '-9px' }}>
                                    <Comment.Action commentId={groupComments.comments[i].groupCommentId} onClick={this.showReplyBoxForComment} style={{ color: 'white' }}>&emsp; Reply</Comment.Action>
                                    <Comment.Action commentId={groupComments.comments[i].groupCommentId} onClick={this.confirmDeleteComment} style={{ color: 'white' }}>Delete</Comment.Action>
                                </Comment.Actions>
                                <Form reply hidden={groupComments.comments[i].groupCommentId != targetedComment}>
                                    <Form.TextArea onChange={this.onNewReplyChange} style={{ maxHeight: '60px', maxWidth: '400px' }} placeholder='Write a reply...' />
                                    <Button onClick={this.onAddReplyButtonClick} color='green' disabled={newReply.replace(/\s/g, "").length < 1} content='Add Reply' labelPosition='left' icon='edit' />
                                </Form>
                            </Comment.Content>
                            {this.createCommentChildrenSection(groupComments.comments[i])}
                        </Comment>);
                    } else if (group.group.ownerId == user.id) {
                        comments.push(<Comment>
                            <Comment.Content>
                                <Segment style={{ maxWidth: '400px', display: 'inline-block' }}>
                                    <Comment.Author onClick={this.goToProfileFromComment} firstName={groupComments.comments[i].firstName} userId={groupComments.comments[i].userId} as='a'>
                                        <object firstName={groupComments.comments[i].firstName} userId={groupComments.comments[i].userId} data={"/api/UserImage/ViewImageDirect/" + groupComments.comments[i].userId} type="image/png" width="25" height="25">
                                            <Icon name='user' />
                                        </object> {groupComments.comments[i].firstName} {groupComments.comments[i].lastName}</Comment.Author>
                                    <Comment.Metadata>
                                        <div>{groupComments.comments[i].date}</div>
                                    </Comment.Metadata>
                                    <Comment.Text>&emsp;{groupComments.comments[i].comment}</Comment.Text>
                                </Segment>
                                <Comment.Actions style={{ marginTop: '-9px' }}>
                                    <Comment.Action commentId={groupComments.comments[i].groupCommentId} onClick={this.showReplyBoxForComment} style={{ color: 'white' }}>&emsp; Reply</Comment.Action>
                                    <Comment.Action commentId={groupComments.comments[i].groupCommentId} onClick={this.confirmDeleteComment} style={{ color: 'white' }}>Delete</Comment.Action>
                                </Comment.Actions>
                                <Form reply hidden={groupComments.comments[i].groupCommentId != targetedComment}>
                                    <Form.TextArea onChange={this.onNewReplyChange} style={{ maxHeight: '60px', maxWidth: '400px' }} placeholder='Write a reply...' />
                                    <Button onClick={this.onAddReplyButtonClick} color='green' disabled={newReply.replace(/\s/g, "").length < 1} content='Add Reply' labelPosition='left' icon='edit' />
                                </Form>
                            </Comment.Content>
                            {this.createCommentChildrenSection(groupComments.comments[i])}
                        </Comment>);
                    }
                    else {
                        comments.push(<Comment>
                            <Comment.Content>
                                <Segment style={{ maxWidth: '400px', display: 'inline-block' }}>
                                    <Comment.Author onClick={this.goToProfileFromComment} firstName={groupComments.comments[i].firstName} userId={groupComments.comments[i].userId} as='a'>
                                        <object firstName={groupComments.comments[i].firstName} userId={groupComments.comments[i].userId} data={"/api/UserImage/ViewImageDirect/" + groupComments.comments[i].userId} type="image/png" width="25" height="25">
                                            <Icon name='user' />
                                        </object> {groupComments.comments[i].firstName} {groupComments.comments[i].lastName}</Comment.Author>
                                    <Comment.Metadata>
                                        <div>{groupComments.comments[i].date}</div>
                                    </Comment.Metadata>
                                    <Comment.Text>&emsp;{groupComments.comments[i].comment}</Comment.Text>
                                </Segment>
                                <Comment.Actions style={{ marginTop: '-9px' }}>
                                    <Comment.Action commentId={groupComments.comments[i].groupCommentId} onClick={this.showReplyBoxForComment} style={{ color: 'white' }}>&emsp; Reply</Comment.Action>
                                </Comment.Actions>
                                <Form reply hidden={groupComments.comments[i].groupCommentId != targetedComment}>
                                    <Form.TextArea onChange={this.onNewReplyChange} style={{ maxHeight: '60px', maxWidth: '400px' }} placeholder='Write a reply...' />
                                    <Button onClick={this.onAddReplyButtonClick} color='green' disabled={newReply.replace(/\s/g, "").length < 1} content='Add Reply' labelPosition='left' icon='edit' />
                                </Form>
                            </Comment.Content>
                            {this.createCommentChildrenSection(groupComments.comments[i])}
                        </Comment>);
                    }
                }

                return (<Comment.Group children={comments} />);
            }
            else {
                return (<Header as='h1' textAlign='center'>
                    <Header.Content style={{ color: 'white' }}>Be the first to comment!</Header.Content>
                </Header>);
            }
        }
        else {
            return (<Header as='h1' textAlign='center'>
                <Header.Content style={{ color: 'white' }}>Be the first to comment!</Header.Content>
            </Header>);
        }
    }

    render() {
        const { group, categories, user } = this.props;
        const { canUpdateGroup, editedGroup, updateGroup, deleteGroup, confirmLeave, redirectTo, userSelected, showAllActivity, newComment, confirmDeleteComment } = this.state;
        var memberFormat = "Member";

        if (userSelected)
            return <Redirect to={redirectTo} />

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
                    <Modal style={modalStyles.EditProfileModal} size='tiny' open={showAllActivity} onClose={this.close}>
                        <Modal.Header style={{ backgroundColor: '#374785', color: 'white' }}>Activity for {group.group.groupName} </Modal.Header>
                        <Modal.Content style={{ backgroundColor: '#a8d0e6' }}>
                            <Segment style={{ backgroundColor: '#374785', minHeight: '150px' }}>
                                <Feed size='large' children={this.createActivityFeed(true)} />
                            </Segment>
                        </Modal.Content>
                        <Modal.Actions style={{ backgroundColor: '#374785' }}>
                            <Button positive onClick={this.showAllActivityButtonClick} content='Done' />
                        </Modal.Actions>
                    </Modal>
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
                    <Modal style={modalStyles.confirmDeleteModal} size='tiny' open={confirmDeleteComment} onClose={this.close}>
                        <Modal.Header style={{ backgroundColor: '#374785', color: 'white' }}>Delete Comment</Modal.Header>
                        <Modal.Content style={{ backgroundColor: '#a8d0e6' }}>
                            <Header as='h2' style={{ color: 'white' }}>Are you sure you want to delete this comment?</Header>
                        </Modal.Content>
                        <Modal.Actions style={{ backgroundColor: '#374785' }}>
                            <Button negative onClick={this.onCancelDeleteCommentClick}>No</Button>
                            <Button positive onClick={this.onConfirmDeleteCommentClick} icon='checkmark' labelPosition='right' content='Yes' />
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
                                    <object data={"/api/GroupImage/ViewImageDirect/" + group.group.id} type="image/png" width="200" height="180">
                                        <object data={"/api/GroupImage/ViewImageDirect/" + group.group.groupId} type="image/png" width="250" height="250">
                                            <Icon name='group' size='massive' />
                                        </object>
                                    </object>
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
                                <Grid columns='equal'>
                                    <Grid.Column>
                                        <Header size='large' style={{ color: 'white' }} textAlign='left'>Latest Activity</Header>
                                    </Grid.Column>
                                    <Grid.Column>
                                    </Grid.Column>
                                    <Grid.Column>
                                        <Popup trigger={<Button floated='right' color='blue' icon='list' onClick={this.showAllActivityButtonClick} />} content='All Activity' />
                                    </Grid.Column>
                                </Grid>
                                <Divider style={{ backgroundColor: 'white' }} />
                                <Feed size='large' children={this.createActivityFeed(false)} />
                            </Segment>
                            <Segment style={{ backgroundColor: '#374785', minHeight: '150px' }}>
                                <Grid columns='equal'>
                                    <Grid.Column>
                                        <Header size='large' style={{ color: 'white' }} textAlign='left'>Members</Header>
                                    </Grid.Column>
                                    <Grid.Column>
                                    </Grid.Column>
                                    <Grid.Column>
                                    </Grid.Column>
                                </Grid>
                                <Divider style={{ backgroundColor: 'white' }} />
                                <Label.Group size='medium' color='blue' children={this.createMemberLabels()} />
                            </Segment>
                            <Segment style={{ backgroundColor: '#374785', minHeight: '150px' }}>
                                <Grid columns='equal'>
                                    <Grid.Column>
                                        <Header size='large' style={{ color: 'white' }} textAlign='left'>Comments</Header>
                                    </Grid.Column>
                                    <Grid.Column>
                                    </Grid.Column>
                                    <Grid.Column>
                                    </Grid.Column>
                                </Grid>
                                <Divider style={{ backgroundColor: 'white' }} />
                                <Form reply >
                                    <Form.TextArea onChange={this.onNewCommentChange} value={newComment} style={{ maxHeight: '60px' }} placeholder='Write a comment...' />
                                    <Button onClick={this.onAddCommentButtonClick} disabled={newComment.replace(/\s/g, "").length < 1} floated='right' color='green' content='Add Comment' labelPosition='left' icon='edit' />
                                </Form>
                                {this.createCommentSection()}
                            </Segment>
                        </Segment>
                    </Container>
                </div>
            );
        }

        return (
            <div ref={this.handleContextRef} >
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
                <Modal style={modalStyles.EditProfileModal} size='tiny' open={showAllActivity} onClose={this.close}>
                    <Modal.Header style={{ backgroundColor: '#374785', color: 'white' }}>Activity for {group.group.groupName} </Modal.Header>
                    <Modal.Content style={{ backgroundColor: '#a8d0e6' }}>
                        <Segment style={{ backgroundColor: '#374785', minHeight: '150px' }}>
                            <Feed size='large' children={this.createActivityFeed(true)} />
                        </Segment>
                    </Modal.Content>
                    <Modal.Actions style={{ backgroundColor: '#374785' }}>
                        <Button positive onClick={this.showAllActivityButtonClick} content='Done' />
                    </Modal.Actions>
                </Modal>
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
                            <iframe name="hiddenFrame" class="hide"></iframe>
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
                        <Form style={{ marginTop: '10px' }} fluid='true' encType="multipart/form-data" action={"/api/GroupImage/UploadImage/"} method="post" target="hiddenFrame" onSubmit={this.handleImageChange}>
                            <b style={{ color: 'black' }}>Upload profile picture</b>
                            <input style={{ backgroundColor: '#374785', color: 'white' }} type="file" name="files" accept=".jpeg, .jpg, .png" />
                            <input type="hidden" name="groupId" value={group.group.groupId} />
                            <Button style={modalStyles.customGroupButtom} color='green' type="submit">Save Profile Picture</Button>
                        </Form>
                    </Modal.Content>
                    <Modal.Actions style={{ backgroundColor: '#374785' }}>
                        <Button onClick={this.onLeaveGroupLabelClick} negative icon='delete' floated='left' labelPosition='left' content='Delete Group' />
                        <Button onClick={this.onCancelEditGroupButtonClick} negative>Cancel</Button>
                        <Button disabled={!canUpdateGroup} onClick={this.onSaveEditGroupButtonClick} positive icon='checkmark' labelPosition='right' content='Save' />
                    </Modal.Actions>
                </Modal>
                <Modal style={modalStyles.confirmDeleteModal} size='tiny' open={confirmDeleteComment} onClose={this.close}>
                    <Modal.Header style={{ backgroundColor: '#374785', color: 'white' }}>Delete Comment</Modal.Header>
                    <Modal.Content style={{ backgroundColor: '#a8d0e6' }}>
                        <Header as='h2' style={{ color: 'white' }}>Are you sure you want to delete this comment?</Header>
                    </Modal.Content>
                    <Modal.Actions style={{ backgroundColor: '#374785' }}>
                        <Button negative onClick={this.onCancelDeleteCommentClick}>No</Button>
                        <Button positive onClick={this.onConfirmDeleteCommentClick} icon='checkmark' labelPosition='right' content='Yes' />
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
                                <object data={"/api/GroupImage/ViewImageDirect/" + group.group.groupId} type="image/png" width="200" height="180">
                                    <Icon name='group' size='massive' />
                                </object>
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
                            <Grid columns='equal'>
                                <Grid.Column>
                                    <Header size='large' style={{ color: 'white' }} textAlign='left'>Latest Activity</Header>
                                </Grid.Column>
                                <Grid.Column>
                                </Grid.Column>
                                <Grid.Column>
                                    <Popup trigger={<Button floated='right' color='blue' icon='list' onClick={this.showAllActivityButtonClick} />} content='All Activity' />
                                </Grid.Column>
                            </Grid>
                            <Divider style={{ backgroundColor: 'white' }} />
                            <Feed size='large' children={this.createActivityFeed(false)} />
                        </Segment>
                        <Segment style={{ backgroundColor: '#374785', minHeight: '150px' }}>
                            <Grid columns='equal'>
                                <Grid.Column>
                                    <Header size='large' style={{ color: 'white' }} textAlign='left'>Members</Header>
                                </Grid.Column>
                                <Grid.Column>
                                </Grid.Column>
                                <Grid.Column>
                                </Grid.Column>
                            </Grid>
                            <Divider style={{ backgroundColor: 'white' }} />
                            <Label.Group size='medium' color='blue' children={this.createMemberLabels()} />
                        </Segment>
                        <Segment style={{ backgroundColor: '#374785', minHeight: '150px' }}>
                            <Grid columns='equal'>
                                <Grid.Column>
                                    <Header size='large' style={{ color: 'white' }} textAlign='left'>Comments</Header>
                                </Grid.Column>
                                <Grid.Column>
                                </Grid.Column>
                                <Grid.Column>
                                </Grid.Column>
                            </Grid>
                            <Divider style={{ backgroundColor: 'white' }} />
                            <Form reply >
                                <Form.TextArea onChange={this.onNewCommentChange} value={newComment} style={{ maxHeight: '60px' }} placeholder='Write a comment...' />
                                <Button onClick={this.onAddCommentButtonClick} disabled={newComment.replace(/\s/g, "").length < 1} floated='right' color='green' content='Add Comment' labelPosition='left' icon='edit' />
                            </Form>
                            {this.createCommentSection()}
                        </Segment>
                    </Segment>
                </Container>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { authentication, group, categories, groupComments } = state;
    const { user } = authentication;
    return {
        user,
        group,
        categories,
        groupComments
    };
}

const connectedGroupProfilePage = connect(mapStateToProps)(GroupProfilePage);
export { connectedGroupProfilePage as GroupProfilePage };