import "./audioCall.css";
import callGame from "./callGame";

export default function AudioCall() {
	function startCall(){
		console.log('ssss');
		
		return(
			<h3>ggggggggggg</h3>
		)
	}

	return (
		<div className="call">
			<h2 className="call-title">Audio Call</h2>
			<h4>this game improves your speech comprehension</h4>
			<button onClick={startCall} className="start-call">Start Game</button>
		</div>
	)
}
