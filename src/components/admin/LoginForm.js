import React from 'react';
import Form from '../form/Form';
import Joi from 'joi-browser';


class LoginForm extends Form {
    state = {
        data: {
            username: '',
            password: ''
        },
        errors: {}
    }

    schemas = {
        username: Joi.string().required().label('Username'),
        password: Joi.string().required().label('Password')
    }

    doSubmit = () => {
        //call server
    }

    render() {
        return (
            <div>
                <h1>Login</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput('username', 'Username', 'email', 'Entre username', 'usernameHelp')}
                    {this.renderInput('password', 'Password', 'password')}
                    {this.renderButton('Login')}
                </form>
            </div>
        )
    }
}

export default LoginForm
