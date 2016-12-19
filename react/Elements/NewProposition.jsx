import { Component } from 'react';
import React from 'react';
// import propServices from '../services/propServices';

export default class NewProposition extends Component {
    constructor(props){
        super(props);
        this.state = {
            content : ''
        }
        this.updateContent = this.updateContent.bind(this);
        this.createProposition = this.createProposition.bind(this);
    };

    updateContent(event){
        this.setState({
            content : event.target.value
        });
    }

    createProposition(){
        propServices.createProp(this.state.content)
          .then((resp) => {
            this.setState({content : ''})
            this.props.onSubmit(resp.content);
          });
    }

    render(){
        return (
            <div className='input-group'>
                <input type='text' placeholder="describe the problem here"
                       value={this.state.content} onChange={this.updateContent} />
                <span className='input-group-btn'>
                    <button type='button' className='btn btn-default' onClick={this.createProposition}>
                        Add
                    </button>
                </span>
            </div>
        );
    }
}
