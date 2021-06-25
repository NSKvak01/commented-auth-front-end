// we bring react
import React, { Component } from 'react'
// import signup css file
import "./Signup.css"
// we bring functions from validator
import {isAlpha, isStrongPassword, isAlphanumeric, isEmail, isEmpty} from "validator"
// bring Axios file
import Axios from "../utils/Axios"
// bring toast for notifications
import { toast } from 'react-toastify';
;

export class Signup extends Component {
    // create state
    state = {
        firstName:"",
        lastName:"",
        username:"",
        email:"",
        password:"",
        confirmPassword:"",
        error:false,
        firstNameError:"",
        lastNameError:"",
        emailError:"",
        usernameError:"",
        passwordError:"",
        confirmPasswordError:"",
        submitButtonDisabled:true,
        confirmPasswordFocus:false,
        firstNameOnFocus:false,
        lastNameOnFocus:false,
        usernameOnFocus:false,
        emailOnFocus:false,
        passwordOnFocus:false,
        confirmPasswordOnFocus:false,

    };
//Here we handle first and lst names to check if inputs are empty 
    handleFirstAndLastNameInput = (event) =>{
        // if the length is 0 than we assign fristName or Lastname error messages and keep submit button disabled
        if (this.state[event.target.name].length===0){
            this.setState({
                [`${event.target.name}Error`]:`Please type your ${event.target.placeholder.toLowerCase()}`,
                isButtonDisabled:true
            })
        } else {
            // if the length is not empty we check if there are numbers and special symbols using isAlpha. If not, assign error message that first and last names can only contain letters adn keep submit button disabled
            if(!isAlpha(event.target.value)){
                this.setState({
                    [`${event.target.name}Error`]:`${event.target.placeholder} can only contain letters`,
                submitButtonDisabled:true

                })
            } else{
                // else there are no errors
                this.setState({
                    [`${event.target.name}Error`]:""
                })
            } 
        } 
    }

    handleUsernameInput = (event)=>{
        // We check if username empty
        if (this.state.username.length===0){
            this.setState({
                usernameError:"Please create username",
                submitButtonDisabled:true

            })
        } else {
            // if not, we check if it's alphanumeric if not, we keep button disabled and tell users that username cannot contain special symbols
            if(!isAlphanumeric(event.target.value)){
                this.setState({
                    usernameError:"Username can only contain letters and numbers",
                    submitButtonDisabled:true

                })
            } else{
                // otherwise there are no errors
                this.setState({
                    usernameError:""
                })
            }
        }
    }

    handleEmailInput = (event)=>{
        // we check email if it's empty
        if (this.state.email.length===0){
            this.setState({
                emailError:"Please type your email",
                submitButtonDisabled:true

            })
        } else {
            // if not we check if it is in email format
            if(!isEmail(event.target.value)){
                this.setState({
                    emailError:"Please type the correct email format",
                    submitButtonDisabled:true

                })
            } else{
                // if yes, continue checking password
                this.setState({
                    emailError:""
                })
            }
        }
    }

    handlePasswordInput = (event) =>{
        // check password
        if (this.state.password.length===0){
            this.setState({
                passwordError:"Please create password",
            submitButtonDisabled:true

            })
        } else {
            // check if it is strong password
            if(!isStrongPassword(event.target.value)){
                this.setState({
                    passwordError:"Password must include 1 lowercase, 1 uppercase, 1 special character, 1 number, and a length of 8",
            submitButtonDisabled:true

                })
            
            } else{
                // if everything is fine passwordError is empty
                this.setState({
                    passwordError:""
                })
            } 
            if(this.state.confirmPasswordOnFocus){
                if(this.state.password !== this.state.confirmPassword){
                    this.setState({
                        confirmPasswordError:"Password doesn't match",
                        submitButtonDisabled:true

                    })
                } else{
                    this.setState({
                        confirmPasswordError:""
                    })
                }
            }
        }
    }
        
