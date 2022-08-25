import { Outlet} from 'react-router-dom';
import Footer from '../footer/Footer';
import Header from '../header/header';
import styles from '../../App.module.css';

type Props = {
	isLogin: boolean
}

function Layout(props: Props) {	
    return (   
        <div className={styles.app}>
				<Header isLogin={props.isLogin} />            
            <Outlet/>
            <Footer/>
        </div>    
    )
}

export default Layout
