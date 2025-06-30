import { useState } from 'react';
import GameLayout from './GameLayout';

const WIN_PATTERNS = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6],
];

const INITIAL_FIELD_STATE = ['', '', '', '', '', '', '', '', ''];

const Game = () => {
	const [currentPlayer, setCurrentPlayer] = useState('X');
	const [isGameEnded, setIsGameEnded] = useState(false);
	const [isDraw, setIsDraw] = useState(false);
	const [field, setField] = useState(INITIAL_FIELD_STATE);

	const handleClickGame = () => {
		setField(INITIAL_FIELD_STATE);
		setIsDraw(false);
		setIsGameEnded(false);
		setCurrentPlayer('X');
	};

	const checkWin = (field, currentPlayer) => {
		return WIN_PATTERNS.some((pattern) =>
			pattern.every((idx) => field[idx] === currentPlayer),
		);
	};

	return (
		<GameLayout
			field={field}
			setField={setField}
			isDraw={isDraw}
			setIsDraw={setIsDraw}
			isGameEnded={isGameEnded}
			setIsGameEnded={setIsGameEnded}
			currentPlayer={currentPlayer}
			setCurrentPlayer={setCurrentPlayer}
			handleClickGame={handleClickGame}
			checkWin={checkWin}
		/>
	);
};

export default Game;
