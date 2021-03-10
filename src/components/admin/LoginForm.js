import React, {Component} from 'react';
import Input from '../common/Input';


class LoginForm extends Component {
    state = {
        account: {
            username: '',
            password: ''
        }
    }
    username = React.createRef();

    /*componentDidMount() {
        this.username.current.focus();
    }*/

    handleSubmit = (e) => {
        e.preventDefault();
    }

    handleChange = (e) => {
        const account = {...this.state.account};
        account[e.currentTarget.name] = e.currentTarget.value;
        this.setState({account});
    }

    render() {
        const {username, password} = this.state.account;

        return (
            <div>
                <h1>Login</h1>
                <form onSubmit={this.handleSubmit}>
                    <Input name="username"
                           label="Username"
                           value={username}
                           type="email"
                           onChange={this.handleChange}
                           placeholder="Enter username"
                           desc="usernameHelp"
                    />
                    <Input name="password"
                           label="Password"
                           value={password}
                           type="password"
                           onChange={this.handleChange}
                    />
                    <button type="submit" className="btn btn-primary">Login</button>
                </form>
            </div>
        )
    }
}

export default LoginForm
