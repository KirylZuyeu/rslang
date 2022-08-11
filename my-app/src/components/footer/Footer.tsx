import { Link } from "react-router-dom";
import { Dev } from "../../store";
import "./footer.css";

function Footer(props: Dev) {
	const dev = props.dev;
	return (
		<div className="footer">
			<div className="rss-year">
				<a className="rss" href="https://rs.school/js/"></a>
				<p className="year">2022</p>
			</div>
			<nav>
				{dev.map((el, i) =><Link key={i} className="git-link" to={`/team/${el}`}>{`${el}`}</Link>)}
			</nav>
		</div>
	)
}

export default Footer