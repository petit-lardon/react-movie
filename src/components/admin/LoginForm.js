import React, {Component} from 'react';


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
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            value={username}
                            onChange={this.handleChange}
                            autoFocus
                            ref={this.username}
                            type="email"
                            name="username"
                            className="form-control"
                            id="username"
                            aria-describedby="usernameHelp"
                            placeholder="Enter username"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="exampleInputPassword1"
                            value={password}
                            name="password"
                            onChange={this.handleChange}
                            placeholder="Password"/>
                    </div>
                    <button type="submit" className="btn btn-primary">Login</button>
                </form>
            </div>
        )
    }
}

export default LoginForm
