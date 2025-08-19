import GameLayout from './GameLayout';
import { WIN_PATTERNS } from './/constants';
import { store } from './store';
import { useState, useEffect } from 'react';

const Game = () => {
	const [gameState, setGameState] = useState(store.getState());

	const { dispatch } = store;
	const { currentPlayer, field, isGameEnded } = gameState;


	useEffect(() => {
		const unsubscribe = store.subscribe(() => {
			setGameState(store.getState());
		});

		return unsubscribe;
	}, []);

	const handleClickGame = () => {
		dispatch({ type: 'RESTART_GAME' });
	};

	const checkWin = (field, currentPlayer) => {
		return WIN_PATTERNS.some((pattern) =>
			pattern.every((idx) => field[idx] === currentPlayer),
		);
	};

	const handleClickFieds = (index) => {
		if (field[index] === '' && !isGameEnded) {
			const newFields = field.slice();
			newFields[index] = currentPlayer;

			dispatch({ type: 'SET_FIELD', payload: newFields });

			if (checkWin(newFields, currentPlayer)) {
				dispatch({ type: 'SET_IS_GAME_ENDED', payload: true });
			} else if (!newFields.includes('') && !isGameEnded) {
				dispatch({ type: 'SET_IS_DRAW', payload: true });
			} else {
				dispatch({
					type: 'SET_CURRENT_PLAYER',
					payload: currentPlayer === 'X' ? 'O' : 'X',
				});
			}
		}
	};

	return (
		<GameLayout
			handleClickGame={handleClickGame}
			handleClickFieds={handleClickFieds}
		/>
	);
};

export default Game;
