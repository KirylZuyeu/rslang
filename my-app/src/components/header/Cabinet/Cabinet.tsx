import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../../Context";
import { changeUserStatistic, checkToken, createUserWord, delUserWord, getNewUserToken, getUser, getUserStatistic, getUserWords, objStatisticZero, RespSign, WordType } from "../../../functionality/api";
import styles from "./cabinet.module.css";
import { useLocation, useParams } from "react-router"

export default function Cabinet() {
	const [userData, setUserData] = useState({} as RespSign)
	const appContext = useContext(Context);
	const navigate = useNavigate();

	const { fetch: originalFetch } = window;
	window.fetch = async (...args) => {
		let [resource, config] = args;
		let response = await originalFetch(resource, config);
		if (!response.ok && response.status === 401) {
			appContext?.setIsAvtorization(false);
			localStorage.removeItem('a');
			localStorage.removeItem('t');
			navigate('/come-in');
		}
		if(!response.ok && response.status === 404) {
			console.log('40')
		}
		return response;
	};

	function exit() {
		appContext?.setIsAvtorization(false);
		localStorage.removeItem('a');
		localStorage.removeItem('t');
		navigate('/');
	}

	function user() {
		console.log(2, checkToken());		
		getUser("63028e49e73afb00165213c1", userData.token).then(res => console.log(res));
	}

	function statistic() {
		getUserStatistic("63028e49e73afb00165213p1", userData.token).then(res => console.log(res))
	}

	function refreshToken() {
		const t = getNewUserToken(userData.userId, userData.refreshToken)
		t.then(res => console.log(res))
	}

	useEffect(() => {
		console.log(111111111);
		const a = localStorage.getItem('a')
		setUserData(a ? JSON.parse(a) : 'aa');
	}, [appContext?.isAvtorization])

	// useEffect(() => {
	// 	console.log(userData)
	// 	getUserStatistic(userData.userId, userData.refreshToken).catch(() => changeUserStatistic(userData.userId, userData.refreshToken, 0, objStatisticZero))
	// }, [userData])



	function putWord() {
		console.log(userData.userId,userData.token)
		createUserWord(userData.userId, '5e9f5ee35eb9e72bc21af4a9', 'easy', 1, userData.token);
	}

	function getWords() {				
		getUserWords(userData.userId, userData.token).then(res => console.log('getWord', res));
	}

	function changeStatistic() {
		console.log('tokenn---------', userData.token);
		changeUserStatistic(userData.userId, userData.token, 0, objStatisticZero)
	}

	function deleteWords() {
		getUserWords(userData.userId, userData.token).then(res => {
			console.log('getWord', res);
			(res as WordType[]).forEach(obj => delUserWord(userData.userId, obj.wordId, userData.token))
		});	
	}

	return (
		<div className={styles.cabinet}>
			<div key={JSON.stringify(userData)} className={styles.cabinet_wrapp}>
				<div>Name: {userData ? userData.name : 'войдите'}</div>
				<div>Id: {userData ? userData.userId : 'войдите'}</div>
				{userData
					? <>
					<button className={styles.btn_exit} onClick={exit}>Exit</button>
					<button className={styles.btn_setting} onClick={user}>user</button>
					<button className={styles.btn_setting} onClick={statistic}>Statistic</button>
					<button className={styles.btn_setting} onClick={refreshToken}>refreshToken</button>
					<button className={styles.btn_setting} onClick={changeStatistic}>changeStatistic</button>
					<button className={styles.btn_setting} onClick={getWords}>getWords</button>
					<button className={styles.btn_setting} onClick={putWord}>putWordd</button>
					<button className={styles.btn_setting} onClick={deleteWords}>deleteWords</button>
					</>
					: null}
			</div>
		</div>
	)
}
