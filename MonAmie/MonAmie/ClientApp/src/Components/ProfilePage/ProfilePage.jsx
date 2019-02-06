import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { NavigationBar } from '../../Components';
import { userInterestActions } from '../../Actions';

class ProfilePage extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { user } = this.props;
        this.props.dispatch(userInterestActions.getAll(user.id));
    }

    render() {
        const { user } = this.props;

        return (
            <div>
                <NavigationBar>
                </NavigationBar>
                <div>
                    <h1>Welcome to Mon Amie, {user.firstName}!</h1>
                    <p>This is your profile page.</p>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { userInterests, authentication } = state;
    const { user } = authentication;
    return {
        user,
        userInterests
    };
}

const connectedProfilePage = connect(mapStateToProps)(ProfilePage);
export { connectedProfilePage as ProfilePage };