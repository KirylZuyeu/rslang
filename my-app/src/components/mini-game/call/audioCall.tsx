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
		setWords([]);		
		const rand = Math.floor(Math.random() * 30) + 1;
		const res = getWords(num, rand);
		res.then(
			(result) => {				
				console.log(result);

				setIsLoaded(true);
				setWords(result);
			},
			(error) => {
				setError(error);
			}
		)
	}, [num, start]);



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
				: error ? <div>Ошибка: {error}</div> : !isLoaded || !words.length ? <div className={styles.call}>Загрузка...</div>
					: <PlayCall words={words} fu={setStart} resetWords={setWords} />				
			}
		</div>
	)
}

export default AudioCall
