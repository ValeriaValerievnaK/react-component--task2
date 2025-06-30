import InformationLayout from './InformationLayout';
import PropTypes from 'prop-types';

export const Information = ({ isDraw, isGameEnded, currentPlayer }) => {
	let textContent;

	if (isDraw) {
		textContent = 'Ничья!';
	} else if (isGameEnded) {
		textContent = 'Победил:';
	} else {
		textContent = 'Сейчас ход:';
	}
	
	return <InformationLayout textContent={textContent} currentPlayer={currentPlayer} />;
};

Information.propTypes = {
	isDraw: PropTypes.bool.isRequired,
	isGameEnded: PropTypes.bool.isRequired,
	currentPlayer: PropTypes.oneOf(['X', 'O']).isRequired,
};

export default Information;
