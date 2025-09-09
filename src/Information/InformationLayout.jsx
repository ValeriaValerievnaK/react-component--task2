import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Component } from 'react';

class InformationLayout extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { textContent, currentPlayer } = this.props;

		return (
			<div className="text-center mb-3">
				<h1 className="text-3xl font-bold text-gray-600 mb-2.5 uppercase tracking-wide">
					{textContent}
				</h1>
				{!textContent.includes('Ничья') && (
					<div className="text-3xl font-bold bg-gradient-to-r from-[#e7404e] to-[#e24285] bg-clip-text text-transparent my-2.5">
						{currentPlayer}
					</div>
				)}
			</div>
		);
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
