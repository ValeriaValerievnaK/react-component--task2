import { useHandleHook } from '../hooks/hook';

import styles from './pageTodo.module.css';

import { TitleHeader } from './TitleHeader';
import { Button } from './Button';

import { useNavigate, useParams } from 'react-router-dom';

const PageTodo = () => {
	const navigate = useNavigate();
	const { id } = useParams();

	const {
		task,
		handleSaveClick,
		handleEditClick,
		isUpdating,
		editingId,
		editValue,
		requestDeleteValue,
		isDeleting,
		setEditValue,
	} = useHandleHook();

	const selectedTask = task.find((i) => i.id === parseInt(id));

	if (!selectedTask) return <div>Задача не найдена</div>;

	const { id: selectedId, title: selectedTitle } = selectedTask;

	return (
		<div className={styles.taskContainer}>
			<TitleHeader>Задача № {selectedId}</TitleHeader>
			<Button className={styles.backButton} onClick={() => navigate(`/`)}>
				Назад
			</Button>

			<div className={styles.taskContent}>
				{editingId === selectedId ? (
					<textarea
						type="text"
						value={editValue ?? selectedTitle}
						onChange={(e) => setEditValue(e.target.value)}
						className={styles.inputField}
					/>
				) : (
					<p>{selectedTitle}</p>
				)}
			</div>
			<div className={styles.buttonsContainer}>
				{editingId === selectedId ? (
					<Button
						className={styles.editButton}
						onClick={() => handleSaveClick(selectedId)}
						disabled={isUpdating}
					>
						Сохранить
					</Button>
				) : (
					<Button
						className={styles.editButton}
						onClick={() => handleEditClick(selectedId, selectedTitle)}
					>
						Изменить
					</Button>
				)}
				<Button
					className={styles.deleteButton}
					onClick={() => requestDeleteValue(selectedId)}
					disabled={isDeleting}
				>
					Удалить
				</Button>
			</div>
		</div>
	);
};

export default PageTodo;
