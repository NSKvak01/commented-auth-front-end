import React, { Component } from 'react'
// we bring component

// bring Login css
import "./Login.css"
// also bring toast to show pop-up messages
import { toast } from 'react-toastify';
// bring axios
import Axios from '../utils/Axios';
// bring jwtDecode to decode jwt token
import jwtDecode from "jwt-decode"
// bring checkUser from utils that returns true or false depending on token expiration status
import checkUser from '../utils/checkUser';

// we export login class
export class Login extends Component {
    // create state
    state = {
        email:"",
        password:"",
        error:false,
        emailError:"",
        passwordError:"",
        submitButtonDisabled:true,
        emailOnFocus:false,
        passwordOnFocus:false,

    };

    // once page is loaded we need to see if user's token is stall valid, if true, we show movie page
    componentDidMount(){
        let check = checkUser()
        if(check){
            this.props.history.push("/movie")
    }
    }

    // we check if inputs' length are equal to zero, if yes, we ask user to type email ad password
    handleInputs = (event)=>{
        if(this.state[event.target.name].length === 0){
            this.setState({
                [`${event.target.name}Error`]:` Please type ${event.target.placeholder.toLowerCase()}`,
                submitButtonDisabled:true
            })
        } else{
            // else, there is not error
            this.setState({
                [`${event.target.name}Error`]:"",
            })
        }
    }
// we handle input values on change and use handleInputs function
    handleOnChange =(event)=>{
        this.setState({
            [event.target.name]:event.target.value},
            ()=>{
                this.handleInputs(event)
            })
        
    }
// also handle on blur, if input was on focus and value length is still zero we ask user to type something
    handleOnBlur = (event)=>{
        if(event.target.value.length===0 && event.target.name ==="email"){
            this.setState({
                emailError:"Please type email"
            })
        } 
        if(event.target.value.length===0 && event.target.name ==="password"){
            this.setState({
                passwordError:"Please type password"
            })
        }
    }

    // handle on submit once the submit button  is triggered
    handleOnSubmit= async(event)=>{
        // we need to prevent default
        event.preventDefault()
        try {
            // define currentUser object containing email and password from state
            let currentUser ={
                email:this.state.email,
                password:this.state.password
            }
            // create axios post request using currentUser info
            let result = await Axios.post(`/api/user/login`, currentUser)
            console.log(result)
            // grab jwtToken from backend
            let jwtToken = result.data.payload;

            // decode token
            let decodedToken = jwtDecode(jwtToken)
            
            // store decoded token into local storage
            window.localStorage.setItem("jwtToken", jwtToken)
            // bring handleUserLogin from props and pass decoded token
            this.props.handleUserLogin(decodedToken)
            // once user is logged in, redirect to movie page
            this.props.history.push("/movie")
                // show toast success pop-up message
            toast.success(`Success login`, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
            
        } catch (error) {
            console.log(error)
            // if there is error and it's response status equall to 429, we show error that there are too many failure requests
            if(error.response.status === 429){
                toast.error('Too many failure requests', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
            } else{
                // if the status is defferent, we ask to check email or password nd show error message
                toast.error(`Check email or password`, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
            }
        }
    }

    componentDidUpdate(prevProps, prevState) {
        // we need componentDidUpdate to handle submit button and its states. 
        // if prevState submit button is disabled we check if all inputs were on focus
        if(prevState.submitButtonDisabled === true){
        if(
            this.state.emailOnFocus &&
            this.state.passwordOnFocus 
            ){
                if(
                    // if yes, we check that there are no errors
                    this.state.emailError.length ===0 && 
                    this.state.passwordError.length === 0){
                        // if no errors, we enable the button
                        this.setState({
                            submitButtonDisabled:false
                        })
                    }
                }
            }
        }
        
    

    render() {
        const {
            email,
            password,
            emailError,
            passwordError,
            submitButtonDisabled,

        } = this.state
        return (
                <div className="container">
                <div className="form-text">Login</div>
                <div className="form-div">
                    <form className="form" onSubmit={this.handleOnSubmit}>
                        <div className="form-group-block">
                            <div className="block-container">
                                <label htmlFor="email">Email</label>
                                <input 
                                type="email" 
                                id="email" 
                                value={email} 
                                placeholder="Email"
                                name="email"
                                onChange={this.handleOnChange}
                                autoFocus
                                onBlur={this.handleOnBlur}
                                onFocus={this.handleInputOnFocus}/>
                                <br />
                                {/* span message shows if there are error messages */}
                                <span className = "errorMessage"> {emailError && emailError}</span>
                            </div>
                        </div>

                            <div className="form-group-block">
                                <div className="block-container">
                                <label htmlFor="password">Password</label>
                                <input 
                                type="text" 
                                id="password" 
                                value={password} 
                                placeholder="Password"
                                name="password"
                                onChange={this.handleOnChange}
                                onBlur={this.handleOnBlur}
                                onFocus={this.handleInputOnFocus}/>
                                <br />
                                <span className = "errorMessage"> {passwordError && passwordError}</span>
                            </div>
                        </div>

                        <div className="button-container">
                            {/* disabled state handled by submitButtonDissabled */}
                            <button type="submit" disabled={submitButtonDisabled} >Submit</button> 
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

// export login 

export default Login
