import { useSelector, useDispatch } from 'react-redux';
import { selectEditValue, selectEditNewValue } from './../store/selects';
import {
	setEditingId,
	setEditValue,
	deleteDataAsync,
	updateDataAsync,
	requestDataAsync,
} from './../store/action';

export const useHandleHook = () => {
	const dispatch = useDispatch();

	const editValue = useSelector(selectEditValue);
	const editNewValue = useSelector(selectEditNewValue);

	// Обновить значение  и обработчики для них (выбор и сохранить)
	const requestUpdateValue = (value, id) => {
		dispatch(updateDataAsync(value, id));
	};

	const handleSaveClick = (id) => {
		requestUpdateValue(editValue, id);
		dispatch(setEditingId(null));
	};

	const handleEditClick = (id, currentTitle) => {
		dispatch(setEditingId(id));
		dispatch(setEditValue(currentTitle.trim()));
	};

	// Удалить значение
	const requestDeleteValue = (id) => {
		dispatch(deleteDataAsync(id));
	};

	// Создать значение
	const requestCreateValue = () => {
		if (editNewValue && editNewValue.trim().length) {
			dispatch(requestDataAsync(editNewValue));
		}
	};

	return {
		handleSaveClick,
		handleEditClick,
		requestDeleteValue,
		requestCreateValue,
	};
};