    handleConfirmPasswordInput = (event) =>{
        // here we check if it's empty
        if (this.state.confirmPassword.length===0){
            this.setState({
                confirmPasswordError:"Please confirm password",
            submitButtonDisabled:true

            })
        } else {
            // if not we check if password is strong password
            if(isStrongPassword(this.state.password)){
                // if yes, we compare password and confirm 
                    if(this.state.password !== this.state.confirmPassword){
                        // if they don;t match we kee the button disabled and assign confirmPasswordError message
                        this.setState({
                            confirmPasswordError:"Password doesn't match",
            submitButtonDisabled:true

                        })
                    } else {
                        // if they match, there are no errors
                        this.setState({
                            confirmPasswordError:""
                        })
                    }
                } else{
                    // if password is not strong it doesn't allow to type confirm password
                    this.setState({
                        confirmPassword:""
                    })
                }
            }
    }

    // we create this funciton to handle input
    handleOnChange = (event) => {
        // it gets the name of the input and assigns values when typing
        this.setState({
            [event.target.name] : event.target.value
        }, ()=>{
            // when we are in first name or last name inputs it starts checking everything we defined in handleFirstandLastNameInput funciton above
            if(event.target.name==="firstName" || event.target.name==="lastName"){
                this.handleFirstAndLastNameInput(event)

            }
            // if input name is email, it handles email errors
            if(event.target.name==="email"){
                this.handleEmailInput(event)

            }
            // if input name username it handles username errors
            if(event.target.name==="username"){
                this.handleUsernameInput(event)

            }
            // the same in password
            if(event.target.name==="password"){
                this.handlePasswordInput(event)

            }
            // here it checks confirm password for errors
            if(event.target.name==="confirmPassword"){
                this.handleConfirmPasswordInput(event)
            }
        })
    

    }

    handleOnBlur = (event)=>{
        // here we check if we focused on input but exited it and input value is still empty
        if(event.target.value.length===0 && event.target.name==="firstName"){
            this.setState({
                firstNameError:"Please type your first name"
            })
        }
        if(event.target.value.length===0 && event.target.name==="lastName"){
            this.setState({
                lastNameError:"Please type your last name"
            })
        }
        if(event.target.value.length===0 && event.target.name==="email"){
            this.setState({
                emailError:"Please type your email"
            })
        }
        if(event.target.value.length===0 && event.target.name==="username"){
            this.setState({
                usernameError:"Please create username"
            })
        }
        if(event.target.value.length===0 && event.target.name==="password"){
            this.setState({
                passwordError:"Please create password"
            })
        }
        if(event.target.value.length===0 && event.target.name==="confirmPassword"){
            this.setState({
                confirmPasswordError:"Please confirm password"
            })
        }
    }

