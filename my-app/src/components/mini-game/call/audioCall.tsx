import styles from "./audioCall.module.css";
import { useState } from "react";

function AudioCall() {
	const [start, setCount] =useState(true)
	console.log(start);
	
	return (
		<div className={styles.call}>
			{start ? 
			<div className={styles.before_game}>
			<h2 className={styles.call_title}>Audio Call</h2>
			<h4>this game improves your speech comprehension</h4>
			<button onClick={()=>setCount(!start)} className={styles.btn_start_call}>Start Game</button></div>
			: 
			<div className={styles.start_call}>
					start Game Audio call
			</div>
		}			
		</div>
	)
}

export default  AudioCall
