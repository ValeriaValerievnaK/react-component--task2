import { useHandleHook } from './hooks/hook';
import styles from './todoList.module.css';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	selectLoading,
	selectUpdating,
	selectEditingId,
	selectEditValue,
	selectIsDeleting,
	selectIsCreating,
	selectEditNewValue,
	selectGetData,
} from './store/selects';
import {
	setEditNewValue,
	setEditValue,
	getDataAsync,
} from './store/action';

const TodoList = () => {
	const dispatch = useDispatch();

	const data = useSelector(selectGetData);
	const isLoading = useSelector(selectLoading);
	const isUpdating = useSelector(selectUpdating);
	const editingId = useSelector(selectEditingId);
	const editValue = useSelector(selectEditValue);
	const isDeleting = useSelector(selectIsDeleting);
	const isCreating = useSelector(selectIsCreating);
	const editNewValue = useSelector(selectEditNewValue);

	const { handleSaveClick, handleEditClick, requestDeleteValue, requestCreateValue } =
		useHandleHook();

	const [filteredTasks, setFilteredTasks] = useState([]);
	const [isAsc, setIsAsc] = useState(true);

	useEffect(() => {
		dispatch(getDataAsync);
	}, []);

	useEffect(() => {
		if (data) {
			setFilteredTasks(data);
		} else {
			setFilteredTasks([]);
		}
	}, [data]);


	const getSearchValue = (value) => {
		if (!data) return;

		const taskArray = Object.entries(data).map(([id, taskObj]) => ({
			id,
			...taskObj,
		}));

		const searchResults = taskArray.filter((taskObj) =>
			taskObj.title.toLowerCase().includes(value.toLowerCase()),
		);

		setFilteredTasks(searchResults);
	};

	const getSortingTasks = () => {
		const sortedTasks = [...filteredTasks].sort((a, b) => {
			const titleA = a.title.toLowerCase();
			const titleB = b.title.toLowerCase();

			if (titleA > titleB) {
				return isAsc ? 1 : -1;
			}
			if (titleA < titleB) {
				return isAsc ? -1 : 1;
			}
			
			return 0;
		});

		setFilteredTasks(sortedTasks);
		setIsAsc(!isAsc);
	};

	return (
		<>
			<h1 className={styles.header}>Список задач</h1>
			<button className={styles.sortButton} onClick={getSortingTasks}>
				Отсортировать
			</button>
			<div className={styles.todos}>
				{isLoading ? (
					<div className={styles.loader}></div>
				) : (
					<table className={styles.todoTable}>
						<thead className={styles.serch}>
							<tr>
								<td colSpan="3">
									<input
										type="text"
										placeholder="Начни вводить, чтобы найти задачу..."
										onChange={(e) => getSearchValue(e.target.value)}
									/>
								</td>
							</tr>
							<tr>
								<th>Задача</th>
								<th colSpan="2">Действия</th>
							</tr>
						</thead>
						<tbody>
							{filteredTasks.map(({ id, title }) => (
								<tr key={id}>
									<td>
										{editingId === id ? (
											<input
												type="text"
												value={editValue ?? title}
												onChange={(e) =>
													dispatch(setEditValue(e.target.value))
												}
											/>
										) : (
											title
										)}
									</td>
									<td>
										{editingId === id ? (
											<button
												className={styles.editButton}
												onClick={() => handleSaveClick(id)}
												disabled={isUpdating}
											>
												Сохранить
											</button>
										) : (
											<button
												className={styles.editButton}
												onClick={() => handleEditClick(id, title)}
											>
												Изменить
											</button>
										)}
									</td>
									<td>
										<button
											className={styles.deleteButton}
											onClick={() => requestDeleteValue(id)}
											disabled={isDeleting}
										>
											Удалить
										</button>
									</td>
								</tr>
							))}
							<tr>
								<td>
									<input
										type="text"
										value={editNewValue}
										onChange={(e) =>
											dispatch(setEditNewValue(e.target.value))
										}
									/>
								</td>
								<td colSpan="2">
									<button
										className={styles.createButton}
										onClick={requestCreateValue}
										disabled={isCreating}
									>
										Добавить задачу
									</button>
								</td>
							</tr>
						</tbody>
					</table>
				)}
			</div>
		</>
	);
};

export default TodoList;
