import { number } from "prop-types";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../../Context";
import { changeUserStatistic, checkToken, getNewUserToken, getUser, getUserStatistic } from "../../../functionality/api";
import styles from "./cabinet.module.css";

export const objStatisticZero = {
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
	book: { arrWords: [] },
	learnedWordsId: { arrLearnedWords: [] },
	date: ' ',
	longTimeStatistic: { longTimeStatistic: [] }
}

export default function Cabinet() {
	const [userData, setUserData] = useState(null as any)
	const appContext = useContext(Context);
	const navigate = useNavigate();

	function exit() {
		appContext?.setIsAvtorization(false);
		localStorage.removeItem('a');
		navigate('/');
	}

	function user() {
		console.log(2, checkToken());
		getUser(userData.userId, userData.token).then(res => console.log(res));
	}

	function statistic() {
		getUserStatistic(userData.userId, userData.token).then(res => console.log(res))
	}

	function changeStatistic() {
		changeUserStatistic(userData.userId, userData.token, 0, objStatisticZero)
	}

	function refreshToken() {
		const t = getNewUserToken(userData.userId, userData.refreshToken)
		t.then(res => console.log(res))
	}

	useEffect(() => {
		console.log(111111111);
		const a = localStorage.getItem('a')
		setUserData(a ? JSON.parse(a) : 'aa')
	}, [appContext?.isAvtorization])

	return (
		<div className={styles.cabinet}>
			<div key={JSON.stringify(userData)} className={styles.cabinet_wrapp}>
				<div>Name: {userData ? userData.name : 'войдите'}</div>
				<div>Id: {userData ? userData.userId : 'войдите'}</div>
				{userData ? <>
					<button className={styles.btn_exit} onClick={exit}>Exit</button>
					<button className={styles.btn_setting} onClick={user}>user</button>
					<button className={styles.btn_setting} onClick={statistic}>Statistic</button>
					<button className={styles.btn_setting} onClick={changeStatistic}>resetStatistic</button>
					<button className={styles.btn_setting} onClick={refreshToken}>refreshToken</button>
				</> : null}
			</div>
		</div>
	)
}
