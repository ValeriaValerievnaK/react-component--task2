import { useState, useEffect } from 'react';

export const useRequestGetTasks = () => {
	const [task, setTasks] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);

		fetch(`http://localhost:3005/todos`)
			.then((response) => response.json())
			.then((responseJson) => {
				setTasks(responseJson);
			})
			.catch((error) => {
				console.error(error);
			})
			.finally(() => setIsLoading(false));
	}, []);

	return { task, setTasks, isLoading };
};

export const useRequestUpdateValue = (setTasks) => {
	const [isUpdating, setIsUpdating] = useState(false);
	const [editingId, setEditingId] = useState(null);
	const [editValue, setEditValue] = useState('');

	const requestUpdateValue = (value, id) => {
		setIsUpdating(true);

		fetch(`http://localhost:3005/todos/${id}`, {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({
				title: value,
			}),
		})
			.then((rawResponse) => rawResponse.json())
			.then((updatedTask) => {
				setTasks((prevTask) =>
					prevTask.map((task) =>
						task.id === updatedTask.id ? updatedTask : task,
					),
				);
			})
			.catch((error) => {
				console.error(error);
			})
			.finally(() => {
				setIsUpdating(false), setEditValue('');
			});
	};

	const handleEditClick = (id, currentTitle) => {
		setEditingId(id);
		setEditValue(currentTitle.trim());
	};

	const handleSaveClick = (id) => {
		requestUpdateValue(editValue, id);
		setEditingId(null);
	};

	return {
		handleEditClick,
		handleSaveClick,
		editingId,
		isUpdating,
		setEditValue,
	};
};

export const useRequestDeleteValue = (setTasks) => {
	const [isDeleting, setIsDeleting] = useState(false);

	const requestDeleteValue = (id) => {
		setIsDeleting(true);

		fetch(`http://localhost:3005/todos/${id}`, {
			method: 'DELETE',
		})
			.then(() => {
				setTasks((prevTask) => prevTask.filter((task) => task.id !== id));
			})
			.finally(() => setIsDeleting(false));
	};

	return { requestDeleteValue, isDeleting };
};

export const useRequestCreateValue = (setTasks, setIsSorting) => {
	const [isCreating, setIsCreating] = useState(false);
	const [editNewValue, setEditNewValue] = useState('');

	const requestCreateValue = () => {
		if (editNewValue && editNewValue.trim().length) {
			setIsCreating(true);

			fetch(`http://localhost:3005/todos`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json;charset=utf-8' },
				body: JSON.stringify({
					title: editNewValue,
				}),
			})
				.then((rawResponse) => rawResponse.json())
				.then((newTask) => {
					setTasks((prevTask) => [...prevTask, newTask]);
				})
				.finally(() => {
					setIsCreating(false), setEditNewValue(''), setIsSorting(false);
				});
		}
	};

	return { requestCreateValue, isCreating, setEditNewValue, editNewValue };
};
