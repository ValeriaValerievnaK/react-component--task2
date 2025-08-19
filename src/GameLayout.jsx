import styles from './gameLayout.module.css';
import Information from './/Information/Information';
import Field from './/Field/Field';
import PropTypes from 'prop-types';

export const GameLayout = ({
	handleClickGame,
	handleClickFieds,
}) => {

	return (
		<div className={styles.container}>
			<Information
			/>
			<Field handleClickFieds={handleClickFieds} />
			<button className={styles.button} onClick={handleClickGame}>
				Начать заново
			</button>
		</div>
	);
};

GameLayout.propTypes = {
	handleClickGame: PropTypes.func.isRequired,
	handleClickFieds: PropTypes.func.isRequired,
};

export default GameLayout;
