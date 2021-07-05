import React, { Component } from 'react'
import{BrowserRouter as Router, Route} from "react-router-dom"
// bring route
import Signup from './components/Signup/Signup'
// signup
import Login from "./components/Login/Login"
// login
import Home from "./components/Home/Home"
// home
import Nav from "./components/Nav/Nav"
// nav
import Movie from "./components/Movie/Movie"
// ovie
import MovieDetail from "./components/Movie/MovieDetail"
// movie detail
import PrivateRoute from "./components/PrivatRoute/PrivateRoute"
// privateRoute

const MainRouter = (props)=>{
    return (
        <Router>
        <Nav user={props.user} handleUserLogout={props.handleUserLogout}/>
            <React.Fragment>
                {/* use path /movie and component Movie is user is true*/}
                <PrivateRoute exact path="/movie" component={Movie} />
                {/* component signup */}
                <Route exact path="/sign-up" component={Signup} />
                {/* component login  and use handleuserLogin to store email info*/}
                <Route exact path="/login"
                render={(routerProps)=> <Login {...routerProps} handleUserLogin={props.handleUserLogin}/>}/>
                {/* use privte route with movie-detail path and movieTitle params if user is true */}
                <PrivateRoute exact path="/movie-detail/:movieTitle" component={MovieDetail} />
                <Route exact path="/" component={Home} />
            </React.Fragment>
        </Router>
        )
    }

export default MainRouter
