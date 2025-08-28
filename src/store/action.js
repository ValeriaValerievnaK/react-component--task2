export const setData = (delta) => ({ type: 'SET_DATA', payload: delta });

export const setIsLoading = (delta) => ({
	type: 'SET_IS_LOADING',
	payload: delta,
});

export const setIsUpdating = (delta) => ({
	type: 'SET_IS_UPDATING',
	payload: delta,
});

export const setEditingId = (delta) => ({
	type: 'SET_EDITING_ID',
	payload: delta,
});

export const setEditValue = (delta) => ({
	type: 'SET_EDIT_VALUE',
	payload: delta,
});

export const setIsDeleting = (delta) => ({
	type: 'SET_IS_DELITING',
	payload: delta,
});

export const setIsCreating = (delta) => ({
	type: 'SET_IS_CRATING',
	payload: delta,
});

export const setEditNewValue = (delta) => ({
	type: 'SET_EDIT_NEW_VALUE',
	payload: delta,
});

export const getDataAsync = (dispatch) => {
	dispatch(setIsLoading(true));

	fetch('http://localhost:3005/todos')
		.then((data) => data.json())
		.then((data) => {
			dispatch(setData(data));
		})
		.catch(console.error)
		.finally(() => dispatch(setIsLoading(false)));
};

export const deleteDataAsync = (id) => (dispatch) => {
	dispatch(setIsDeleting(true));

	fetch(`http://localhost:3005/todos/${id}`, {
		method: 'DELETE',
	})
		.then(() => {
			dispatch(setData((prevTask) => prevTask.filter((task) => task.id !== id)));
		})
		.catch(console.error)
		.finally(() => dispatch(setIsDeleting(false)));
};

export const updateDataAsync = (value, id) => (dispatch) => {
	dispatch(setIsUpdating(true));

	fetch(`http://localhost:3005/todos/${id}`, {
		method: 'PATCH',
		headers: { 'Content-Type': 'application/json;charset=utf-8' },
		body: JSON.stringify({
			title: value,
		}),
	})
		.then((rawResponse) => rawResponse.json())
		.then((updatedTask) => {
			dispatch(
				setData((prevTask) =>
					prevTask.map((task) =>
						task.id === updatedTask.id ? updatedTask : task,
					),
				),
			);
		})
		.catch(console.error)
		.finally(() => {
			dispatch(setIsUpdating(false)), dispatch(setEditValue(''));
		});
};

export const requestDataAsync = (editNewValue) => (dispatch) => {
	dispatch(setIsCreating(true));

	fetch(`http://localhost:3005/todos`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json;charset=utf-8' },
		body: JSON.stringify({
			title: editNewValue,
		}),
	})
		.then((rawResponse) => rawResponse.json())
		.then((newTask) => {
			dispatch(setData((prevTask) => [...prevTask, newTask]));
		})
		.catch(console.error)
		.finally(() => {
			dispatch(setIsCreating(false));
			dispatch(setEditNewValue(''));
		});
};
