import React, {Component} from 'react';
import ExpenseForm from './ExpenseForm';
import { connect } from 'react-redux';
import { withRouter} from 'react-router-dom';

class Expense extends Component{
	componentDidMount(){
		if(this.props.auth != undefined || this.props.auth == null){
			if(this.props.auth == null || this.props.auth == false){
				this.props.history.push('/')
			}
		}
	}
	
	render(){
		return(
			<div>
				<ExpenseForm />
			</div>
		
		);
	}
}

function mapStateToProps(state){
	return { auth: state.auth }
}

export default connect(mapStateToProps)(withRouter(Expense));