import NavBar from './Elements/Navbar.jsx';
import { Component } from 'react';
import React from 'react';
import { withRouter } from 'react-router';
import propServices from '../services/propServices';

class App extends Component {
    constructor(props){
        super(props);
        // TODO: allow users to create account, take out hardcoding
        this.state = {
            user : "Rue",
            propositions : []
        };
        this.addNewProposition = this.addNewProposition.bind(this);
        this.fetchAllPropositions = this.fetchAllPropositions.bind(this);
        this.loginUser = this.loginUser.bind(this);
        this.registerUser = this.registerUser.bind(this);
    }

    componentWillMount(){
        // this.fetchAllPropositions();
    }

    addNewProposition(proposition){
      this.setState((prevState) => {
        prevState.propositions.unshift(proposition);
        return prevState;
      });
    }

    fetchAllPropositions(){
        propServices.getAllPropositions().then((resp) => {
          this.setState((prevState) => {
            prevState.propositions = resp.content.propositions;
            return prevState;
          });
        });
    }

    registerUser(){
        var thisComponent = this;
        authServices.registerUser(emailAddress, password, firstName, lastName)
            .then((res) => {
                if (res.success) {
                    authServices.loginHost(emailAddress, password).then((res) => {
                        if (res.success) {
                            thisComponent.setState((prevState) => {
                                prevState.currentUser = res.content.host;
                                prevState.loginError=false;
                                prevState.duplicateAccount = false;
                                return prevState;
                            });
                            thisComponent.props.router.push('/host/');
                        }
                    });
                }
                callback(null);
            }).catch((err) => {
                if (err.error && err.error.message) {
                    callback(err.error.message);
                } else {
                    callback("Unexpected error");
                }
            });
    }

    loginUser(email, password, callback){
        var thisComponent = this;
        authServices.loginUser(email, password)
            .then((res) => {
                if (res.success) {
                    thisComponent.setState((prevState) => {
                        prevState.currentUser = res.content.user;
                    });
                    thisComponent.props.router.push('/');
                }
                callback(null);
            }).catch((err) => {
                if (err.error && err.error.message) {
                    callback(err.error.message);
                } else {
                    callback("Unexpected error");
                }
            });
    }


    render(){
        return (
            <div id='reactRoot'>
                <NavBar
                    currentUser={this.state.user}
                    logout={this.logout}
                    />
                <div id='page-content'>
                    {React.cloneElement(this.props.children, {
                        propositions : this.state.propositions,
                        addNewProposition: this.addNewProposition,
                        fetchAllPropositions: this.fetchAllPropositions,
                        loginUser: this.loginUser,
                        registerUser: this.registerUser,
                    })}
                </div>
            </div>
        );
    }
};

App.propTypes = {
};

export default withRouter(App);
