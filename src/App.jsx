import styles from './app.module.css';
import { useState } from 'react';

export const App = () => {
	const actionButton = [
		{
			id: '001',
			title: '+',
			onClick() {
				setOperator('+');
				setIsOperatorEntered(true);
				if (result) {
					setOperand1(result);
					setResult('');
				}
			},
		},
		{
			id: '002',
			title: '-',
			onClick() {
				setOperator('-');
				setIsOperatorEntered(true);
				if (result) {
					setOperand1(result);
					setResult('');
				}
			},
		},
		{
			id: '003',
			title: '=',
			onClick() {
				let result;
				if (!operand1 || !operand2) return;
				switch (operator) {
					case '+':
						result = Number(operand1) + Number(operand2);
						break;
					case '-':
						result = Number(operand1) - Number(operand2);
						break;
				}
				setResult(String(result));
				clearAll();
			},
		},
		{
			id: '004',
			title: 'C',
			onClick() {
				clearAll();
				setResult('');
			},
		},
	];
	const NUMS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

	const clearAll = () => {
		setOperand1('');
		setOperator('');
		setOperand2('');
		setIsOperatorEntered(false);
	};

	const [operand1, setOperand1] = useState('');
	const [operator, setOperator] = useState('');
	const [operand2, setOperand2] = useState('');
	const [result, setResult] = useState('');
	const [isOperatorEntered, setIsOperatorEntered] = useState(false);

	const onClickForNumber = (item) => {
		setResult('');
		if (!isOperatorEntered) {
			setOperand1(`${operand1}${item}`);
		} else {
			setOperand2(`${operand2}${item}`);
		}
	};

	return (
		<>
			<div className={styles.container}>
				<h1>Калькулятор</h1>
				<div className={styles.perent}>
					<div className={styles['display-screen']}>
						{result ? result : operand1 + operator + operand2}
					</div>
					<ul className={styles['action-button']}>
						{actionButton.map((item) => (
							<li key={item.id} className={styles['action-item']}>
								<button
									className={styles['action-item-button']}
									onClick={item.onClick}
								>
									{item.title}
								</button>
							</li>
						))}
					</ul>
					<ul className={styles['action-button']}>
						{NUMS.map((item) => (
							<li key={item} className={styles['action-item']}>
								<button
									className={styles['action-item-button']}
									onClick={() => onClickForNumber(item)}
								>
									{item}
								</button>
							</li>
						))}
					</ul>
				</div>
			</div>
		</>
	);
};