    handleOnSubmit = async (event)=>{
        // we need to prevent defalt
        event.preventDefault()
        try { 
            // we create userinputObj and save all info
            let userInputObj = {
                firstName: this.state.firstName,
                lastName:this.state.lastName,
                email:this.state.email,
                username:this.state.username,
                password:this.state.password,
            }

            // then we use axios to save user
            let success = await Axios.post("/api/user/sign-up", userInputObj)
            console.log(success)
            // once it's done toast will show successful message
            toast.success(`User created - Please login`, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        } catch (error) {
            // if not successaful it will show error message
            toast.error(`${error.response.data.message}`, {
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
        
    componentDidUpdate(prevProps, prevState) {
        // we need componentDidUpdate to handle submit button and its states. 
        // if prevState submit button is disabled we check if all inputs were on focus
        if(prevState.submitButtonDisabled === true){
        if(
            this.state.firstNameOnFocus &&
            this.state.lastNameOnFocus &&
            this.state.usernameOnFocus &&
            this.state.emailOnFocus &&
            this.state.passwordOnFocus &&
            this.state.confirmPasswordOnFocus
            ){
                if(
                    // if yes, we check that there are no errors
                    this.state.firstNameError.length===0 && 
                    this.state.lastNameError.length ===0 && 
                    this.state.usernameError.length === 0 && 
                    this.state.emailError.length ===0 && 
                    this.state.passwordError.length === 0 && 
                    this.state.password ===this.state.confirmPassword){
                        // if no errors, we enable the button
                        this.setState({
                            submitButtonDisabled:false
                        })
                }
            }
        }
    }

    handleInputOnFocus = (event)=>{
        // here we handle input on focus and turn it to true if user clicked on input
        if(!this.state[`${event.target.name}OnFocus`]){
            this.setState({
                [`${event.target.name}OnFocus`]:true
            })
        }
    }
    render() {
        // we bring all variables from state so it's easier to type
        const {
            firstName,
            lastName,
            username,
            email,
            password,
            confirmPassword,
            firstNameError,
            lastNameError,
            emailError,
            usernameError,
            passwordError,
            confirmPasswordError,
            submitButtonDisabled,

        } = this.state

        // here we create elements
        return (
            <div className="container">
                <div className="form-text">Sign up</div>
                <div className="form-div">
                    <form className="form">
                        <div className="form-group-inline">
                            <div className="inline-container">
                                <label htmlFor="firstName">First name</label>
                                {/* for input we create type, id, value, placeholder and bring onchange and onfocus and onblur functions and also bring autoFocus so user can continue typing */}
                                <input 
                                type="text" 
                                id="firstName" 
                                value={firstName} 
                                placeholder="First name"
                                name="firstName"
                                onChange={this.handleOnChange}
                                autoFocus
                                onBlur={this.handleOnBlur}
                                onFocus={this.handleInputOnFocus}/>
                                <br />
                                {/* span message shows if there are error messages */}
                                <span className = "errorMessage"> {firstNameError && firstNameError}</span>
                            </div>

                            <div className="inline-container">
                                <label htmlFor="lastName">Last name</label>
                                <input 
                                type="text" 
                                id="lastName" 
                                value={lastName} 
                                placeholder="Last name"
                                name="lastName"
                                onChange={this.handleOnChange}
                                onBlur={this.handleOnBlur}
                                onFocus={this.handleInputOnFocus}/>
                                <br />
                                <span className = "errorMessage"> {lastNameError && lastNameError}</span>
                            </div>
                        </div>

                        <div className="form-group-block">
                            <div className="block-container">
                                <label htmlFor="email">Email</label>
                                <input 
                                type="text" 
                                id="email" 
                                value={email} 
                                placeholder="Email"
                                name="email"
                                onChange={this.handleOnChange}
                                onBlur={this.handleOnBlur}
                                onFocus={this.handleInputOnFocus}/>
                                <br />
                                <span className = "errorMessage"> {emailError && emailError}</span>
                            </div>
                        </div>

                        <div className="form-group-block">
                            <div className="block-container">
                                <label htmlFor="username">Username</label>
                                <input 
                                type="text" 
                                id="username" 
                                value={username} 
                                placeholder="Username"
                                name="username"
                                onChange={this.handleOnChange}
                                onBlur={this.handleOnBlur}
                                onFocus={this.handleInputOnFocus}/>
                                <br />
                                <span className = "errorMessage"> {usernameError && usernameError}</span>
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
                                onFocus={this.handleInputOnFocus}
                                />
                                <br />
                                <span className = "errorMessage"> {passwordError && passwordError}</span>
                            </div>
                        </div>

                        <div className="form-group-block">
                            <div className="block-container">
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                <input 
                                type="text" 
                                id="confirmPassword"
                                value={confirmPassword} 
                                placeholder="Confirm password"
                                name="confirmPassword"
                                onChange={this.handleOnChange}
                                onBlur={this.handleOnBlur}
                                onFocus = {this.handleInputOnFocus}
                                />
                                <br />
                                <span className = "errorMessage"> {confirmPasswordError && confirmPasswordError}</span>
                            </div>
                        </div>
                            {/* disabled is handled by submitButtonDisabled , onClick is habdled by handleSubmitOnCKick*/}
                        <div className="button-container">
                            <button type="submit" disabled={submitButtonDisabled} onClick={this.handleOnSubmit}>Submit</button> 
                        </div>

                    </form>
                </div>
            </div>
        )
    }
}

export default Signup
