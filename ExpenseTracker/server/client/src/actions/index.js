import axios from 'axios';
import { FETCH_USER, FETCH_EXPENSES } from './types';

export const fetchUser = () =>{
	return function(dispatch){
		axios.get('/api/current_user')
		  .then(res => dispatch({type: FETCH_USER, payload: res.data}));
	}
};

export const createExpense = (values, history) => async dispatch => {
	const res = await axios.post('/api/createExpense', values);

	history.push('/expenses');
	dispatch({ type: FETCH_USER, payload: res.data });
};

export const updateExpense = (values, history) => async dispatch => {
	const res = await axios.post('/api/updateExpense', values);

	history.push('/expenses');
	dispatch({ type: FETCH_USER, payload: res.data });
};

export const deleteExpense = (id, history) => async dispatch => {
	const res = await axios.post('/api/deleteExpense', {id: id});

	history.push('/expenses');
	dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchExpenses = () => async dispatch =>{
	const res = await axios.get('/api/expenses');
	dispatch({ type: FETCH_EXPENSES, payload: res.data });
};

