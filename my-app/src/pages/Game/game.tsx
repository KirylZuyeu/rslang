import { Link} from "react-router-dom";
import styles from "./game.module.css";

export default function Game() {
	return (
		<div className={styles.nav_game}>
			<Link className={styles.sprint} to="/mini-game/sprint">SPRINT</Link>
			<Link className={styles.call} to="/mini-game/audio-call">AUDIO CALL</Link>
		</div>				
	)
}
