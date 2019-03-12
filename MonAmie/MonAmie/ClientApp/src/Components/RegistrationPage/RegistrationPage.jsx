import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { authActions, alertActions } from '../../Actions';
import { history } from '../../Helpers';
import { Form, Button, Divider, Image, Container, Segment, Grid, Loader, Message } from 'semantic-ui-react';
import { states, genders } from '../../Enums';
import logo from '../../Images/logo.png';

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
                gender: "",
                state: "",
            },
            submitted: false,
            redirectToLogin: false,
            fieldsInvalid: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleRedirect = this.handleRedirect.bind(this);
        this.handleStateChange = this.handleStateChange.bind(this);
        this.handleGenderChange = this.handleGenderChange.bind(this);
        this.dismissInvalidFieldMessage = this.dismissInvalidFieldMessage.bind(this);
        this.dismissMessage = this.dismissMessage.bind(this);
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

    handleStateChange(event, value) {
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                state: value.value
            }
        });
    }

    handleGenderChange(event, value) {
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                gender: value.value
            }
        });
    }

    handleRedirect(e) {
        e.preventDefault();

        history.push('/registration');

        this.setState({ redirectToLogin: true });
    }

    handleSubmit(event) {
        event.preventDefault();

        const { user } = this.state;
        const { dispatch } = this.props;
        if (user.firstName && user.lastName && user.email && user.password && user.birthdate && user.state && user.gender) {
            this.setState({ submitted: true, fieldsInvalid: false });
            dispatch(authActions.register(user));
        } else {
            this.setState({ fieldsInvalid: true })
        }
    }

    dismissInvalidFieldMessage() {
        this.setState({ fieldsInvalid: false });
    }

    dismissMessage() {
        const { dispatch } = this.props;
        dispatch(alertActions.clear());
    }

    renderMessage() {
        const { alert } = this.props;
        const { fieldsInvalid } = this.state;

        if (alert.message) {
            if (alert.type == 'alert-error') {
                return (<Message negative onDismiss={this.dismissMessage} > <Message.Header>{alert.message}</Message.Header></ Message>);
            }

            if (alert.type == 'alert-success') {
                return (<Message positive onDismiss={this.dismissMessage}>{alert.message}</Message>);
            }
        }
        else if (fieldsInvalid) {
            return (<Message negative onDismiss={this.dismissInvalidFieldMessage} > <Message.Header>Please fill out all fields</Message.Header></ Message>);
        }
    }

    render() {
        const { registering } = this.props;
        const { user, submitted, redirectToLogin } = this.state;

        if (redirectToLogin)
            return (<Redirect to="/login" />);

        return (
            <div>
                <style>{`html, body {background-color: #24305E !important; } `}</style>
                <Grid textAlign='center' verticalAlign=' middle' style={{marginTop: '50px'}}>
                    <Grid.Column style={{ maxWidth: 600 }}>
                        <Segment style={{ backgroundColor: '#a8d0e6' }}>
                            <Image centered src={logo} size='medium' />
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
                                <Form.Group widths="equal">
                                    <Form.Input type='date' fluid label="Date of Birth" placeholder="Date of Birth" value={user.birthdate} name='birthdate' onChange={this.handleChange} />
                                    <Form.Select clearable fluid label="Gender" placeholder="Gender" options={genders} value={user.gender} name='gender' onChange={this.handleGenderChange} />
                                    <Form.Select clearable search fluid label="State" options={states} placeholder="Choose an option" value={user.state} onChange={this.handleStateChange} />
                                </Form.Group>
                            </Form>
                            <Button loading={registering} fluid color='green' onClick={this.handleSubmit}>Register</Button>
                            <Divider fluid horizontal>Already have an account?</Divider>
                            <Button fluid color='blue' onClick={this.handleRedirect}>Login</Button>
                        </Segment>
                        {this.renderMessage()}
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { registering, alert } = state;
    return {
        registering,
        alert
    };
}

const connectedRegistrationPage = connect(mapStateToProps)(RegistrationPage);
export { connectedRegistrationPage as RegistrationPage };