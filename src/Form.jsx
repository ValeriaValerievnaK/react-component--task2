import { useStore } from './hook/useStore';
import FormLayout from './FormLayout';
import { useRef, useState, useEffect } from 'react';

const sendFormData = (formData) => {
	console.log(formData);
};

const conditionForEmail = /^[\w.-]+@[\w-]+\.\w{2,}$/
const conditionForPassword = /^(?=.*[0-9])(?=.*[A-Z])[a-zA-Z0-9]*$/

const Form = () => {
	const [loginError, setLoginError] = useState(null);
	const [passwordError, setPasswordError] = useState(null);
	const [confirmPasswordError, setConfirmPasswordError] = useState(null);

	const { getState, updateState, resetState } = useStore();
	const { email, password, confirmPassword } = getState();

	const submitButtonRef = useRef(null);

	const isFormValid =
		email &&
		password &&
		confirmPassword &&
		!loginError &&
		!passwordError &&
		!confirmPasswordError;

	const onLoginChange = ({ target }) => {
		updateState('email', target.value);

		let newError = null;

		if (target.value === '') {
			newError = 'Это обязательное поле.';
		} else if (!conditionForEmail.test(target.value)) {
			newError = 'Неверный email. Пример: motya@gmail.com';
		} else if (target.value.length > 255) {
			newError = 'Введите корректный email.';
		}

		setLoginError(newError);
	};

	const onPasswordChange = ({ target }) => {
		updateState('password', target.value);

		let newError = null;

		if (target.value === '') {
			newError = 'Это обязательное поле.';
		} else if (!conditionForPassword.test(target.value)) {
			newError = 'Слабый пароль. Используй латиницу, цифры и заглавные буквы.';
		} else if (target.value.length > 255) {
			newError = 'Введите корректныей пароль.';
		} else if (target.value.length < 8) {
			newError = 'Слишком короткий пароль. Введите от 8 символов.';
		}

		setPasswordError(newError);
	};

	const onConfirmPasswordChange = ({ target }) => {
		updateState('confirmPassword', target.value);

		let newError = null;

		if (target.value === '') {
			newError = 'Это обязательное поле.';
		} else if (target.value !== password) {
			newError = 'Введите одинаковые пароли.';
		}

		setConfirmPasswordError(newError);
	};

	const onSubmit = (event) => {
		event.preventDefault();

		if (email && password && confirmPassword) {
			sendFormData({ email, password });
			resetState();
		} else {
			if (!email) {
				setLoginError('Это обязательное поле');
			}
			if (!password) {
				setPasswordError('Это обязательное поле');
			}
			if (!confirmPassword) {
				setConfirmPasswordError('Это обязательное поле');
			}
		}
	};

	useEffect(() => {
		if (isFormValid && submitButtonRef.current) {
			submitButtonRef.current.focus();
		}
	}, [isFormValid]);

	return (
		<FormLayout
			onSubmit={onSubmit}
			email={email}
			password={password}
			confirmPassword={confirmPassword}
			onLoginChange={onLoginChange}
			loginError={loginError}
			onPasswordChange={onPasswordChange}
			passwordError={passwordError}
			onConfirmPasswordChange={onConfirmPasswordChange}
			confirmPasswordError={confirmPasswordError}
			submitButtonRef={submitButtonRef}
		/>
	);
};

export default Form;
