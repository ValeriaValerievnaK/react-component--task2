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
			<div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#f5f7fa] to-[#c3cfe2] p-5 select-none">
				<Information />
				<Field handleClickFieds={handleClickFieds} />
				<button
					className="mt-[30px] px-[25px] py-3 text-base font-bold text-white
                   bg-gradient-to-r from-[#ff758c] to-[#ff7eb3]
                   border-none rounded-full cursor-pointer
                   shadow-[0_4px_15px_rgba(255,117,140,0.4)]
                   transition-all duration-300 ease-in-out
                   hover:translate-y-[-2px] hover:shadow-[0_6px_20px_rgba(255,117,140,0.6)]"
					onClick={handleClickGame}
				>
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
