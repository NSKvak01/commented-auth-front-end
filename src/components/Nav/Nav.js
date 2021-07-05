import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
// bring  Link and NavLink from react-router-dom
import "./Nav.css";
// bring css file
export class Nav extends Component {

  render() {
    console.log(this.props);
    return (
      <nav className="Navbar">
        <div className="h1-logo">
          <h1>
            {/* by clicking on logo it will redirect to hoepage */}
            <Link to="/">Movie with friends!</Link>
          </h1>
        </div>
        <div className="right-side-nav">
          <ul>
            <li>
              {/* if user is true, it will show welcome back - email */}
              {this.props.user ? (
                <NavLink activeClassName="selected" to="/profile">
                  Welcome back - {this.props.user.email}!
                </NavLink>
              ) : (
                // else it will show signup 
                <NavLink activeClassName="selected" to="/sign-up">
                  Sign up
                </NavLink>
              )}
            </li>
            <li>
              {this.props.user ? (
                // if user is true the second button will show logout
                <NavLink
                  activeStyle={{ borderBottom: "1px solid white" }}
                  to="/"
                  onClick={this.props.handleUserLogout}
                >
                  Logout
                </NavLink>
              ) : (
                // else it will show login
                <NavLink
                  activeStyle={{ borderBottom: "1px solid white" }}
                  to="/login"
                >
                  Login
                </NavLink>
              )}
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
export default Nav;