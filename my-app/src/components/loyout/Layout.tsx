import { Outlet} from 'react-router-dom';
import Footer from '../footer/Footer';
import Header from '../header/header';
import styles from '../../App.module.css';

function Layout() {	
    return (   
        <div className={styles.app}>
				<Header />            
            <Outlet/>
            <Footer/>
        </div>    
    )
}

export default Layout
