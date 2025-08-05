import { useHandleHook } from '../hooks/hook';

import styles from './todoList.module.css';
import { useEffect, useState } from 'react';

import { TitleHeader } from './TitleHeader';
import { Button } from './Button';

import { useNavigate } from 'react-router-dom';

const TodoList = () => {
	const navigate = useNavigate();

	const {
		task,
		isLoading,
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
			<TitleHeader>Список задач</TitleHeader>
			<Button className={styles.sortButton} onClick={getSortingTasks}>
				Отсортировать от А до Я
			</Button>
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
						</thead>
						<tbody>
							{filteredTasks.map(({ id, title }) => (
								<tr key={id}>
									<td
										onClick={() => navigate(`/task/${id}`)}
										colSpan="3"
									>
										{title}
									</td>
								</tr>
							))}
							<tr>
								<td>
									<input
										type="text"
										value={editNewValue}
										onChange={(e) => setEditNewValue(e.target.value)}
										placeholder="Введите новую задачу..."
									/>
								</td>
								<td>
									<Button
										className={styles.createButton}
										onClick={requestCreateValue}
										disabled={isCreating}
									>
										Добавить
									</Button>
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
