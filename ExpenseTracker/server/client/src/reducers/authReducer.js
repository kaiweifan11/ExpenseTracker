import { FETCH_USER } from '../actions/types';

export default function authReducer(state = null, action){
	switch(action.type){
		case FETCH_USER:
			// FETCH_USER either returns 
			// state = null -> no data yet
			// actions.payload -> authenticated
			// false -> not authenticated
			return action.payload || false;
		default:
			return state;
	}
}