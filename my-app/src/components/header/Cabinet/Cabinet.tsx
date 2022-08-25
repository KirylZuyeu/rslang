import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { getUserStatistic, getUser, RespSign, changeUserStatistic } from "../../../functionality/api";
import styles from "./cabinet.module.css";

type Props = {
	isLogin: boolean
	fu: Dispatch<SetStateAction<boolean>>
}

export default function Cabinet(props: Props) {
	const [data, setData] = useState({} as RespSign)
	const [setting, setSetting] = useState({})
	const [render, setRender] = useState(false)
	console.log("isLogin", props.isLogin);
	console.log("date", data);

	const a = 'hello a'.repeat(3)
	console.log(a);

	const option = {
		learnedWords: 0,
		sprint: {
			arrFalse: [],
			arrRight: [],
			period: 0
		},
		audioCall: {
			arrFalse: [],
			arrRight: [],
			period: 0
		},
		book: { arrWords: [] }
	}

	useEffect(() => {
		const c = localStorage.getItem('a')
		if (c) {
			setRender(true)
			const d = JSON.parse(c)
			setData(d)
			console.log(d);
		}
	}, [props.isLogin])

	function exit() {
		localStorage.removeItem('a')
		setData({} as RespSign)
		props.fu(false)
	}

	function user() {
		console.log('tokenn', data.token);

		const sett = getUser(data.userId, data.token)
			.then(res => console.log('res', res))
		// .catch(err => console.log(err))
		console.log(sett);

	}

	function statistic() {
		console.log('tokenn', data.token);

		const sett = getUserStatistic(data.userId, data.token)
			.then(res => console.log('stat', res))
		// .catch(err => console.log(err))
		console.log(sett);

	}

	function changeStatistic() {
		console.log('tokenn', data.token);

		const sett = changeUserStatistic(data.userId, data.token, option)
			.then(res => console.log('stat', res))
		// .catch(err => console.log(err))
		console.log(sett);

	}

	console.log(data);
	console.log(setting);
	return (
		<div className={styles.cabinet}>
			<div className={styles.cabinet_wrapp}>
				<div>Name: {data ? data.name : 'войдите'}</div>
				<div>Id: {data ? data.userId : 'войдите'}</div>
				{data.userId ? <>
					<button className={styles.btn_exit} onClick={exit}>Exit</button>
					<button className={styles.btn_setting} onClick={user}>user</button>
					<button className={styles.btn_setting} onClick={statistic}>Statistic</button>
					<button className={styles.btn_setting} onClick={changeStatistic}>changeStatistic</button>
				</> : null}
			</div>
		</div>
	)
}
