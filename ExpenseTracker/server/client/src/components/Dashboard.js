import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link, withRouter} from 'react-router-dom';
import ExpenseList from './expenses/ExpenseList';

class Dashboard extends Component {
	componentDidMount(){
		if(this.props.auth != undefined || this.props.auth == null){
			if(this.props.auth == null || this.props.auth == false){
				this.props.history.push('/')
			}
		}
	}
	
	
	render(){
		let chart_width = (this.props.width-40)/3;
		let chart_height = chart_width*2;
		
		return(
			<div>
				<div>
					<ExpenseList />
				</div>
				<div className="fixed-action-btn">
					<Link to="/expenses/expense" className="btn-floating btn-large waves-effect waves-light red">
						<i className="material-icons">add</i>
					</Link>
				</div>
			</div>
		);
	}
	
}

function mapStateToProps(state){
	return { auth: state.auth }
}

export default connect(mapStateToProps)(withRouter(Dashboard));