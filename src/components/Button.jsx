export const Button = ({ className, onClick, disabled = false, children }) => {
	return (
		<button className={className} onClick={onClick} disabled={disabled}>
			{children}
		</button>
	);
};
