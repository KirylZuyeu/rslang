import { useState } from 'react';
import styles from './result.module.css';
import { Word } from './Speaker/PlayCall';

type Prop = {	
	resTrue: number
	arrTrue: number[]
	resFalse: number
	arrFalse: number[]
	words: Word[]
}
export default function ResultCall(props: Prop) {
	const [isDetals, setisDetals] = useState(true);
	return (
		<div className={styles.wrapper}>
			{isDetals 
			? <><div className={styles.result}>{`Верно: ${props.resTrue}, Не верно: ${props.resFalse}`}</div>
			<button className={styles.btn_detals} onClick={()=>setisDetals(false)}>Подробнее</button></>
			: <div className={styles.detals}>
				<ul>
				{props.words.map((el,i) => <li key={el.id} className={
					props.arrTrue.includes(i) ? styles.detals_true : styles.detals_false}>{el.word}</li>
				 )}
				</ul>
			</div>
			}
			
		</div>
	)
}
