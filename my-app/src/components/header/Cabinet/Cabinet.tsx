import { useEffect, useState } from "react";
import { RespSign } from "../../../functionality/api";
import styles from "./cabinet.module.css";

export default function Cabinet() {
	const [data, setData] = useState({} as RespSign)
	useEffect(() => {
		const c = localStorage.getItem('aaa')
		if (c) {
			const d = JSON.parse(c)
			setData(d)
			console.log(d);
		}
	}, [])



	console.log(data);


	return (
		<div className={styles.cabinet}>
			<div className={styles.cabinet_wrapp}>
				<div>Name: {data.name}</div>
				<div>Id: {data.userId}</div>
			</div>
		</div>
	)
}
