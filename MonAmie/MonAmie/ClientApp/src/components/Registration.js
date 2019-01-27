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
            firstName: "",
            lastName: "",
            isLoading: false,
            accountCreated: false,
            EmailTaken: true
        };
    }

    validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 8 && !this.state.isLoading;
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

        fetch('api/Login/RegisterUser', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                password: this.state.password,
                birthdate: this.state.birthdate.toJSON()
            })
        }).then(res => res.json())
            .then(data =>
                this.setState({ accountCreated: data.accountCreated, isLoading: data.accountCreated })
            );
    }

    render() {
        const { isLoading } = this.state;

        if (this.state.accountCreated)
            return <Redirect to="/" />
        return (
            <div className="Registration">
                <form onSubmit={this.handleSubmit}>
                    <h2 className="LoginTitle">User Registration</h2>
                    <FormGroup controlId="firstName" bsSize="large">
                        <ControlLabel>First Name</ControlLabel>
                        <FormControl
                            autoFocus
                            type="text"
                            value={this.state.firstName}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup controlId="lastName" bsSize="large">
                        <ControlLabel>Last Name</ControlLabel>
                        <FormControl
                            autoFocus
                            type="text"
                            value={this.state.lastName}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup controlId="email" bsSize="large">
                        <ControlLabel>Email</ControlLabel>
                        <FormControl
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
                                placeholderText="mm/dd/yyyy"
                                peekNextMonth
                                showMonthDropdown
                                showYearDropdown
                                dropdownMode="select"
                                maxDate={new Date()}
                                onChange={this.handleDateChange.bind(this)}
                            /></div>
                        </div>
                    </FormGroup>
                    <Button
                        block
                        disabled={!this.validateForm()}
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