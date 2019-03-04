import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavigationBar } from '../../Components';
import { categoryActions, groupActions } from '../../Actions';

class GroupsCategoryPage extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }

    componentDidMount() {
        const { match: { params }, categories, groups } = this.props;

        var idStr = params.categoryName.split("_")[1];
        var id = parseInt(idStr) / 11;

        if (!categories.items) {
            this.props.dispatch(categoryActions.getAll());
        }

        if (!groups.items) {
            //this.dispatch(groupActions.getAllForCategory());
        }
        else if (groups.items.id != id) {
            //this.dispatch(groupActions.getAllForCategory());
        }
    }

    render() {
        return (
            <div>
                <NavigationBar>
                </NavigationBar>
                <style>{`html, body {background-color: #24305E !important; } `}</style>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { authentication, categories, groups } = state;
    const { user } = authentication;
    return {
        user,
        categories,
        groups
    };
}

const connecetedGroupsCategoryPage = connect(mapStateToProps)(GroupsCategoryPage);
export { connecetedGroupsCategoryPage as GroupsCategoryPage };