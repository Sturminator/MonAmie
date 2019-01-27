import React, { Component } from "react"
import { Redirect, NavLink } from 'react-router-dom'
import DatePicker from "react-datepicker"
import { Button, FormGroup, FormControl, ControlLabel, Checkbox, ButtonToolbar } from "react-bootstrap"
import "../css/Registration.css"
import "react-datepicker/dist/react-datepicker.css";

export default class Registration extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: "",
            password: "",
            birthdate: "",
            isLoading: false,
            EmailTaken: true
        };
    }

    handleDateChange(date) {
        this.setState({
            birthdate: date
        });
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = event => {
        event.preventDefault();
        this.setState({ isLoading: true });
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
                    <FormGroup>
                        <div class="row">
                            <div class="col-sm-4"><ControlLabel>Date of Birth</ControlLabel></div>
                            <div class="col-sm-8"><DatePicker
                                selected={this.state.birthdate}
                                onChange={this.handleDateChange.bind(this)}
                            /></div>
                        </div>
                    </FormGroup>
                    <Button
                        block
                        disabled={isLoading}
                        bsStyle="primary"
                        bsSize="large"
                        type="submit"
                    >{isLoading ? 'Submitting...' : 'Sign up'}</Button>
                    <div class="row" className="footer-margin">
                        <div class="col-sm-8">Already have an account?</div>
                        <NavLink to="/" class="col-sm-4">Sign In</NavLink>
                    </div>
                </form>
            </div>
        )
    }
}