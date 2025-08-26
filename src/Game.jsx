import GameLayout from './GameLayout';
import { WIN_PATTERNS } from './/constants';
import { useSelector, useDispatch } from 'react-redux';
import { selectField, selectCurrentPlayer, selectIsGameEnded } from './store/selects';
import {
	RESTART_GAME,
	setField,
	setIsGameEnded,
	setIsDraw,
	setCurrentPlayer,
} from './store/actions';

const Game = () => {
	const dispatch = useDispatch();

	const field = useSelector(selectField);
	const currentPlayer = useSelector(selectCurrentPlayer);
	const isGameEnded = useSelector(selectIsGameEnded);


	const handleClickGame = () => {
		dispatch(RESTART_GAME);
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

			dispatch(setField(newFields));

			if (checkWin(newFields, currentPlayer)) {
				dispatch(setIsGameEnded(true));
			} else if (!newFields.includes('') && !isGameEnded) {
				dispatch(setIsDraw(true));
			} else {
				dispatch(setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X'));
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
