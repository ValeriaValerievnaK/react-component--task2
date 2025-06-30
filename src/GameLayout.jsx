import styles from './gameLayout.module.css';
import Information from './/Information/Information';
import Field from './/Field/Field';
import PropTypes from 'prop-types';

export const GameLayout = ({
	field,
	setField,
	isDraw,
	setIsDraw,
	isGameEnded,
	setIsGameEnded,
	currentPlayer,
	setCurrentPlayer,
	handleClickGame,
	checkWin,
}) => {
	return (
		<div className={styles.container}>
			<Information
				isDraw={isDraw}
				isGameEnded={isGameEnded}
				currentPlayer={currentPlayer}
			/>
			<Field
				field={field}
				setField={setField}
				currentPlayer={currentPlayer}
				setCurrentPlayer={setCurrentPlayer}
				isGameEnded={isGameEnded}
				setIsGameEnded={setIsGameEnded}
				setIsDraw={setIsDraw}
				checkWin={checkWin}
			/>
			<button className={styles.button} onClick={handleClickGame}>
				Начать заново
			</button>
		</div>
	);
};

GameLayout.propTypes = {
	field: PropTypes.arrayOf(PropTypes.string).isRequired,
	setField: PropTypes.func.isRequired,
	isDraw: PropTypes.bool.isRequired,
	setIsDraw: PropTypes.func.isRequired,
	isGameEnded: PropTypes.bool.isRequired,
	setIsGameEnded: PropTypes.func.isRequired,
	currentPlayer: PropTypes.oneOf(['X', 'O']).isRequired,
	setCurrentPlayer: PropTypes.func.isRequired,
	handleClickGame: PropTypes.func.isRequired,
	checkWin: PropTypes.func.isRequired,
};

export default GameLayout;
