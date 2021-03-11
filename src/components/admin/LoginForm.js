import React from 'react';
import Input from '../form/Input';
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
        const {data, errors} = this.state;

        return (
            <div>
                <h1>Login</h1>
                <form onSubmit={this.handleSubmit}>
                    <Input name="username"
                           label="Username"
                           value={data.username}
                           type="email"
                           error={errors.username}
                           onChange={this.handleChange}
                           placeholder="Enter username"
                           desc="usernameHelp"
                    />
                    <Input name="password"
                           label="Password"
                           value={data.password}
                           type="password"
                           error={errors.password}
                           onChange={this.handleChange}
                    />
                    <button disabled={this.validate()} type="submit" className="btn btn-primary">Login</button>
                </form>
            </div>
        )
    }
}

export default LoginForm
