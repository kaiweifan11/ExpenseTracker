import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import authReducer from './authReducer';
import expenseReducer from './expenseReducer';

export default combineReducers({
	auth: authReducer,
	form: reduxForm,
	expenses: expenseReducer
});