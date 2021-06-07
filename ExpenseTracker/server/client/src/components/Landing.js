import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter} from 'react-router-dom';

class Landing extends Component {
	componentDidMount(){
		if(this.props.auth!= null && this.props.auth != false ){
			this.props.history.push('/expenses')
		}
	}
	
	render(){
		if(this.props.auth!= null && this.props.auth != false ){
			this.props.history.push('/expenses')
		}
		
		return(
			<div style={{textAlign: 'center'}}>		
				<h1>Expense Tracker</h1>
				Track all your expenses!
			</div>
		)
	}
	
}

function mapStateToProps(state){
	return { auth: state.auth }
}

export default connect(mapStateToProps)(withRouter(Landing));