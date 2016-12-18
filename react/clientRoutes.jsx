import App from './App.jsx';
import Home from './Pages/Home.jsx';
import NotFound from './Pages/NotFound.jsx';
import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

export default (
    <Router history={browserHistory} >
        <Route path='/' component={App}  >
            <IndexRoute component={Home} />
            <Route path="*"
                   component={NotFound} />
        </Route>
    </Router>
);
