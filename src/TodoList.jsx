import { useHandleHook } from './hooks/hook';

import styles from './todoList.module.css';
import { useEffect, useState } from 'react';

const TodoList = () => {
	const {
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
	} = useHandleHook();

	const [filteredTasks, setFilteredTasks] = useState(task);

	useEffect(() => {
		if (task) {
			setFilteredTasks(task);
		}
	}, [task]);

	const getSearchValue = (value) => {
		const searchValue = task.filter((taskObj) => {
			return taskObj.title.toLowerCase().includes(value.toLowerCase());
		});
		setFilteredTasks(searchValue);
	};

	const getSortingTasks = () => {
		const sortedTasks = [...task].sort((a, b) => {
			const titleA = a.title.toLowerCase();
			const titleB = b.title.toLowerCase();
			if (titleA > titleB) {
				return 1;
			}
			if (titleA < titleB) {
				return -1;
			}
			return 0;
		});
		setFilteredTasks(sortedTasks);
	};

	return (
		<>
			<h1 className={styles.header}>Список задач</h1>
			<button className={styles.sortButton} onClick={getSortingTasks}>
				Отсортировать от А до Я
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
							{(filteredTasks || []).map(({ id, title }) => (
								<tr key={id}>
									<td>
										{editingId === id ? (
											<input
												type="text"
												value={editValue ?? title}
												onChange={(e) =>
													isLoading(e.target.value)
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
										onChange={(e) => setEditNewValue(e.target.value)}
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
