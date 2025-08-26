import styles from './informationLayout.module.css';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { selectCurrentPlayer } from './../store/selects';

export const InformationLayout = ({ textContent }) => {
	const currentPlayer = useSelector(selectCurrentPlayer);

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
