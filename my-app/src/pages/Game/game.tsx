import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import "./game.css";

export default function Game() {
	return (
		<div className="nav-game">
			<Link className="title" to="/mini-game/sprint">Sprinnnnt</Link>
			<Link className="title" to="/mini-game/audio-call">Calll</Link>
		</div>
					
				
	)
}