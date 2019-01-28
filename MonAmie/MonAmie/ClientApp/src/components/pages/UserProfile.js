import React, { Component } from "react"

export default class UserProfile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user: null,
            isUser: false
        }

        fetch('api/User/Get/' + 3)
            .then(response => response.json())
            .then(data => {
                this.setState({ user: data, isUser: false });
            });
    }

    render() {
        return (
            <div>
                <h1>User Profile</h1>
                <p>This is where we will display a user's profile</p>
            </div>
        );
    }
}