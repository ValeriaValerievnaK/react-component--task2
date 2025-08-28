export const initialState = [];

export const dataReducer = (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case 'SET_DATA':
			return payload;
		default:
			return state;
	}
};
