import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { authActions, alertActions } from '../../Actions';
import { history } from '../../Helpers';
import { Form, Button, Divider, Image, Container, Segment, Grid, Loader, Message } from 'semantic-ui-react';
import logo from '../../Images/logo.png';

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
            missingPassword: false,
            missingEmail: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleRedirect = this.handleRedirect.bind(this);
        this.dismissInvalidFieldMessage = this.dismissInvalidFieldMessage.bind(this);
        this.dismissMessage = this.dismissMessage.bind(this);
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

        dispatch(alertActions.clear());

        if (email && password) {
            this.setState({ submitted: true });
            dispatch(authActions.login(email, password));
        }
        else {
            if (!email) {
                this.setState({ missingEmail: true });
            } else {
                this.setState({ missingEmail: false });
            }

            if (!password) {
                this.setState({ missingPassword: true });
            } else {
                this.setState({ missingPassword: false });
            }
        }
    }

    dismissInvalidFieldMessage() {
        this.setState({ missingPassword: false, missingEmail: false });
    }

    dismissMessage() {
        const { dispatch } = this.props;
        dispatch(alertActions.clear());
        this.setState({ missingPassword: false, missingEmail: false });
    }

    renderMessage() {
        const { alert } = this.props;
        const { missingEmail, missingPassword } = this.state;

        if (alert.message) {
            if (alert.type == 'alert-error') {
                return (<Message negative onDismiss={this.dismissMessage}><Message.Header>{alert.message}</Message.Header></Message>);
            }

            if (alert.type == 'alert-success') {
                return (<Message positive onDismiss={this.dismissMessage}>{alert.message}</Message>);
            }
        } else {
            if (missingEmail && missingPassword) {
                return (<Message negative onDismiss={this.dismissInvalidFieldMessage}><Message.Header>Please enter an Email & Password</Message.Header></Message>);
            } else if (missingEmail) {
                return (<Message negative onDismiss={this.dismissInvalidFieldMessage}><Message.Header>Please enter an Email</Message.Header></Message>);
            } else if (missingPassword) {
                return (<Message negative onDismiss={this.dismissInvalidFieldMessage}><Message.Header>Please enter a Password</Message.Header></Message>);
            }
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
                <Grid textAlign='center' verticalAlign=' middle' style={{ marginTop: '50px' }}>
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

                            <Button color='blue' type='register' fluid onClick={this.handleRedirect}>Register</Button>
                        </Segment>
                        {this.renderMessage()}
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { loggingIn, alert } = state;
    return {
        loggingIn,
        alert
    };
}

const connectedLoginPage = connect(mapStateToProps)(LoginPage);
export { connectedLoginPage as LoginPage };