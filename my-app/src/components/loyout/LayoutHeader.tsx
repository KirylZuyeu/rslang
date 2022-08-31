import { Outlet } from 'react-router-dom';
import Header from '../header/header';
import styles from '../../App.module.css';

function LayoutHeader() {

	return (
		<div className={styles.app}>
			<Header />
			<Outlet />
		</div>
	)
}

export default LayoutHeader
