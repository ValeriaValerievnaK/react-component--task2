import InformationLayout from './InformationLayout';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { selectIsGameEnded, selectIsDraw } from './../store/selects';

export const Information = () => {
	const isGameEnded = useSelector(selectIsGameEnded);
	const isDraw = useSelector(selectIsDraw);

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
