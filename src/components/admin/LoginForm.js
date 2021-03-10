import React, {Component} from 'react';
import Input from '../common/Input';


class LoginForm extends Component {
    state = {
        account: {
            username: '',
            password: ''
        },
        errors: {}
    }
    username = React.createRef();

    /*componentDidMount() {
        this.username.current.focus();
    }*/

    validate = () => {
        const errors = {};
        const {username, password} = this.state.account;

        if(username.trim() === '') errors.username = "Username required";
        if(password.trim() === '') errors.password = "Password required";
        return Object.keys(errors).length === 0 ? null : errors;
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const errors = this.validate();
        console.log(errors);
        this.setState({errors: errors || {}});
        if(errors) return;
    }

    handleChange = (e) => {
        const account = {...this.state.account};
        account[e.currentTarget.name] = e.currentTarget.value;
        this.setState({account});
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
