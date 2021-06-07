import React, {Component} from 'react';
import { connect } from 'react-redux';
import { fetchExpenses } from '../../actions';
import { withRouter } from 'react-router-dom';
import Chart_Pie from '../Charts/Chart_Pie';

class ExpenseList extends Component {
	componentDidMount(){
		this.props.fetchExpenses();
		this.pieChart = React.createRef();
	}
	
	componentDidUpdate(prevProps) {
	    // Typical usage (don't forget to compare props):
	    if (this.props.expenses !== prevProps.expenses) {
	    	this.pieChart.current.generateChart();
	    }
	}
	
	renderExpenses(){
		return this.props.expenses.reverse().map(expense =>{
			let dateSent = new Date(expense.dateSent);
			let dateString = dateSent.toLocaleString();
			
			return(
				<div className="card blue-grey darken-1" key={expense._id} onClick={()=>this.handleEdit(expense)}>
					<div className="card-content">
						<p className='right white-text'>
							{expense.category}
						</p>
						<span className="card-title white-text">{expense.name}</span>
						<p className="white-text">
							${expense.amount.toFixed(2)}
						</p>
						<div>
							<p className='right' style={{color: '#80a3b1'}}>
								Created on: {dateString}
							</p>
						</div>
					</div>
				</div>
			)
		});
	}
	
	handleEdit = (expense) => {
		this.props.history.push({
		  pathname: '/expenses/expense',
		  expense: expense
		})
	}
	
	getData = (expenses) =>{
		let data = [];
		
		let categoryData = {};
		this.props.expenses.map(expense =>{
			categoryData[expense.category] = expense.amount;
		});
		
		for(let categoryName in categoryData){
			let row = [];
			row.push(categoryName);
			row.push(categoryData[categoryName]);
			data.push(row)
		}
		
		return data;
	}
	
	render(){
		let chart_width = (this.props.width-40)/3;
		let chart_height = chart_width*2;
		
		let data = this.getData(this.props.expenses);
		
		return(
			<div>
				<Chart_Pie
					id="today"
					ref={this.pieChart}
					chart_width={chart_width}
					chart_height={chart_height}
					data={data}
					title={'Expenses'}
				/>
				{this.renderExpenses()}
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {expenses: state.expenses};
}

export default connect(mapStateToProps, { fetchExpenses })(withRouter(ExpenseList));
