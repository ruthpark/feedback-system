import { Component } from 'react';
import React from 'react';
import Proposition from './Proposition.jsx';

export default class Feed extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div>
                { this.props.propositions.map((prop, key) => { return <Proposition proposition={prop} key={key} />})}
            </div>
        )
    }
}

Feed.propTypes = {
};
