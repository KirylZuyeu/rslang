import { RefObject, useContext, useEffect, useRef, useState } from "react";
import { Context, ContextUser } from "../../Context";
import { changeUserWord, createUserWord, getUserWord, getUserWords, getWords, RespSign, UserWord } from "../../functionality/api";
import { Word } from "../mini-game/call/Speaker/PlayCall";
import style from "./learn.module.css";

function Learnwords() {
	const [group, setGroup] = useState(0);
	const [page, setPage] = useState(0);
	const [words, setWords] = useState([] as Word[]);
	const [userWords, setUserWords] = useState([] as UserWord[]);
	const [userWordsEasy, setUserWordsEasy] = useState([] as string[]);
	const [userWordsHard, setUserWordsHard] = useState([] as string[]);
	const [urlArr, setUrlArr] = useState([] as string[]);
	let [count, setCount] = useState(0);
	const [activCard, setActivCard] = useState(1);
	const [userData, setUserData] = useState({} as RespSign)
	const appContext = useContext(Context)
	const audioPlayer = useRef() as RefObject<HTMLAudioElement>;


	useEffect(() => {
		getWords(group, page).then(res => setWords(res))
	}, [group, page])

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
		const a = localStorage.getItem('a')
		setUserData(a ? JSON.parse(a) : 'aa')
	}, [appContext?.isAvtorization])

	const array = Array(30).fill(1);


	function chengeGroup(num: number) {
		setGroup(num)
		setPage(0)
	}

	function changeActivCard(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
		setActivCard(+e.currentTarget.id)
	}

	console.log(words, '**', count);

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



	function addEseWord() {
		getUserWord(userData.userId, words[activCard].id, userData.token)
			.then(() => changeUserWord(userData.userId, words[activCard].id,
				'easy', 3, userData.token))
			.catch(() => createUserWord(userData.userId, words[activCard].id,
				'easy', 3, userData.token))
	}

	function addHardWord() {

	}



	return (
		<div className={style.dictionary}>
			<h2 className={style.title}>Учебник</h2>
			<div className={style.level}>
				<h3 className={style.title_litle}>Уровень сложности</h3>
				<div className={style.btn_wrapper}>
					{[1, 2, 3, 4, 5, 6].map(el => <button key={el} className={style.btn}
						onClick={() => chengeGroup(el - 1)}>Уровень {el}</button>)}
				</div>
			</div>
			{words.length ?
				<div className={style.wrapper}>
					<div className={style.card_content}>
						{words.map((el, i) => (i + 1 == activCard) ? <div key={i} id={`${i + 1}`}
							className={style.activ_card} onClick={(e) =>
								changeActivCard(e)}>
							<h5>{el.word}</h5>
							<h5>{el.wordTranslate}</h5>
						</div> : <div key={i} id={`${i + 1}`} className={style.card} onClick={(e) => changeActivCard(e)}>
							<h5>{el.word}</h5>
							<h5>{el.wordTranslate}</h5>
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
		</div >
	)
}

export default Learnwords
