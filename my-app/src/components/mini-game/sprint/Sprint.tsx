import { useEffect, useState } from 'react';
import GameSprint, { Base } from './GameSprint';
import ListLevels from './ListLevels';
import styles from './sprint.module.css';
import { getWordsByGroup } from '../../../functionality/api';
import base1 from './base1.json'

function Sprint() {
	const [start, setStart] = useState(true);
	const [arr, setArr] = useState([] as Base[]);
	const [base, setBase] = useState([] as Base[]);
	const [level, setLevel] = useState(0);	

	useEffect (() => {		
		setBase([]);		
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
				: base.length? <GameSprint base={base1} start={setStart} level={setLevel}/> : <div>Нет слов для тренировки</div>
			}
		</div>		
	)
}

export default Sprint
