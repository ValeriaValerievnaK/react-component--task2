import FieldLayout from './FieldLayout';
import { Component } from 'react';

export default class Field extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { handleClickFieds } = this.props;

		return <FieldLayout handleClickFieds={handleClickFieds} />;
	}
}
