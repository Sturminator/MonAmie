import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { authActions } from '../../Actions';
import { Form, Button, Divider, Header, Icon, Container } from 'semantic-ui-react'

class RegistrationPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                email: "",
                password: "",
                birthdate: "",
                firstName: "",
                lastName: "",
            },
            submitted: false,
            redirectToLogin: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleRedirect = this.handleRedirect.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }

    handleRedirect(e) {
        e.preventDefault();

        this.setState({ redirectToLogin: true });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { user } = this.state;
        const { dispatch } = this.props;
        if (user.firstName && user.lastName && user.email && user.password && user.birthdate) {
            dispatch(authActions.register(user));
        }
    }

    render() {
        const { registering } = this.props;
        const { user, submitted, redirectToLogin } = this.state;

        if (redirectToLogin)
            return (<Redirect to="/login" />);

        return (
            <Container textAlign='center'>
                <Header as='h2' icon textAlign='center'>
                    <Icon name='handshake' circular />
                    <Header.Content>Mon Amie</Header.Content>
                </Header>
                <Form>
                    <Form.Field>
                        <label>First Name</label>
                        <input type='text' value={user.firstName} name='firstName' onChange={this.handleChange} placeholder='First Name' />
                    </Form.Field>
                    <Form.Field>
                        <label>Last Name</label>
                        <input type='text' value={user.lastName} name='lastName' onChange={this.handleChange} placeholder='Last Name' />
                    </Form.Field>
                    <Form.Field>
                        <label>Email</label>
                        <input type='email' value={user.email} name='email' onChange={this.handleChange} placeholder='Email' />
                    </Form.Field>
                    <Form.Field>
                        <label>Password</label>
                        <input type='password' value={user.password} name='password' onChange={this.handleChange} placeholder='Password' />
                    </Form.Field>
                    <Form.Field>
                        <label>Date of Birth</label>
                        <input type='date' value={user.birthdate} name='birthdate' onChange={this.handleChange}  />
                    </Form.Field>
                    <Button fluid color='green' onClick={this.handleSubmit}>Register</Button>
                </Form>
                <Divider horizontal>Already have an account?</Divider>

                <Button fluid color='teal' onClick={this.handleRedirect}>Login</Button>
            </Container>
        );
    }
}

function mapStateToProps(state) {
    const { registering } = state.registration;
    return {
        registering
    };
}

const connectedRegistrationPage = connect(mapStateToProps)(RegistrationPage);
export { connectedRegistrationPage as RegistrationPage };