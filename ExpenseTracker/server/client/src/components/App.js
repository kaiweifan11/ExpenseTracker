import React, {Component} from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';
import Expense from './expenses/Expense';

class App extends Component {
	componentDidMount(){
		this.authenticated = this.props.fetchUser();
	}
	
	render(){
		return(
			<div className="container">
				<BrowserRouter>
					<div>
						<Header />
						<Route exact path='/' component={Landing} />
						<Route exact path='/expenses' component={Dashboard} />
						<Route path='/expenses/expense' component={Expense} />
					</div>
				</BrowserRouter>
			</div>
		)
	}
}

export default connect(null, actions)(App);