import styles from './gameLayout.module.css';
import Information from './/Information/Information';
import Field from './/Field/Field';
import PropTypes from 'prop-types';
import { Component } from 'react';

export default class GameLayout extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { handleClickGame, handleClickFieds } = this.props;

		return (
			<div className={styles.container}>
				<Information />
				<Field handleClickFieds={handleClickFieds} />
				<button className={styles.button} onClick={handleClickGame}>
					Начать заново
				</button>
			</div>
		);
	}
}

GameLayout.propTypes = {
	handleClickGame: PropTypes.func.isRequired,
	handleClickFieds: PropTypes.func.isRequired,
};
