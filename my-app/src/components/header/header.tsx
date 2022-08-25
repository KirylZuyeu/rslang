import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import CabinetPic from "./CabinetPic";
import styles from "./header.module.css";

type Props = {
	isLogin: boolean
}

export default function Header(props: Props) {
	const [cabinet, setCabinet] = useState({});
	const [isSignIn, setIsSignIn] = useState(false)

	useEffect(() => {
		const c = localStorage.getItem('a')
		if (c) {
			setIsSignIn(true)
			const d = JSON.parse(c)
			setCabinet(d)
			console.log(d);
		} else {
			setCabinet({})
			setIsSignIn(false)
		}
	}, [props.isLogin])

	console.log('ff', cabinet);


	const link = [{ link: 'learn-words', name: 'learn words' }, { link: 'dictionary', name: 'dictionary' },
	{ link: 'statistics', name: 'statistics' }, { link: 'mini-game', name: 'mini-game' }, { link: 'team', name: 'team' },
		{
			link: (Object.keys(cabinet).length !== 0) ? 'cabinet' : 'come-in', name: (Object.keys(cabinet).length !== 0)
				? <CabinetPic /> : 'come in'
		}];
	return (
		<div className={styles.header}>
			<h1 className={styles.header_title}><Link className={styles.title} to="/">RS Lang</Link></h1>
				<div className={styles.nav}>
				{ link.map((el, i) => <NavLink className={styles.nav_link} key={i} to={`/${el.link}`}>{el.name}</NavLink>)}	
				</div>				 			
		</div>
	)
}


