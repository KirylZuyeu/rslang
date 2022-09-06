import { useState } from 'react';
import style from './dictionary.module.css'

export default function Dictionaty() {
	const [group, setGroup] = useState(0);
	const [page, setPage] = useState(0);

	function chengeGroup(num: number) {
		setGroup(num)
		setPage(0)
	}

	return (
		<div className={style.dictionary}>
			<h2 className={style.title}>Словарь</h2>
			<div className={style.level}>
				<h3 className={style.title_litle}>Уровень сложности</h3>
				<div className={style.btn_wrapper}>
					{[1, 2, 3, 4, 5, 6].map(el => <button key={el} className={style.btn}
						onClick={() => chengeGroup(el - 1)}>Уровень {el}</button>)}
				</div>
			</div>
		</div>
	)
}
