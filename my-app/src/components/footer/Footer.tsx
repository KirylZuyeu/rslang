import { Link } from "react-router-dom";
import styles from "./footer.module.css";

function Footer() {
	const develops = [{name: 'Oleg', link: 'https://github.com/Oleegg'}, {name:'Katya',link: 'https://github.com/katusha-2010'}, {name: 'Kiryl', link: 'https://github.com/KirylZuyeu'}];
	return (
		<div className={styles.footer}>
			<div className={styles.rss_year}>
				<a className={styles.rss} href="https://rs.school/js/"></a>
				<p className={styles.year}>2022</p>
			</div>
			<nav>
				{develops.map((el, i) =><a key={i} className={styles.git_link} href={`${el.link}`}>{`${el.name}`}</a>)}
			</nav>
		</div>
	)
}

export default Footer
