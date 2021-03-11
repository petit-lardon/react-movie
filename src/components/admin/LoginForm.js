import React, {Component} from 'react';
import Input from '../common/Input';
import Joi from 'joi-browser';


class LoginForm extends Component {
    state = {
        account: {
            username: '',
            password: ''
        },
        errors: {}
    }
    username = React.createRef();

    schemas = {
        username: Joi.string().required().label('Username'),
        password: Joi.string().required().label('Password')
    }

    /*componentDidMount() {
        this.username.current.focus();
    }*/

    validate = () => {
        const opt = {abortEarly: false};
        const result = Joi.validate(this.state.account, this.schemas, opt);
        console.log('result', result);

        if(!result.error) return null;

        const errors = {};
        result.error.details.map((i) => errors[i.path[0]] = i.message);
        return errors;

        /*const errors = {};
        const {username, password} = this.state.account;

        if(username.trim() === '') errors.username = "Username required";
        if(password.trim() === '') errors.password = "Password required";
        return Object.keys(errors).length === 0 ? null : errors;*/
    }

    validateProperty = ({name, value}) => {
        if (name ==='username') {
            if(value.trim() === '') return 'Username required';
        }
        if (name ==='password') {
            if(value.trim() === '') return 'Password required';
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const errors = this.validate();
        console.log(errors);
        this.setState({errors: errors || {}});
        if(errors) return;
    }

    handleChange = (e) => {
        const errors = {...this.state.errors}
        const error = this.validateProperty(e.currentTarget);
        if(error) errors[e.currentTarget.name] = error;
        else delete errors[e.currentTarget.name];

        const account = {...this.state.account};
        account[e.currentTarget.name] = e.currentTarget.value;
        this.setState({account, errors});
    }

    render() {
        const {username, password} = this.state.account;
        const {errors} = this.state;

        return (
            <div>
                <h1>Login</h1>
                <form onSubmit={this.handleSubmit}>
                    <Input name="username"
                           label="Username"
                           value={username}
                           type="email"
                           error={errors.username}
                           onChange={this.handleChange}
                           placeholder="Enter username"
                           desc="usernameHelp"
                    />
                    <Input name="password"
                           label="Password"
                           value={password}
                           type="password"
                           error={errors.password}
                           onChange={this.handleChange}
                    />
                    <button type="submit" className="btn btn-primary">Login</button>
                </form>
            </div>
        )
    }
}

export default LoginForm
