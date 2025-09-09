import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Component } from 'react';

class FieldLayout extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { field, handleClickFieds } = this.props;

		return (
			<div className="grid grid-cols-3 grid-rows-3 gap-2.5 my-[30px]">
				{field.map((cell, index) => (
					<div
						key={index}
						className={`
							flex items-center justify-center
							bg-white rounded-2xl shadow-md
							text-5xl font-bold cursor-pointer
							transition-all duration-300 ease-in-out
							hover:scale-105 hover:shadow-lg
							${cell === 'X' ? 'text-[#ff758c]' : cell === 'O' ? 'text-[#7fdbff]' : ''}
						`}
						onClick={() => handleClickFieds(index)}
						style={{ width: '100px', height: '100px' }}
					>
						{cell}
					</div>
				))}
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	field: state.field,
});

FieldLayout.propTypes = {
	field: PropTypes.arrayOf(PropTypes.string).isRequired,
	handleClickFieds: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(FieldLayout);
