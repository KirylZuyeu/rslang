import styles from "./audioCall.module.css";
import { useEffect, useState } from "react";
import { words } from "../../../words";
import Speaker from "./Speaker/Speaker";

function AudioCall() {
	const levels = [1,2,3,4,5,6];
	console.log(words);
	console.log(words.length);
	
	const [start, setCount] = useState(true);
  useEffect(()=>{	document.title = start ? `React app` : 'играем в Аудио вызов'},[]);
	console.log(new Date().getMilliseconds())
	return (
		<div className={styles.call}>
			{start 
			? 
			<div className={styles.before_game}>
			<h2 className={styles.call_title}>Аудиовызов</h2>
			<h4>Эта игра улучшает восприятие английских слов на слух</h4>
			<div className={styles.btn_levels}>
        {levels.map((el, i) => <button key={i} onClick={()=>setCount(!start)} className={styles.btn_start_call}>Уровень игры{el}</button>)}
			</div>
		</div>			
		: 
		<div className={styles.play_call}>			
			
					<Speaker words = {words}/>
					
				<div className={styles.btns_play_call}>
				</div>
		</div>
		  }			
		</div>
	)
}

export default  AudioCall
