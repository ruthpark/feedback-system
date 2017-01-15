/*
 * Those who dare to fail miserably can achieve greatly -JFK
 */

// refactor later so that login page doesn't have navbar.

import { Component } from 'react';
import React from 'react';
import { withRouter } from 'react-router';
import Constants from '../../../Constants.js';

// components
import ErrorMessage from '../../Common/Elements/ErrorMessage.jsx';


export default class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            emailAddress: "",
            password: "",
            checkPassword: "",
            firstName: "",
            lastName: "",
            newAccount: false,
            errorMessage: "",
        };
        this.loginHost = this.loginHost.bind(this);
        this.registerHost = this.registerHost.bind(this);
        this.updateFormVal = this.updateFormVal.bind(this);
        this.changeForm = this.changeForm.bind(this);
    };

    updateFormVal(event){
        var updatedField = event.target.name;
        var updatedValue = event.target.value;
        this.setState((prevState) => {
            prevState[updatedField] = updatedValue;
            return prevState;
        })
    }

    loginUser() {
        if (this.state.newAccount) {
            this.registerUser();
        } else {
            this.props.loginUser(
                this.state.emailAddress,
                this.state.password,
                function(errMessage) {
                    if (errMessage) {
                        this.setState({errorMessage:errMessage});
                    } else {
                        this.setState({errorMessage:null});
                    }
                });
        }
    }

    //  creates a new user account
    //  checks that passwords match
    //  checks that all fields filled out
    //  checks that email is valid email string
    //  avoids creating duplicate accounts wrt email (checked in App.jsx)
    registerUser() {

        //check inputs for adequacy
        var passwordsMatch = (this.state.password === this.state.checkPassword);
        var passwordNonempty = this.state.password.length;
        var emailNonempty = this.state.emailAddress.length;
        var namesNonempty = this.state.firstName.length && this.state.lastName.length;
        var fieldsNonempty = passwordNonempty && emailNonempty && namesNonempty;
        var validEmail = Constants.EMAIL_REGEX.test(this.state.emailAddress);

        if (passwordsMatch && fieldsNonempty && validEmail){
            //remove error message
            this.setState((prevState) => {
                prevState.errorMessage = "";
                return prevState;
            });
            //register the user
            this.props.registerUser(
                this.state.emailAddress,
                this.state.password,
                this.state.firstName,
                this.state.lastName,
                function(errMessage) {
                    if (errMessage) {
                        this.setState({errorMessage:errMessage});
                    } else {
                        this.setState({errMessage:null});
                    }
                });
        } else if (!fieldsNonempty) {
            this.setState((prevState) => {
                prevState.errorMessage = "Fields may not be left blank.";
                return prevState;
            });
        } else if (!validEmail){ 
            this.setState((prevState) => {
                prevState.errorMessage = "Invalid email address.";
                return prevState;
            });
        } else if (!passwordsMatch) {
            this.setState((prevState) => {
                prevState.errorMessage = "Passwords do not match."; 
                prevState.password = "";
                prevState.checkPassword = "";
                return prevState;
            });
        }

    }

    changeForm() {
        this.props.resetLoginError();
        this.setState((prevState) => {
            //remove error message
            prevState.errorMessage = "";
            prevState.newAccount = !thisComponent.state.newAccount;
            return prevState;
        });
    }

    render(){
        var thisComponent = this;
        var message = thisComponent.state.newAccount ? "already have an account? Sign in " : "don't have an account? Sign up ";
        return (
            <div>
            	<h1>Welcome to the Feedback System!</h1>
            	<h3> sign in below to get started </h3>
                <div className="row">
                <hr />
                    <ErrorMessage errorMessage={thisComponent.state.errorMessage}/>
                    <div style={{ display: thisComponent.state.newAccount ? 'block': 'none' }}>
                        <input name="firstName"
                            placeholder="first name"
                            value={thisComponent.state.firstName}
                            onChange={thisComponent.updateFormVal}
                        />
                        <br />
                        <input name="lastName"
                            placeholder="last name"
                            value={thisComponent.state.lastName}
                            onChange={thisComponent.updateFormVal}
                        />
                    </div>

                    <input name="emailAddress"
                        placeholder="email"
                        value={thisComponent.state.emailAddress}
                        onChange={thisComponent.updateFormVal}
                    />
                    <br />

                    <input name="password"
                        placeholder="password"
                        type="password"
                        value={thisComponent.state.password}
                        onChange={thisComponent.updateFormVal}
                    />
                    <br />

                    {/*Confirm password for new hosts*/}
                    <div style={{ display: thisComponent.state.newAccount ? 'block': 'none' }}>
                        <input name="checkPassword"
                            placeholder="confirm password"
                            type="password"
                            value={thisComponent.state.checkPassword}
                            onChange={thisComponent.updateFormVal}
                        />
                        <br />
                    </div>

                    <input type="button"
                           className="btn btn-success full"
                           onClick={thisComponent.loginUser}
                           value={thisComponent.state.newAccount ? "REGISTER" : "LOGIN"} />
                    <p>{message} <span className="link" onClick={thisComponent.changeForm}>here</span></p>                    
                </div>
            </div>
        )
    }
}

Login.propTypes = {
};





                
