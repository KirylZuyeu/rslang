import styles from "./audioCall.module.css";
import { useEffect, useState } from "react";
import PlayCall from "./Speaker/PlayCall";
import { addWords } from "../../../functionality/api";

function AudioCall() {
	const [error, setError] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const [words, setItems] = useState([]);
	const [start, setStart] = useState(true);
	const [num, setNum] = useState(0);
	const levels = [0, 1, 2, 3, 4, 5];



	useEffect(() => {
		// document.title = 'играем в Аудио вызов';
		console.log(num);

		const res = addWords(num, 1)
		res.then(res => res.json())
			.then(
				(result) => {
					setIsLoaded(true);
					setItems(result);


				},
				(error) => {
					setIsLoaded(true);
					setError(error);
				}
			)
		console.log('====================================');
		console.log('start', start);
		console.log('level', num);
		console.log('====================================');
	}, [num]);


	if (error) {
		return <div>Ошибка: {error}</div>;
	} else if (!isLoaded) {
		return <div>Загрузка...</div>;
	} else {
	return (
		<div className={styles.call}>
			{start
				?
			<div className={styles.before_game}>
					<h2 className={styles.call_title}>Аудиовызов</h2>
					<h4>Эта игра улучшает восприятие английских слов на слух</h4>
					<div className={styles.btn_levels}>
						{levels.map((el, i) => <button key={i} onClick={() => { setNum(el); setStart(false) }} className={styles.btn_start_call}>Уровень игры{el + 1}</button>)}
					</div>
				</div>
				:
				<div className={styles.play_call}>            
					<PlayCall words={words} /> 					
				<div className={styles.btns_play_call}>
				</div>
		</div>
			}
		</div>


	)
	}
}

export default AudioCall




