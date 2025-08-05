import styles from './titleHeader.module.css';

export const TitleHeader = ({ children }) => {
	return <h1 className={styles.header}>{children}</h1>;
};
