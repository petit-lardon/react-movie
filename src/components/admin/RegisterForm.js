import React from 'react';
import Form from '../form/Form';
import Joi from "joi-browser";

class RegisterForm extends Form {
    state = {
        data: {
            username: '',
            password: '',
            name: ''
        },
        errors: {}
    }

    schemas = {
        username: Joi.string().email().label('Email Address').required(),
        password: Joi.string().regex(/^[a-zA-Z0-9]{6,16}$/).min(6).required(),
        name: Joi.string().label('Name').required()
    }

    doSubmit = () => {
        //call server
    }

    render() {
        return (
            <div>
                <h1>Register</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput('username', 'Username', 'email', 'Username must be a valid email')}
                    {this.renderInput('password', 'Password', 'password')}
                    {this.renderInput('name', 'Name')}
                    {this.renderButton('Register')}
                </form>
            </div>
        )
    }
}

export default RegisterForm;
