import { Link } from "react-router-dom";
import styles from "./team.module.css";

export default function Team() {
	return (
		<div className={styles.team}>
			<Link to={'/team/Oleg'}>Oleg</Link>
			<Link to={'/team/Katya'}>Katya</Link>
			<Link to={'/team/Kiryl'}>Kiryl</Link>
		</div>
	)
}
