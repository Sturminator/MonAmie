import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavigationBar } from '../../Components';
import { Container, Grid, Header, Segment, Popup, Button, Divider } from 'semantic-ui-react';

class GroupsPage extends Component {
    render() {
        return (
            <div>
                <NavigationBar>
                </NavigationBar>
                <style>{`html, body {background-color: #24305E !important; } `}</style>
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
                                <Popup trigger={<Button floated='right' color='blue' icon='add' />} content='Create New Group' />
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
    const { authentication } = state;
    const { user } = authentication;
    return {
        user
    };
}

const connecetedGroupsPage = connect(mapStateToProps)(GroupsPage);
export { connecetedGroupsPage as GroupsPage };