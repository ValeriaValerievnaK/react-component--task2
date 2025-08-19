import { appReducer, initialState } from './reducer';
import { createStore } from 'redux';

//Так как createStore из redux отображается устаревшим, то альтератива самописный
//
// const createStore = (reducer, initialState) => {
// 	let state = initialState;

// 	return {
// 		dispatch: (action) => {
// 			state = reducer(state, action);
// 		},

// 		getState: () => state,
// 		subscribe: (listener) => {
// 			listeners.push(listener);

// 			return () => {
// 				listeners = listeners.filter((l) => l !== listener);
// 			};
// 		},
// 	};
// };


export const store = createStore(appReducer, initialState);
