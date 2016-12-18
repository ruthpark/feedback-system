import { Component } from 'react';
import React from 'react';
import Feed from '../Elements/TweetFeed.jsx';
import NewProposition from '../Elements/TweetForm.jsx';

export default class Home extends Component {
    constructor(props){
        super(props);
    }

    componentWillMount(){
    }


    render(){
        return (
            <div className='container'>
                <div className='col-md-3' id='namebox'>
                    <h1>Propositions</h1>
                </div>
                <div className='col-md-6'>
                    <NewProposition onSubmit={this.props.addNewProposition}/>
                    <Feed propositions={this.props.propositions} />
                </div>
            </div>
        )
    }
}

Home.propTypes = {
};
