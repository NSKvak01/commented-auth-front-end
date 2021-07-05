import React from 'react'
import { Route, Redirect } from 'react-router-dom'
// we  bring route and redirect from react-router-dom
import checkUser from '../utils/checkUser'
// and checkUser

// const PrivateRoute=(props)=>{
//     return (
//     <Route 
//     exact 
//     path={props.path} 
//     render={()=>{props.user?
//     props.component
//     :   <Redirect to="/login" />
//     }}
//     />
//     )
// }

// we bring components and rest from react props
const PrivateRoute = ({component:Component, ...rest})=>{
    return (
        // spread rest
    <Route {...rest}
    render = {(routerProps)=>
        // check if user is true it will go to routerProps from private router 
        checkUser() ? <Component {...routerProps}/>
        // if not it will direct to login
    : <Redirect to="/login" />}
        />
    )
}
    
export default PrivateRoute
