import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import TodoList from './TodoList';
import { Provider } from 'react-redux';
import { store } from './store/store';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
	<React.StrictMode>
		<Provider store={store}>
			<TodoList />
		</Provider>
	</React.StrictMode>,
);
