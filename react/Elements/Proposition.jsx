import { Component } from 'react';
import React from 'react';
import moment from 'moment';

export default class Proposition extends Component {
    constructor(props){
        super(props);
    }

    render(){
        var prop = this.props.proposition;
        return (
            <div className='panel panel-default'>
                <div className='panel-body'>
                    <p>{ moment(prop.date).fromNow() }</p>
                    <p>{ prop.content }</p>
                    <button className="btn btn-success">upvote</button>
                </div>
            </div>
        )
    }
}

Proposition.propTypes = {
};
