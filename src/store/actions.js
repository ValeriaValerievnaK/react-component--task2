export const RESTART_GAME = {
	type: 'RESTART_GAME',
};

export const setField = (delta) => ({
	type: 'SET_FIELD',
	payload: delta,
});

export const setIsGameEnded = (delta) => ({
	type: 'SET_IS_GAME_ENDED',
	payload: delta,
});

export const setIsDraw = (delta) => ({
	type: 'SET_IS_DRAW',
	payload: delta,
});

export const setCurrentPlayer = (delta) => ({
	type: 'SET_CURRENT_PLAYER',
	payload: delta,
});

