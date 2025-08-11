import { useState, useEffect } from 'react';
import { useContext } from 'react';
import { AppContext } from '../context/context';

export const useHandleHook = () => {
	const [task, setTasks] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const [isUpdating, setIsUpdating] = useState(false);
	const [editingId, setEditingId] = useState(null);
	const [editValue, setEditValue] = useState('');

	const [isDeleting, setIsDeleting] = useState(false);

	const [isCreating, setIsCreating] = useState(false);
	const [editNewValue, setEditNewValue] = useState('');

	// забрали данные из камтекста
	const { value: contextValue } = useContext(AppContext);

	useEffect(() => {
		setIsLoading(true);

		if (contextValue) {
			setTasks(contextValue);
			setIsLoading(false);
		}
	}, [contextValue]);

	// Обновить значение
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

	const handleSaveClick = (id) => {
		requestUpdateValue(editValue, id);
		setEditingId(null);
	};

	const handleEditClick = (id, currentTitle) => {
		setEditingId(id);
		setEditValue(currentTitle.trim());
	};

	// Удалить значение
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

	// Создать значение
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
					setIsCreating(false), setEditNewValue('');
				});
		}
	};

	return {
		task,
		isLoading,
		handleSaveClick,
		handleEditClick,
		isUpdating,
		editingId,
		editValue,
		requestDeleteValue,
		isDeleting,
		requestCreateValue,
		isCreating,
		setEditNewValue,
		editNewValue,
	};
};
