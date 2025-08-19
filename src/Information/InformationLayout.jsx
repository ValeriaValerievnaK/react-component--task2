import styles from './informationLayout.module.css';
import PropTypes from 'prop-types';
import { store } from './../store';

export const InformationLayout = ({ textContent}) => {
	const { getState } = store;
	const { currentPlayer } = getState();

	return (
		<div className={styles.infoContainer}>
			<h1 className={styles.title}>{textContent}</h1>
			{!textContent.includes('Ничья') && (
				<div className={styles.playerTurn}>{currentPlayer}</div>
			)}
		</div>
	);
};

InformationLayout.propTypes = {
	textContent: PropTypes.string.isRequired,
	currentPlayer: PropTypes.oneOf(['X', 'O']).isRequired,
};

export default InformationLayout;
