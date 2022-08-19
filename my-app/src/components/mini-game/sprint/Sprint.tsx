import { useState } from 'react';
import GameSprint from './GameSprint';
import ListLevels from './ListLevels';
import styles from './sprint.module.css';
import base from './base.json';

function Sprint() {
	const [start, setCount] =useState(true);
	
	return (
		<div>
			{
				start
				? <div className={styles.sprint}>
					<div className={styles.info}>
						<p>Спринт - это игра для повторения изученных слов</p>
						<div>Выбери уровень сложности
							<br></br>
						    <ListLevels/>
						</div>
						<div>
							<button className={styles.btnStart} onClick={()=>setCount(!start)}>Начать</button>
						</div>
					</div>
				</div> 
				: <GameSprint base={base}/>
			}
		</div>		
	)
}

export default Sprint
