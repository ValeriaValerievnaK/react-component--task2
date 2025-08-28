export const initialState = {
	isLoading: false,
	isUpdating: false,
	editingId: null,
	editValue: '',
	isDeleting: false,
	isCreating: false,
	editNewValue: '',
};

export const appReducer = (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case 'SET_IS_LOADING':
			return { ...state, isLoading: payload };
		case 'SET_IS_UPDATING':
			return { ...state, isUpdating: payload };
		case 'SET_EDITING_ID':
			return { ...state, editingId: payload };
		case 'SET_EDIT_VALUE':
			return { ...state, editValue: payload };
		case 'SET_IS_DELITING':
			return { ...state, isDeleting: payload };
		case 'SET_IS_CRATING':
			return { ...state, isCreating: payload };
		case 'SET_EDIT_NEW_VALUE':
			return { ...state, editNewValue: payload };
		default:
			return state;
	}
};
