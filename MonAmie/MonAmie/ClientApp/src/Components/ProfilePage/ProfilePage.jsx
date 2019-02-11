import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { NavigationBar } from '../../Components';
import { userProfileActions } from '../../Actions';
import { Table, Form, Segment, TextArea, Divider, Header, Icon, Grid, Container, Loader, Dimmer } from 'semantic-ui-react';

class ProfilePage extends Component {
    state = { currentLength: 0 };

    componentDidMount() {
        const { user } = this.props;
        this.props.dispatch(userProfileActions.getById(user.id));
    }

    onBioChange = (e, { value }) => this.setState({ currentLength: value.length });

    createTable = () => {
        const { userProfile } = this.props;

        var categories = userProfile.items.categories;
        var table = []

        if (userProfile.items) {
            // Outer loop to create parent
            for (let i = 0; i < categories.length; i++) {
                var children = []
                //Inner loop to create children
                children.push(<Table.Cell>{categories[i].categoryId}</Table.Cell>)
                children.push(<Table.Cell>{categories[i].categoryName}</Table.Cell>)
                //Create the parent and add the children
                table.push(<Table.Row children={children} />)
            }
        }

        return table
    }

    render() {
        const { user, userProfile } = this.props;
        const { currentLength } = this.state;

        if (!userProfile.items)
            return (<div style={{ paddingTop: '600px' }}>
                <Dimmer active>
                    <Loader active size='massive' inline='centered' />
                </Dimmer>
            </div>);
        return (
            <div>
                <NavigationBar>
                </NavigationBar>
                <div>
                    <Container>
                        <Header as='h2' icon textAlign='center'>
                            <Icon name='user' circular />
                            <Header.Content>{userProfile.items.fullName}</Header.Content>
                            <Grid columns={3}>
                                <Grid.Column style={{ textAlign: "left" }}>
                                    <Header sub>{user.gender}</Header>
                                </Grid.Column>
                                <Grid.Column style={{ textAlign: "center" }}>
                                    <Header sub>{user.state}</Header>
                                </Grid.Column>
                                <Grid.Column style={{ textAlign: "right" }}>
                                    <Header sub>{user.age}</Header>
                                </Grid.Column>
                            </Grid>
                        </Header>
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
                    <Table style={{ textAlign: 'center' }} basic='very' celled collapsing>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>CategoryId</Table.HeaderCell>
                                <Table.HeaderCell>Category</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {this.createTable()}
                        </Table.Body>
                    </Table>
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