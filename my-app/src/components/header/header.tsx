import { Link, NavLink } from "react-router-dom";
import styles from "./header.module.css";


function Header(){	
	const link = [{link:'learn-words', name:'learn words'}, {link:'dictionary', name:'dictionary'},{link:'statistics', name:'statistics'} , {link:'mini-game', name: 'mini-game'}, {link:'team', name: 'team'}, {link: 'come-in', name: 'come in'}];
	return (
		<div className={styles.header}>
			<h1 className={styles.header_title}><Link className={styles.title} to="/">RS Lang</Link></h1>
				<div className={styles.nav}>
				{ link.map((el, i) => <NavLink className={styles.nav_link} key={i} to={`/${el.link}`}>{el.name}</NavLink>)}	
				</div>				 			
		</div>
	)
}

export default Header
