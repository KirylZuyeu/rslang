import { useEffect, useState } from 'react';
import GameSprint, { Base } from './GameSprint';
import ListLevels from './ListLevels';
import styles from './sprint.module.css';
import { getWordsByGroup } from '../../../functionality/api';

function Sprint() {
	const [start, setStart] = useState(true);
	const [arr, setArr] = useState([] as Base[]);
	const [base, setBase] = useState([] as Base[]);
	const [level, setLevel] = useState(0);	

	useEffect (() => {
		setBase([]);
		// const promiseArr = [getWords(level, 0),getWords(level, 1),getWords(level, 2),getWords(level, 3),getWords(level, 4),
		// 	 getWords(level, 5),getWords(level, 6),getWords(level, 7),getWords(level, 8),getWords(level, 9), getWords(level, 10),
		// 	 getWords(level, 11),getWords(level, 12),getWords(level, 13),getWords(level, 14),getWords(level, 15),
		// 	 getWords(level, 16),getWords(level, 17),getWords(level, 18),getWords(level, 19),getWords(level, 20), getWords(level, 21),
		// 	 getWords(level, 22),getWords(level, 23),getWords(level, 24),getWords(level, 25),getWords(level, 26), getWords(level, 27),
		// 	 getWords(level, 28),getWords(level, 29)];
		// Promise.allSettled(promiseArr).then(result => {setArr(result)})			
		// const arrBase = arr.map(el => el.value);
		// setBase(arrBase.flat());
		
		const res = getWordsByGroup(level);
		res.then(result => setArr(result))
		setBase(arr);

	}, [level, start]);

	return (
		<div>
			{
				start
				? <div className={styles.sprint}>
					<div className={styles.info}>
						<p>Спринт - это игра для повторения изученных слов</p>
						<div>Выбери уровень сложности
							<br></br>
						    <ListLevels setLevel={setLevel}/>
						</div>
						<div>
							<button className={styles.btnStart} onClick={()=>setStart(!start)}>Начать</button>
						</div>
					</div>
				</div> 
				: base.length? <GameSprint base={base} start={setStart}/> : <div>Нет слов для тренировки</div>
			}
		</div>		
	)
}

export default Sprint
