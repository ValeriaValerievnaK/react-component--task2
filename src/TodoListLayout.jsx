import styles from './todoListLayout.module.css';

const TodoListLayout = ({ isLoading, task}) => {
	return (
		<div className={styles.todos}>
			<h1>Список задач</h1>
			{isLoading ? (
				<div className={styles.loader}></div>
			) : task ? (
				<table className={styles.todoTable}>
					<thead>
						<tr>
							<th>ID</th>
							<th>Задача</th>
							<th>Статус</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>{task.id}</td>
							<td>{task.title}</td>
							<td>{task.completed ? ' Выполнено' : 'Не выполнено'}</td>
						</tr>
					</tbody>
				</table>
			) : (
				<p className={styles.error}>{`Упс... Ошибочка сервера =(`}</p>
			)}
		</div>
	);
};

export default TodoListLayout;
