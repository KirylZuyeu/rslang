import { Link } from "react-router-dom";
import "./team.css";

export default function Team() {
	return (
		<div className="team">
			<Link to={'/team/Oleg'}>Oleg</Link>
			<Link to={'/team/Katya'}>Katya</Link>
			<Link to={'/team/Kiryl'}>Kiryl</Link>
		</div>
	)
}
