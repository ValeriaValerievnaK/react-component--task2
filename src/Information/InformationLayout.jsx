import styles from './informationLayout.module.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Component } from 'react';

class InformationLayout extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { textContent, currentPlayer } = this.props;

		return <div className={styles.infoContainer}>
			<h1 className={styles.title}>{textContent}</h1>
			{!textContent.includes('Ничья') && (
				<div className={styles.playerTurn}>{currentPlayer}</div>
			)}
		</div>;
	}
}

const mapStateToProps = (state) => ({
	currentPlayer: state.currentPlayer,
});


InformationLayout.propTypes = {
	textContent: PropTypes.string.isRequired,
	currentPlayer: PropTypes.oneOf(['X', 'O']).isRequired,
};

export default connect(mapStateToProps)(InformationLayout);
