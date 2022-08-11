import { Link } from "react-router-dom";
import "./footer.css";

function Footer() {
	const develops = [{name: 'Oleg', link: 'https://github.com/Oleegg'}, {name:'Katya',link: 'https://github.com/katusha-2010'}, {name: 'Kiryl', link: 'https://github.com/KirylZuyeu'}];
	return (
		<div className="footer">
			<div className="rss-year">
				<a className="rss" href="https://rs.school/js/"></a>
				<p className="year">2022</p>
			</div>
			<nav>
				{develops.map((el, i) =><Link key={i} className="git-link" to={`${el.link}`}>{`${el.name}`}</Link>)}
			</nav>
		</div>
	)
}

export default Footer
