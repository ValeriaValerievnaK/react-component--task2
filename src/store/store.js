import { appReducer } from './reducer';
import { createStore } from 'redux';

export const store = createStore(appReducer);
