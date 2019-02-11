import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { NavigationBar } from '../../Components';
import { categoryActions } from '../../Actions';
import { Table, Form, Segment, TextArea, Divider, Header, Icon, Grid, Container } from 'semantic-ui-react';

class ProfilePage extends Component {
    state = { currentLength: 0 };

    componentDidMount() {
        const { user } = this.props;
        this.props.dispatch(categoryActions.getAllForUser(user.id));
    }

    onBioChange = (e, { value }) => this.setState({ currentLength: value.length });

    createTable = () => {
        const { categories } = this.props;

        var table = []

        if (categories.items) {
            // Outer loop to create parent
            for (let i = 0; i < categories.items.length; i++) {
                var children = []
                //Inner loop to create children
                children.push(<Table.Cell>{categories.items[i].categoryId}</Table.Cell>)
                children.push(<Table.Cell>{categories.items[i].categoryName}</Table.Cell>)
                //Create the parent and add the children
                table.push(<Table.Row children={children} />)
            }
        }

        return table
    }

    render() {
        const { user, categories } = this.props;
        const { currentLength } = this.state;

        return (
            <div>
                <NavigationBar>
                </NavigationBar>
                <div>
                    <Container>
                        <Header as='h2' icon textAlign='center'>
                            <Icon name='user' circular />
                            <Header.Content>{user.firstName} {user.lastName}</Header.Content>
                            <Grid columns={3}>
                                <Grid.Column style={{ textAlign: "left" }}>
                                    <Header sub>{user.gender}</Header>
                                </Grid.Column>
                                <Grid.Column style={{ textAlign: "center" }}>
                                    <Header sub>{user.state}</Header>
                                </Grid.Column>
                                <Grid.Column style={{textAlign: "right"}}>
                                    <Header sub>{user.age}</Header>
                                </Grid.Column>
                            </Grid>
                        </Header>
                    </Container>
                    <Form fluid>
                        <Segment style={{ textAlign: "right" }}>
                            <TextArea
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
    const { categories, authentication } = state;
    const { user } = authentication;
    return {
        user,
        categories
    };
}

const connectedProfilePage = connect(mapStateToProps)(ProfilePage);
export { connectedProfilePage as ProfilePage };