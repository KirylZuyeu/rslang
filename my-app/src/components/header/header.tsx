import { Link, NavLink } from "react-router-dom";
import "./header.css";


function Header(){	
	const link = [{link:'learn-words', name:'learn words'}, {link:'dictionary', name:'dictionary'},{link:'statistics', name:'statistics'} , {link:'mini-game', name: 'mini-game'}, {link:'team', name: 'team'}, {link: 'come-in', name: 'come in'}];
	return (
		<div className="header">
			<h1 className="header-title"><Link className="title" to="/">RS Lang</Link></h1>
				<div className="nav">
				{ link.map((el, i) => <NavLink className={"nav-link"} key={i} to={`/${el.link}`}>{el.name}</NavLink>)}	
				</div>				 			
		</div>
	)
}

export default Header
