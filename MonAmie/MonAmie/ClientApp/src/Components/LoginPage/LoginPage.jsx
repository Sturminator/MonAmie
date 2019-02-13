import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { authActions } from '../../Actions';
import { Form, Button, Divider, Image, Container, Segment, Grid } from 'semantic-ui-react';
import logo from '../../Images/logo.png';
import Background0 from '../../Images/login.jpg'

class LoginPage extends Component {
    constructor(props) {
        super(props);

        // reset login status
        this.props.dispatch(authActions.logout());

        this.state = {
            email: '',
            password: '',
            submitted: false,
            redirectToRegister: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleRedirect = this.handleRedirect.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleRedirect(e) {
        e.preventDefault();

        this.setState({ redirectToRegister: true });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { email, password } = this.state;
        const { dispatch } = this.props;

        if (email && password) {
            dispatch(authActions.login(email, password));
        }
    }

    render() {
        const { loggingIn } = this.props;
        const { email, password, submitted, redirectToRegister } = this.state;

        if (redirectToRegister)
            return (<Redirect to="/registration" />);

        return (
            <div>
                <Image src={Background0} large />
                <Divider/>
            <Container textAlign='center'>
                    <Image centered src={logo} size='medium' />
                    <Form>
                        <Form.Field>
                            <label>Email</label>
                            <input type='email' value={email} name='email' onChange={this.handleChange} placeholder='Email' />
                        </Form.Field>
                        <Form.Field>
                            <label>Password</label>
                            <input type='password' value={password} name='password' onChange={this.handleChange} placeholder='Password' />
                        </Form.Field>
                        <Button type='login' fluid color='green' onClick={this.handleSubmit}>Login</Button>
                    </Form>
                    <Divider horizontal>Don't have an account?</Divider>

                    <Button type='register' fluid color='blue' onClick={this.handleRedirect}>Register</Button>
                </Container>

                </div>
        );
    }
}

function mapStateToProps(state) {
    const { loggingIn } = state.authentication;
    return {
        loggingIn
    };
}

const connectedLoginPage = connect(mapStateToProps)(LoginPage);
export { connectedLoginPage as LoginPage };