import InformationLayout from './InformationLayout';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Component } from 'react';

class Information extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { isDraw, isGameEnded } = this.props;

		const textContent = isDraw ? 'Ничья!' : isGameEnded ? 'Победил' : 'Сейчас ход:';
		return <InformationLayout textContent={textContent} />;
	}
}

const mapStateToProps = (state) => ({
	isDraw: state.isDraw,
	isGameEnded: state.isGameEnded,
});

Information.propTypes = {
	isDraw: PropTypes.bool.isRequired,
	isGameEnded: PropTypes.bool.isRequired,
	currentPlayer: PropTypes.oneOf(['X', 'O']).isRequired,
};

export default connect(mapStateToProps)(Information);
