import { Link, NavLink } from "react-router-dom";
import { Links } from "../../store";
import "./header.css";


function Header(props: Links){	
	return (
		<div className="header">
			<h1 className="header-title"><Link className="title" to="/">RS Lang</Link></h1>
				<div className="nav">
				{ props.link.map((el, i) => <NavLink className={"nav-link"} key={i} to={`/${el}`}>{el}</NavLink>)}	
				</div>				 			
		</div>
	)
}

export default Header