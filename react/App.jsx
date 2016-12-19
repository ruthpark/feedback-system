import NavBar from './Elements/Navbar.jsx';
import { Component } from 'react';
import React from 'react';
import { withRouter } from 'react-router';
// import propServices from '../services/propServices';

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
    }

    componentWillMount(){
        fetchAllPropositions();
    }

    addNewProposition(proposition){
        // add this moment as date in database
      this.setState((prevState) => {
        prevState.propositions.unshift(proposition);
        return prevState;
      });
    }

    fetchAllPropositions(){
        propServices.getAllProps().then((resp) => {
          this.setState((prevState) => {
            prevState.propositions = resp.content.propositions;
            return prevState;
          });
        });
    }


    render(){
        return (
            <div id='reactRoot'>
                <NavBar
                    currentUser={this.state.user}
                    logout={this.logout}
                    services ={Services}
                    />
                <div id='page-content'>
                    {React.cloneElement(this.props.children, {
                        propositions : this.state.propositions,
                        addNewProposition: this.addNewProposition,
                        fetchAllPropositions: this.fetchAllPropositions,
                    })}
                </div>
            </div>
        );
    }
};

App.propTypes = {
};

export default withRouter(App);
