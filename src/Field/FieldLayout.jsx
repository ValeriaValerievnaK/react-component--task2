import styles from './fieldLayout.module.css';
import PropTypes from 'prop-types';
import { store } from './../store';

export const FieldLayout = ({ handleClickFieds }) => {
	const { getState } = store;
	const { field } = getState();

	return (
		<div className={styles.fieldContainer}>
			{field.map((cell, index) => (
				<div
					key={index}
					className={`${styles.cell} ${cell === 'X' ? styles.cellX : cell === 'O' ? styles.cellO : ''}`}
					onClick={() => handleClickFieds(index)}
				>
					{cell}
				</div>
			))}
		</div>
	);
};

FieldLayout.propTypes = {
	field: PropTypes.arrayOf(PropTypes.string).isRequired,
	handleClickFieds: PropTypes.func.isRequired,
};

export default FieldLayout;
