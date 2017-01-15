/*
 Those who dare to fail miserably can achieve greatly -JFK
 */

import { Component } from 'react';
import React from 'react';
import { IndexLink, Link, withRouter } from 'react-router';

class NavBar extends Component {
    constructor(props){
        super(props);
        this.state = {
        }
    }

    componentWillMount() {
    }


    render() {
        return (
            <nav className="navbar navbar-inverse navbar-fixed-top bug-fix" role="navigation">
                <div className="container">
                    <div className="navbar-header">
                        <IndexLink to='/'
                                   className="navbar-brand"
                                   style={{display: this.props.currentUser ? 'block' : 'none'}}>
                            {this.props.currentUser}
                        </IndexLink>
                        <button type="button"
                                className="navbar-toggle collapsed"
                                data-toggle="collapse"
                                data-target="#bs-example-navbar-collapse-1"
                                aria-expanded="false">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>                      
                        </button>
                    </div>

                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <ul className="nav navbar-nav navbar-right">
                            <li>
                                <Link>Feed</Link>
                            </li>
                            <li>
                                <IndexLink>Trending</IndexLink>
                            </li>
                            <li>
                                <Link>Log Out</Link>
                            </li>
                        </ul>
                    </div>
                </div>

            </nav>
        )
    }// end of render
}

NavBar.propTypes = {
};

export default withRouter(NavBar);