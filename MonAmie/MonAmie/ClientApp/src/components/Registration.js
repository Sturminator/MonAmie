import React, { Component } from "react"
import { Redirect, NavLink } from 'react-router-dom'
import { Button, FormGroup, FormControl, ControlLabel, Checkbox, ButtonToolbar } from "react-bootstrap"
import "../css/Registration.css"

export default class Registration extends Component {
    constructor(props) {
        super(props)

        this.state = {
            EmailTaken: true
        };
    }

    handleSubmit = event => {
        event.preventDefault();
    }

    render() {
        const { isLoading } = this.state;

        return (
            <div className="Registration">
                <form onSubmit={this.handleSubmit}>
                    <h2 className="LoginTitle">User Registration</h2>
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
                    <Button
                        block
                        disabled={isLoading}
                        bsStyle="primary"
                        bsSize="large"
                        type="submit"
                    >{isLoading ? 'Submitting...' : 'Sign up'}</Button>
                    <div class="row">
                        <div class="col-sm-1"></div>
                        <div class="col-sm-7">Already have an account?</div>
                        <NavLink to="/" class="col-sm-3">Sign In</NavLink>
                    </div>
                </form>
            </div>
        )
    }
}