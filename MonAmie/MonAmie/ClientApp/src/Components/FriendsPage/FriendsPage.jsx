import React, { Component } from 'react';

class FriendsPage extends Component {
    state = {

    }

    componentDidMount() {

    }

    render() {

    }
}

function mapStateToProps(state) {
    const { authentication } = state;
    const { user } = authentication;
    return {
        user
    };
}

const connectedFriendsPage = connect(mapStateToProps)(FriendsPage);
export { connectedFriendsPage as FriendsPage };