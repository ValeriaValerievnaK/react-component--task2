import { useEffect, useState } from 'react';
import TodoListLayout from './TodoListLayout';

const randomNum = Math.floor(Math.random() * 9) + 1;

const TodoList = () => {
	const [task, setTasks] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);

		fetch(`https://jsonplaceholder.typicode.com/todos/${randomNum}`)
			.then((response) => response.json())
			.then((responseJson) => {
				setTasks(responseJson);
			})
			.catch((error) => {
				console.error(error);
			})
			.finally(() => setIsLoading(false));
	}, []);

	return <TodoListLayout isLoading={isLoading} task={task} />;
};

export default TodoList;
