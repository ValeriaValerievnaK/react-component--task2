import styles from './formLayout.module.css';

export const FormLayout = ({
	onSubmit,
	email,
	password,
	confirmPassword,
	onLoginChange,
	loginError,
	onPasswordChange,
	passwordError,
	onConfirmPasswordChange,
	confirmPasswordError,
	submitButtonRef,
}) => {
	return (
		<div className={styles.form}>
			<h2 className={styles.formTitle}>Регистрация</h2>
			<form onSubmit={onSubmit}>
				<div className={styles.inputGroup}>
					<label className={styles.inputLabel}>Email</label>
					<input
						className={styles.inputField}
						name="email"
						type="email"
						placeholder="Введите email"
						value={email}
						onChange={onLoginChange}
					/>
					{loginError && (
						<span className={styles.errorMessage}>{loginError}</span>
					)}
				</div>

				<div className={styles.inputGroup}>
					<label className={styles.inputLabel}>Пароль</label>
					<input
						className={styles.inputField}
						name="password"
						type="password"
						placeholder="Введите пароль"
						value={password}
						onChange={onPasswordChange}
					/>
					{passwordError && (
						<span className={styles.errorMessage}>{passwordError}</span>
					)}
				</div>

				<div className={styles.inputGroup}>
					<label className={styles.inputLabel}>Повторите пароль</label>
					<input
						className={styles.inputField}
						name="confirmPassword"
						type="password"
						placeholder="Повторите пароль"
						value={confirmPassword}
						onChange={onConfirmPasswordChange}
						disabled={passwordError}
					/>
					{confirmPasswordError && (
						<span className={styles.errorMessage}>
							{confirmPasswordError}
						</span>
					)}
				</div>

				<button
					type="submit"
					className={styles.submitButton}
					ref={submitButtonRef}
					disabled={loginError || passwordError || confirmPasswordError}
				>
					Зарегистрироваться
				</button>
			</form>
		</div>
	);
};

export default FormLayout;
