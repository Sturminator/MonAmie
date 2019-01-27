import React, { Component } from "react"
import { Redirect } from 'react-router-dom'
import { Button, FormGroup, FormControl, ControlLabel, Checkbox, ButtonToolbar } from "react-bootstrap"
import "../css/Login.css"

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.routeChange = this.routeChange.bind(this);

        this.state = {
            email: "",
            password: "",
            rememberUser: false,
            isLoading: false,
            validLogin: false
        };
    }

    validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 8;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = event => {
        event.preventDefault();
        this.setState({ isLoading: true });
        fetch('api/Login/ValidateUser', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password
            })
        }).then(res => res.json())
            .then(data =>
                this.setState({ validLogin: data.validLogin, isLoading: data.validLogin })
            );
    }

    routeChange() {
        var path = `/registration`;
        this.props.history.push(path);
    }

    render() {
        const { isLoading } = this.state;

        if (this.state.validLogin)
            return <Redirect to="/home" />
        return (
            <div className="Login">
                <form onSubmit={this.handleSubmit}>
                    <h2 className="LoginTitle">User Login</h2>
                    <FormGroup controlId="email" bsSize="large">
                        <ControlLabel>Email</ControlLabel>
                        <FormControl
                            autoFocus
                            type="email"
                            value={this.state.email}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup controlId="password" bsSize="large">
                        <ControlLabel>Password</ControlLabel>
                        <FormControl
                            value={this.state.password}
                            onChange={this.handleChange}
                            type="password"
                        />
                    </FormGroup>
                    <Checkbox
                        className="CheckBoxRemember"
                        value={this.state.rememberUser}
                        onChange={this.handleChange}
                        id="RememberUserCheckBox"
                    >Remember Me</Checkbox>
                    <Button
                        block
                        disabled={isLoading}
                        bsStyle="primary"
                        bsSize="large"
                        type="submit"
                    >{isLoading ? 'Logging In...' : 'Login'}</Button>
                    <ButtonToolbar>
                        <Button className="ForgotPasswordButton">Forgot Password?</Button>
                        <Button className="CreateAccountButton" onClick={this.routeChange} >Create New Account</Button>
                    </ButtonToolbar>
                </form>
            </div>
        );
    }
}