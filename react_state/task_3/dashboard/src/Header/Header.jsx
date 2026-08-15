import React from 'react';
import logo from '../assets/holberton-logo.jpg';
import newContext from '../Context/context';

class Header extends React.Component {
  static contextType = newContext;

  handleLogoutClick = (e) => {
    e.preventDefault();
    const { logOut } = this.context || {};
    if (typeof logOut === 'function') logOut();
  };

  render() {
    const ctx = this.context || {};
    const user = ctx.user || { email: '', password: '', isLoggedIn: false };

    return (
      <div>
        <div className="App-header flex items-center py-2 max-[520px]:flex-col">
          <img
            src={logo}
            className="App-logo h-60 pointer-events-none max-[520px]:h-60"
            alt="holberton logo"
          />
          <h1 className="font-bold text-[color:var(--main-color)] text-5xl max-[520px]:text-5xl max-[520px]:mt-2 max-[435px]:text-4xl">
            School Dashboard
          </h1>
        </div>

        {user.isLoggedIn ? (
          <div id="logoutSection" className="mt-2 text-right pr-4">
            Welcome {user.email} (
            <a href="#" onClick={this.handleLogoutClick}>
              logout
            </a>
            )
          </div>
        ) : null}
      </div>
    );
  }
}

export default Header;
