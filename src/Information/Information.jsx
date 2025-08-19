import InformationLayout from './InformationLayout';
import PropTypes from 'prop-types';
import { store } from './../store';

export const Information = () => {
	const { getState } = store;
	const { isGameEnded, isDraw } = getState();

	let textContent;

	if (isDraw) {
		textContent = 'Ничья!';
	} else if (isGameEnded) {
		textContent = 'Победил:';
	} else {
		textContent = 'Сейчас ход:';
	}

	return <InformationLayout textContent={textContent} />;
};

Information.propTypes = {
	isDraw: PropTypes.bool.isRequired,
	isGameEnded: PropTypes.bool.isRequired,
	currentPlayer: PropTypes.oneOf(['X', 'O']).isRequired,
};

export default Information;
