// ExpenseForm shows a form for user to input
import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

class ExpenseForm extends Component{
	constructor(props){
		super(props);
		
		let name ='';
		let amount = '';
		let category = 'Food';
		let is_show_delete = false;
		
		if(this.props.location!=null){
			if(this.props.location.expense!= null){
				name = this.props.location.expense.name;
				amount = this.props.location.expense.amount;
				category = this.props.location.expense.category;
				is_show_delete = true;
			}
		}
		
		this.state = {
			name: name,
			amount: amount,
			category: category,
			
			is_show_name_err: false,
			is_show_amount_err: false,
			is_show_delete: is_show_delete,
		}
	}
	
	handleChangeName = (val) =>{
		this.setState({name: val})
	}
	
	handleChangeAmount = (val) =>{
		this.setState({amount: val})
	}
	
	handleChangeCategory = (val) =>{
		this.setState({category: val})
	}
	
	handleSubmitForm = (event) =>{
		event.preventDefault();
		let values = {};
		if(this.state.name == ''){
			this.setState({is_show_name_err: true});
			return;
		}
		if(this.state.amount == null || this.state.amount == ''){
			this.setState({is_show_amount_err: true});
			return;
		}

		values.name = this.state.name;
		values.amount = this.state.amount;
		values.category = this.state.category;
		
		let is_new = true;
		if(this.props.location!=null){
			if(this.props.location.expense!= null){
				is_new = false
			}
		}
		
		if(is_new){
			this.props.createExpense(values, this.props.history);
		}else{
			values.id = this.props.location.expense._id;
			this.props.updateExpense(values, this.props.history);
		}
	}
	
	handleDelete = () =>{
		this.props.deleteExpense(this.props.location.expense._id, this.props.history);
	}
	
	render(){
		let categoryOptions = [];
	    categoryOptions.push(<p key="expenseFood"><label><input className="with-gap" name="category" type="radio" checked={this.state.category === "Food"} value="Food" onChange={event=>this.handleChangeCategory(event.target.value)}/> <span>Food</span></label></p>);
	    categoryOptions.push(<p key="expenseTransport"><label><input className="with-gap" name="category" type="radio" checked={this.state.category === "Transport"} value="Transport" onChange={event=>this.handleChangeCategory(event.target.value)}/> <span>Transport</span></label></p>);
	    categoryOptions.push(<p key="expenseRetail"><label><input className="with-gap" name="category" type="radio" checked={this.state.category === "Retail"} value="Retail" onChange={event=>this.handleChangeCategory(event.target.value)}/> <span>Retail</span></label></p>);
	    categoryOptions.push(<p key="expenseOthers"><label><input className="with-gap" name="category" type="radio" checked={this.state.category === "Others"} value="Others" onChange={event=>this.handleChangeCategory(event.target.value)}/> <span>Others</span></label></p>);
	     
		return(
			<div>
				<form onSubmit={(event)=>this.handleSubmitForm(event)}>
					<div>
						<label>Expense Name</label>
						<input type="text" value={this.state.name} style={{marginBottom: 5}} onChange={event=>this.handleChangeName(event.target.value)}/>
						<div className="red-text" style={{display: this.state.is_show_name_err?'block':'none', marginBottom: 20}}>
							Please enter a name
						</div>
					</div>
					<div>
						<label>Amount ($)</label>
						<input type="number" value={this.state.amount} style={{marginBottom: 5}} onChange={event=>this.handleChangeAmount(event.target.value)}/>
						<div className="red-text" style={{display: this.state.is_show_amount_err?'block':'none', marginBottom: 20}}>
							Please enter an amount
						</div>
					</div>
					<div>
				    	<label>Category</label>
					    {categoryOptions}
					</div>
					
					<Link to="/expenses" className="orange btn-flat white-text">
						Cancel
					</Link>
					<button type="submit" className="teal btn-flat right white-text">
						Save
						<i className="material-icons right">done</i>
					</button>
				</form>
				<div className="left" style={{display: this.state.is_show_delete?'block':'none'}}>
					<div className="fixed-action-btn" style={{left: 123, bottom: 53}} onClick={this.handleDelete}>
						<Link to="/expenses/expense" className="btn-floating btn-large waves-effect waves-light red">
							<i className="material-icons">delete</i>
						</Link>
					</div>
				</div>
			</div>
		);
	}
}

export default connect(null, actions)(withRouter(ExpenseForm))