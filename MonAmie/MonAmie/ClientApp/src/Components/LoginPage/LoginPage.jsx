import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { authActions } from '../../Actions';
import { history } from '../../Helpers';
import { Form, Button, Divider, Image, Container, Segment, Grid, Loader } from 'semantic-ui-react';
import logo from '../../Images/logo.png';
import Background0 from '../../Images/login.jpg';

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

        history.push('/login');

        this.setState({ redirectToRegister: true });
    }

    handleSubmit(e) {
        e.preventDefault();
        
        const { email, password } = this.state;
        const { dispatch } = this.props;

        if (email && password) {
            this.setState({ submitted: true });
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
                <style>{`html, body {background-color: #24305E !important; } `}</style>
                <Image src={Background0} fluid style={{ maxHeight: '450px' }} />
                <Grid textAlign='center' verticalAlign=' middle' style={{ marginTop: '10px' }}>
                    <Grid.Column style={{ maxWidth: 600 }}>
                        <Segment style={{ backgroundColor: '#a8d0e6'}}>
                            <Image centered src={logo} size='medium' />
                            <Loader active={loggingIn} />
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
                            <Divider fluid horizontal>Don't have an account?</Divider>

                            <Button color='violet' type='register' fluid onClick={this.handleRedirect}>Register</Button>
                        </Segment>
                    </Grid.Column>
                </Grid>
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