import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { NavigationBar } from '../../Components';
import { categoryActions } from '../../Actions';
import { Table } from 'semantic-ui-react'

class ProfilePage extends Component {
    componentDidMount() {
        const { user } = this.props;
        this.props.dispatch(categoryActions.getAllForUser(user.id));
    }

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

        return (
            <div>
                <NavigationBar>
                </NavigationBar>
                <div>
                    <p>This is your profile page.</p>
                    <Table basic='very' celled collapsing>
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