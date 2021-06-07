import { FETCH_EXPENSES } from '../actions/types';

export default function expenseReducer(state = [], action){
	switch(action.type){
		case FETCH_EXPENSES:
			// FETCH_USER either returns 
			// state = null -> no data yet
			// actions.payload -> authenticated
			// false -> not authenticated
			return action.payload || false;
		default:
			return state;
	}
}