// import React, { Component } from 'react'

// We bring react-router-dom to be able to link components and use them as paths on web page. 
import{BrowserRouter as Router, Route} from "react-router-dom"
// We bring Signup from components
import Signup from './components/Signup/Signup'
// Bring Login from components
import Login from "./components/Login/Login"
// Bring Home from components
import Home from "./components/Home/Home"
// Bring navigation bar from components
import Nav from "./components/Nav/Nav"
// bring css file
import "./App.css"
// bring react
import React from "react"
// bring react-toastify for stylish notifications
import { ToastContainer, toast } from 'react-toastify';
// and toastify css file
import 'react-toastify/dist/ReactToastify.css';


export class App extends Router {
  render() {
    return (
      // here we bring router
      <Router>
        {/* also bring notifications */}
        <ToastContainer />
        {/* navigation bar */}
        <Nav />
        <React.Fragment>
          {/* we use Route and exact path to sighup page and link it to Signup component */}
        <Route exact path="/sign-up" component={Signup} />
          {/* we use Route and exact path to login page and link it to Login component */}
        <Route exact path="/login" component={Login} />
        {/* If we don't type anything, it should bring us to homepage */}
        <Route exact path="/" component={Home} />
        </React.Fragment>
      </Router>
    )
  }
}

// here we export App
export default App
