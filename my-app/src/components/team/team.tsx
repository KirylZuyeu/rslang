import { Link } from "react-router-dom";
import styles from "./team.module.css";

export default function Team() {
	return (
		<div className={styles.team}>
			<div className={styles.card}>
				<h2 className={styles.title}>Katya</h2>
				<div className={styles.photo_katya}></div>
				<div className={styles.text}>
					тут текст вклада в проект
				</div>
				<Link to={'https://github.com/katusha-2010'} className={styles.link}>Katya GitHub</Link>
			</div>
			<div className={styles.card}>
				<h2 className={styles.title}>Oleg</h2>
				<div className={styles.photo_oleg}></div>
				<div className={styles.text}>
					тут текст вклада в проект
				</div>
				<Link to={'https://github.com/Oleegg'} className={styles.link}>Oleg GitHub</Link>
			</div>
			<div className={styles.card}>
				<h2 className={styles.title}>Kiryl</h2>
				<div className={styles.photo_kiryl}></div>
				<div className={styles.text}>
					тут текст вклада в проект
				</div>
				<Link to={'https://github.com/KirylZuyeu'} className={styles.link}>Kiryl GitHub</Link>
			</div>
		</div>
	)
}
