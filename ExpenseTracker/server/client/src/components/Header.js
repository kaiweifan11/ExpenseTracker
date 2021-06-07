import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends Component {
	renderContent(){
		switch (this.props.auth){
			case null:
				return 'Please Wait...';
			case false:
				return <li><a href="/auth/google">Login to Google</a></li>
			default:
				return <li><a href="/api/logout">Logout</a></li>;
		}
	}
	
	render(){
		return(
			<nav>
				<div className="nav-wrapper">
			      	<Link to={this.props.auth?'/expenses':'/'} className="left brand-logo">Expense Tracker</Link>
			      	<ul id="nav-mobile" className="right">
			      		{/*}<li><a>Login With Google</a></li>*/}
			      		{this.renderContent()}
			        </ul>
			    </div>
			  </nav>
		);
	}
}

function mapStateToProps(state){
	return { auth: state.auth }
}

export default connect(mapStateToProps)(Header);