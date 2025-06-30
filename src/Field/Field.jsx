import FieldLayout from './FieldLayout';

export const Field = ({
	field,
	setField,
	currentPlayer,
	setCurrentPlayer,
	isGameEnded,
	setIsGameEnded,
	setIsDraw,
	checkWin,
}) => {
	const handleClickFieds = (index) => {
		if (field[index] === '' && !isGameEnded) {
			const newFields = field.slice();
			newFields[index] = currentPlayer;

			setField(newFields);

			if (checkWin(newFields, currentPlayer)) {
				setIsGameEnded(true);
			} else if (!newFields.includes('') && !isGameEnded) {
				setIsDraw(true);
			} else {
				setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
			}
		}
	};

	return <FieldLayout field={field} handleClickFieds={handleClickFieds} />;
};

export default Field;
