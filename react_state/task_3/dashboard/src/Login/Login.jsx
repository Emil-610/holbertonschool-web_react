import React from 'react';
import WithLogging from '../HOC/WithLogging';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: props.email || '',
      password: props.password || '',
      enableSubmit: false,
    };
  }

  validateEmail = (email) => {
    if (!email || typeof email !== 'string') return false;
    const e = email.trim();
    const re = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return re.test(e);
  };

  updateEnableSubmit = (email, password) => {
    const validEmail = this.validateEmail(email);
    const validPassword = typeof password === 'string' && password.length >= 8;
    this.setState({ enableSubmit: validEmail && validPassword });
  };

  handleChangeEmail = (e) => {
    const email = e.target.value;
    this.setState({ email }, () => {
      this.updateEnableSubmit(this.state.email, this.state.password);
    });
  };

  handleChangePassword = (e) => {
    const password = e.target.value;
    this.setState({ password }, () => {
      this.updateEnableSubmit(this.state.email, this.state.password);
    });
  };

  handleLoginSubmit = (e) => {
    e.preventDefault();
    if (this.props.logIn) {
      this.props.logIn(this.state.email, this.state.password);
    }
  };

  render() {
    const { email, password, enableSubmit } = this.state;

    return (
      <div className="App-body flex flex-col p-5 pl-1 h-[45vh] border-t-4 border-[color:var(--main-color)]">
        <p className="text-xl mb-4">Login to access the full dashboard</p>

        <form onSubmit={this.handleLoginSubmit}>
          <div className="text-lg flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-0">
            <label htmlFor="email" className="sm:pr-2">
              Email
            </label>
            <input
              type="email"
              name="user_email"
              id="email"
              className="border rounded w-3/5 sm:w-auto px-2 py-1"
              value={email}
              onChange={this.handleChangeEmail}
            />

            <label htmlFor="password" className="sm:pl-2 sm:pr-2">
              Password
            </label>
            <input
              type="password"
              name="user_password"
              id="password"
              className="border rounded w-3/5 sm:w-auto px-2 py-1"
              value={password}
              onChange={this.handleChangePassword}
            />

            <input
              type="submit"
              value="OK"
              className="cursor-pointer border px-1 rounded sm:ml-2 w-fit"
              disabled={!enableSubmit}
            />
          </div>
        </form>
      </div>
    );
  }
}

const LoginWithLogging = WithLogging(Login);
export default LoginWithLogging;
