import { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Context, ContextUser } from "../../Context";
import CabinetPic from "./CabinetPic";
import styles from "./header.module.css";


export default function Header() {
	const appContext = useContext(Context);
	const userContext = useContext(ContextUser);

	const link = [{ link: 'learn-words', name: 'learn words' }, { link: 'dictionary', name: 'dictionary' },
	{ link: 'statistics', name: 'statistics' }, { link: 'mini-game', name: 'mini-game' }, { link: 'team', name: 'team' },
		{
			link: appContext?.isAvtorization ? 'cabinet' : 'come-in', name: appContext?.isAvtorization
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


