import React, { Component } from 'react'

import "./App.css"
// bring toastcontainer
import { ToastContainer} from 'react-toastify';
// bring jwt decoder
import jwtDecode from "jwt-decode"
// bring toastify css
import 'react-toastify/dist/ReactToastify.css';
// bring MainRouter
import MainRouter from "./MainRouter"


// we export class App with user: null
export class App extends Component {
  state = {
    user:null,
  }

  
// once the page is loaded, we get jwt token from local storage 
componentDidMount (){
  let getJwtToken = window.localStorage.getItem("jwtToken")
// if there is a token we grab current time, decode token and grab expiration time
  if(getJwtToken){
    const currentTime = Date.now() /1000
    let decodedJwtToken = jwtDecode (getJwtToken)
    // if user token is still valid
    if(decodedJwtToken.exp>currentTime){
      // use handleUserLogin function that stores email
      this.handleUserLogin(decodedJwtToken)
    } else {
      // else handleUserLogout that sets user back to null
      this.handleUserLogout()
    }
  }
}  

// handleuserlogout to set user to null
  handleUserLogout = ()=>{
    window.localStorage.removeItem("jwtToken")
    this.setState({
      user:null
    })
  }

  // funciton to handle login and store user email
  handleUserLogin = (user) =>{
    this.setState({
      user:{
        email:user.email
      }
    })
  }

  render() {
    return (
      
        <React.Fragment>

          <ToastContainer />
      
          <MainRouter 
          user = {this.state.user}
          handleUserLogin = {this.handleUserLogin}
          handleUserLogout={this.handleUserLogout}/>

        </React.Fragment>
)
    
  }
}

// here we export App
export default App
