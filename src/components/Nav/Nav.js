// 
import React, { Component } from "react";
// we bring link to link signup and sign in pages because <a> doesn't work in react
import { Link, NavLink } from "react-router-dom";
// bring nav css file
import "./Nav.css";
export class Nav extends Component {
  render() {
    return (
      <nav className="Navbar">
        <div className="h1-logo">
          <h1>
            {/* this h1 redirects to home page */}
            <Link to="/">Movie with friends!</Link>
          </h1>
        </div>
        <div className="right-side-nav">
          <ul>
            <li>
              {/* We use NavLink to show users what page they are on, activeClassName shows underlined active tab, and links to sign-up page*/}
              <NavLink activeClassName="selected" to="/sign-up">
                Sign up
              </NavLink>
            </li>
            <li>
              {/* It shows activeStyle here */}
              <NavLink
                activeStyle={{ borderBottom: "1px solid white" }}
                to="/login"
              >
                Login
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
// exports nav to use it in App.js
export default Nav;
