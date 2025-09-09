import GameLayout from './GameLayout';
import { WIN_PATTERNS } from './/constants';
import {
	RESTART_GAME,
	setField,
	setIsGameEnded,
	setIsDraw,
	setCurrentPlayer,
} from './store/actions';
import { connect } from 'react-redux';
import { Component } from 'react';

class Game extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { dispatch, field, currentPlayer, isGameEnded } = this.props;

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
	}
}

const mapStateToProps = (state) => ({
	field: state.field,
	currentPlayer: state.currentPlayer,
	isGameEnded: state.isGameEnded,
});

export default connect(mapStateToProps)(Game);
