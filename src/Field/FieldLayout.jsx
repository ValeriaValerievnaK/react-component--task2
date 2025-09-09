import styles from './fieldLayout.module.css';
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
