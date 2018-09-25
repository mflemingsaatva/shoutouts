
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { AppWrapper } from '../styles';

import NavBar from './NavBar';
import Dashboard from './Dashboard';
import Profile from './Profile';

export default () => (
	<Router>
		<AppWrapper>
			<Route component={NavBar}/>
			<Route exact path="/" component={Dashboard}/>
			<Route path="/u/:userId" component={Profile}/>
		</AppWrapper>
	</Router>
);
