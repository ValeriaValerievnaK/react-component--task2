import { useState } from 'react';

const initialState = {
	email: '',
	password: '',
	confirmPassword: '',
};

export const useStore = () => {
	const [state, setState] = useState(initialState);

	return {
		getLoginPassword: () => ({ email: state.email, password: state.password }),
		getState: () => state,
		updateState: (fieldName, newValue) => {
			setState({ ...state, [fieldName]: newValue });
		},
		resetState() {
			setState(initialState);
		},
	};
};
