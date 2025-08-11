import React, { useEffect, useState } from 'react';
import { AppContext } from './context/context';
import TodoList from './TodoList';
import styles from './todoList.module.css';

export const App = () => {
	const [data, setData] = useState(null);

	useEffect(() => {
		fetch(`http://localhost:3005/todos`)
			.then((res) => res.json())
			.then((data) => setData(data))
			.catch(() => setData([]));
	}, []);

	if (data === null) return <div className={styles.loader}></div>;

	return (
		<React.StrictMode>
			<AppContext value={{ value: data }}>
				<TodoList />
			</AppContext>
		</React.StrictMode>
	);
};
