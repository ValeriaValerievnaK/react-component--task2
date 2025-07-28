import { useState, useEffect } from 'react';
import { ref, onValue, push, update, remove } from 'firebase/database';
import { db } from '../firebase';

export const useRequestGetTasks = () => {
	const [task, setTasks] = useState({});
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const todosDbRef = ref(db, 'todos');

		return onValue(todosDbRef, (snspshot) => {
			const lodedTotos = snspshot.val() || {};

			setTasks(lodedTotos);
			setIsLoading(false);
		});
	}, []);

	return { task, isLoading };
};

export const useRequestUpdateValue = () => {
	const [isUpdating, setIsUpdating] = useState(false);
	const [editingId, setEditingId] = useState(null);
	const [editValue, setEditValue] = useState('');

	const requestUpdateValue = (value, id) => {
		const todoValueDbRef = ref(db, `todos/${id}`);

		update(todoValueDbRef, {
			title: value,
		}).finally(() => {
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

export const useRequestDeleteValue = () => {
	const [isDeleting, setIsDeleting] = useState(false);

	const requestDeleteValue = (id) => {
		const todoValueDbRef = ref(db, `todos/${id}`);

		remove(todoValueDbRef).finally(() => setIsDeleting(false));
	};

	return { requestDeleteValue, isDeleting };
};

export const useRequestCreateValue = (setIsSorting) => {
	const [isCreating, setIsCreating] = useState(false);
	const [editNewValue, setEditNewValue] = useState('');
	const todosDbRef = ref(db, 'todos');

	const requestCreateValue = () => {
		if (editNewValue && editNewValue.trim().length) {
			push(todosDbRef, {
				title: editNewValue,
			});

			setIsCreating(false);
			setEditNewValue('');
			setIsSorting(false);
		}
	};

	return { requestCreateValue, isCreating, setEditNewValue, editNewValue };
};
