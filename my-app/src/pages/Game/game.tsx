import { Link} from "react-router-dom";
import styles from "./game.module.css";

export default function Game() {
	return (
		<div className={styles.nav_game}>
			<Link className={styles.title} to="/mini-game/sprint">Sprinnnnt</Link>
			<Link className={styles.title} to="/mini-game/audio-call">Calll</Link>
		</div>
					
				
	)
}
