import FormLayout from './FormLayout';
import { useRef, useEffect } from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const sendFormData = (formData) => {
	const { email, password } = formData;
	console.log({ email, password });
};

const conditionForEmail = /^[\w.-]+@[\w-]+\.\w{2,}$/;
const conditionForPassword = /^(?=.*[0-9])(?=.*[A-Z])[a-zA-Z0-9]*$/;

const fieldsSchema = yup.object().shape({
	email: yup
		.string()
		.required('Это обязательное поле.')
		.matches(conditionForEmail, 'Неверный email. Пример: motya@gmail.com')
		.max(255, 'Введите корректный email.'),
	password: yup
		.string()
		.required('Это обязательное поле.')
		.matches(
			conditionForPassword,
			'Слабый пароль. Используй латиницу, цифры и заглавные буквы.',
		)
		.max(255, 'Введите корректный пароль.')
		.min(8, 'Слишком короткий пароль. Введите от 8 символов.'),
	confirmPassword: yup
		.string()
		.required('Это обязательное поле.')
		.oneOf([yup.ref('password')], 'Пароли должны совпадать.'),
});

const Form = () => {
	const {
		register,
		handleSubmit,
		formState: { errors, isValid, isDirty },
	} = useForm({
		defaultValues: {
			email: '',
			password: '',
			confirmPassword: '',
		},
		resolver: yupResolver(fieldsSchema),
		mode: 'onChange',
	});

	const submitButtonRef = useRef(null);

	const isFormValid = isValid && isDirty;

	const loginError = errors.email?.message;
	const passwordError = errors.password?.message;
	const confirmPasswordError = errors.confirmPassword?.message;

	useEffect(() => {
		if (isFormValid && submitButtonRef.current) {
			submitButtonRef.current.focus();
		}
	}, [isFormValid]);

	return (
		<FormLayout
			sendFormData={sendFormData}
			handleSubmit={handleSubmit}
			loginError={loginError}
			passwordError={passwordError}
			confirmPasswordError={confirmPasswordError}
			register={register}
			submitButtonRef={submitButtonRef}
		/>
	);
};

export default Form;
