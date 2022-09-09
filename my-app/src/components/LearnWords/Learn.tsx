import { LOADIPHLPAPI } from "dns";
import { resetWarningCache } from "prop-types";
import { RefObject, useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { resourceLimits } from "worker_threads";
import { Context, ContextUser } from "../../Context";
import { changeUserWord, createUserWord, getUsersAggregatedWord, getUsersAggregatedWords, getUserWord, getUserWords, getWord, getWords, RespSign, UserWord } from "../../functionality/api";
import AudioCall from "../mini-game/call/audioCall";
import PlayCall, { Word } from "../mini-game/call/Speaker/PlayCall";

import style from "./learn.module.css";

export type WordUser = {
	audio: string
	audioExample: string
	audioMeaning: string
	group: number
	_id: string
	image: string
	page: number
	textExample: string
	textExampleTranslate: string
	textMeaning: string
	textMeaningTranslate: string
	transcription: string
	word: string
	wordTranslate: string
	userWord?: {
		difficulty: string
		optional: { repeat: number }
		word: string
		wordTranslate: string
	}
}

type UserWordType = {
	difficulty: string
	id: string
	optional: { repeat: number }
	wordId: string
}

function Learnwords() {
	const [group, setGroup] = useState(0);
	const [flagHard, setFlagHard] = useState(false);
	const [flagEasy, setFlagEasy] = useState(false);
	const [page, setPage] = useState(0);
	const [words, setWords] = useState([] as WordUser[]);
	const [wordsPlay, setWordsPlay] = useState([]);
	const [urlArr, setUrlArr] = useState([] as string[]);
	let [count, setCount] = useState(0);
	const [activCard, setActivCard] = useState(1);
	const [userData, setUserData] = useState({} as RespSign)
	const [isLoaded, setIsLoaded] = useState(false);
	const [userTok, setUserTok] = useState('')
	const [startCall, setStartCall] = useState(true);
	const [error, setError] = useState(null);
	const appContext = useContext(Context)
	const audioPlayer = useRef() as RefObject<HTMLAudioElement>;


	console.log(flagHard, flagEasy);

	useEffect(() => {
		console.log(userData);
		if (userData.token) {
			console.log('===============');			
			getWords(group, page)
				.then(res => {
					console.log('rrrrrrrr', res);
					setIsLoaded(true); setWordsPlay(res)
				})
				.catch(err => setError(err))
			if (appContext?.isAvtorization) {
				getUsersAggregatedWords(userData.userId, userData.token, page, 20, `${group}`
	/* { "$and": [{ "word": "duck" }] } */).then(result => result.json()).then(res => {
					res.forEach((element: any) => {
						setWords(res[0].paginatedResults)
						console.log(element, 'rrrr', words);
					});
				});
			} else {
				console.log('rererereeeeeeeeeeee');

				getWords(group, page)
					.then(res => setWords(res))				
			}
		} else {
			console.log('rererereeeeeeeeeeee');

			getWords(group, page)
				.then(res => setWords(res))
		}


	}, [group, page, flagHard, flagEasy])

	useEffect(() => {
		if (words.length) {
			const audio = [`https://react-learnwords-example.herokuapp.com/${words[activCard - 1].audio}`,
			`https://react-learnwords-example.herokuapp.com/${words[activCard - 1].audioExample}`,
			`https://react-learnwords-example.herokuapp.com/${words[activCard - 1].audioMeaning}`];
			setUrlArr(audio);
		}
		setCount(0);
	}, [activCard, words])

	useEffect(() => {
		const a = localStorage.getItem('a');
		const user = (a ? JSON.parse(a) : 'aa');
		console.log(user);

		const tok = localStorage.getItem('token');
		setUserData(a ? JSON.parse(a) : 'aa');
		setUserTok(tok ? JSON.parse(tok) : 'token');
		if (userData) {
			getWords(group, page)
				.then(res => {
					console.log('rrrrrrrr', res);
					setIsLoaded(true); setWordsPlay(res)
				})
				.catch(err => setError(err));
			if (appContext?.isAvtorization) {
				getUsersAggregatedWords(user.userId, user.token, page, 20, `${group}`
				/* { "$and": [{ "word": "duck" }] } */)
					.then(result => result.json())
					.then(res => {
						res.forEach((element: any) => {
							setWords(res[0].paginatedResults)
							console.log(element, 'rrrr@@', words);
						})
					})
			} else {
				getWords(group, page)
					.then(res => setWords(res))
			}
		}
	}, [appContext?.isAvtorization])

	const array = Array(30).fill(1);

	function chengeGroup(num: number) {
		setGroup(num)
		setPage(0)
	}

	function changeActivCard(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
		setActivCard(+e.currentTarget.id)
	}

	function playaa() {
		setCount(0);
		audioPlayer.current?.play().then().catch(() => {
			audioPlayer.current!.play();
			setCount(count = 0);
			endAudio();
		})
		function endAudio() {
			audioPlayer.current!.onended = (() => {
				if (count <= 1) {
					setCount(count += 1);
					let playPromise = audioPlayer.current!.play();
					if (playPromise !== undefined && count < 3) {
						playPromise.then(res => {
							console.log(res)
						})
							.catch(() => {
								audioPlayer.current!.play()
							});
					}
				}
			})
		}
		endAudio();
	}

	async function addEseWord() {
		const ID = words[activCard - 1]._id
		console.log('+++++++', ID);

		const resArr = await getUserWords(userData.userId, userData.token) as UserWordType[];


		console.log('------', resArr);

		const arrResId = resArr.map(el => el.wordId);
		if (!arrResId.includes(ID)) {
			const c = await createUserWord(userData.userId, ID, 'easy', 3, userData.token)
			console.log(c, 'lllllllllll');
		} else {
			const v = await changeUserWord(userData.userId, ID, 'easy', 3, userData.token)
			console.log(v, 'jjjjjjjjjjjj');
		}
		setFlagEasy(!flagEasy)
		setFlagHard(!flagHard)
	}	

	async function addHardWord() {
		const ID = words[activCard - 1]._id
		const resArr = await getUserWords(userData.userId, userData.token) as UserWordType[];
		const arrResId = resArr.map(el => el.wordId);
		if (!arrResId.includes(ID)) {
			await createUserWord(userData.userId, ID, 'hard', 3, userData.token)
		} else {
			await changeUserWord(userData.userId, ID, 'hard', 3, userData.token)
		}
		setFlagEasy(!flagEasy)
		setFlagHard(!flagHard)
	}
	console.log(!isLoaded, !wordsPlay.length, wordsPlay);

	return (
		<div className={style.dictionary}>
			{startCall ?
				<><h2 className={style.title}>Учебник</h2>
			<div className={style.level}>
				<h3 className={style.title_litle}>Уровень сложности</h3>
				<div className={style.btn_wrapper}>
					{[1, 2, 3, 4, 5, 6, 7].map(el => <button key={el} className={style.btn}
						onClick={() => chengeGroup(el - 1)}>Уровень {el}</button>)}
				</div>
			</div>
			{words.length ?
				<div className={style.wrapper}>
					<div className={style.card_content}>
						{words.map((el, i) => (i + 1 == activCard)
							? <div key={i} id={`${i + 1}`}
							className={style.activ_card} onClick={(e) =>
								changeActivCard(e)}>
							<h5>{el.word}</h5>
							<h5>{el.wordTranslate}</h5>
								{el.userWord ? (el.userWord.difficulty === 'hard') ? <div className={style.hard}></div> : (el.userWord.difficulty === 'easy')
									? <div className={style.easy}></div> : (el.userWord.difficulty === 'simple') ? <div className={style.simple}></div> : null : null}
							</div>
							: <div key={i} id={`${i + 1}`} className={style.card} onClick={(e) => changeActivCard(e)}>
							<h5>{el.word}</h5>
							<h5>{el.wordTranslate}</h5>
								{el.userWord ? (el.userWord.difficulty === 'hard') ? <div className={style.hard}></div> : (el.userWord.difficulty === 'easy')
									? <div className={style.easy}></div> : (el.userWord.difficulty === 'simple') ? <div className={style.simple}></div> : null : null}
						</div>)}</div>
					<div className={style.card_description}>
						<div className={style.card_description_top}>
							<div style={{ backgroundImage: `url(https://react-learnwords-example.herokuapp.com/${words[activCard - 1].image})` }}
								className={style.card_img}></div>
							<div className={style.dinamik} onClick={playaa}>
								<audio src={urlArr[count]} ref={audioPlayer} />
							</div>
						</div>
						<div className={style.card_description_titles_top}>
							<div>{words[activCard - 1].word}</div>
							<div>{words[activCard - 1].transcription}</div>
							<div>{words[activCard - 1].wordTranslate}</div>
						</div>
						{appContext?.isAvtorization ? 
						<div className={style.card_btn_level}>
							<button className={style.card_btn} onClick={addEseWord}>Добавить в Изученные</button>
							<button className={style.card_btn} onClick={addHardWord}>Добавить в Сложные</button>
							</div> : null}
						<p className={style.card_description_titles} dangerouslySetInnerHTML={{ __html: words[activCard - 1].textExample }}></p>
						<p className={style.card_description_titles}>
							{words[activCard - 1].textExampleTranslate}
						</p>
						<p className={style.card_description_titles} dangerouslySetInnerHTML={{ __html: words[activCard - 1].textMeaning }}></p>
						<p className={style.card_description_titles}>
							{words[activCard - 1].textMeaningTranslate}
						</p>
						<div className={style.game_link}>
									<div className={style.call_link} onClick={() => setStartCall(false)}>

									</div>
									<Link to={'/mini-game/audio-call'} className={style.sprint_link}>
							</Link>
						</div>
					</div>
				</div>
				: <div>no words</div>
			}			
			<div className={style.pagination}>
				<ul className={style.list}>
					{array.map((el, i) => {
						return <li key={i} className={style.list_li}>
							<button key={i} className={style.pagination_btn} onClick={() => setPage(i)}>{i + 1}</button>
						</li>
					})}
				</ul>
			</div>
				</> : error ? <div>Ошибка: {error}</div> : !isLoaded || !wordsPlay.length ? <div className={style.loading}>Загрузка...</div> : <PlayCall words={wordsPlay} fu={setStartCall} resetWords={setWordsPlay} />}
		</div >
	)
}

export default Learnwords
