import styles from "./audioCall.module.css";
import { useEffect, useState } from "react";
import PlayCall from "./Speaker/PlayCall";
import { getWords } from "../../../functionality/api";

function AudioCall() {
	const [error, setError] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const [words, setWords] = useState([]);
	const [start, setStart] = useState(true);
	const [num, setNum] = useState(-1);
	const levels = [0, 1, 2, 3, 4, 5];



	useEffect(() => {
		// document.title = 'играем в Аудио вызов';
		const res = getWords(num, 1)
		res.then(res => res.json())
			.then(
				(result) => {
					let res
					if (result.length > 10) {
						res = result.slice(0, 10);
					} else {
						res = result;
					}

					setIsLoaded(true);
					setWords(res);
				},
				(error) => {
					setIsLoaded(true);
					setError(error);
				}
		)
	}, [num]);

	useEffect(() => {
		console.log(start);
		console.log('===============ttttt==');
	}, [start])
	if (error) {
		return <div>Ошибка: {error}</div>;
	}
	if (!isLoaded) {
		return <div className={styles.call}>Загрузка...</div>;
	} 
	return (
		<div className={styles.call}>
			{start
				?
			<div className={styles.before_game}>
					<h2 className={styles.call_title}>Аудиовызов</h2>
					<h4 className={styles.call_title}>Эта игра улучшает восприятие английских слов на слух</h4>
					<div className={styles.btn_levels}>
						{levels.map((el, i) => <button key={i} onClick={() => { setNum(el); setStart(false) }} className={styles.btn_start_call}>Уровень игры{el + 1}</button>)}
					</div>
				</div>
				:				            
				<PlayCall words={words} fu={setStart} />				
			}

		</div>
	)
}

export default AudioCall




