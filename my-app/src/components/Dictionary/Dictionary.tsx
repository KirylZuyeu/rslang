import { LegacyRef, RefObject, useEffect, useRef, useState } from "react";
import { getWords, getWordsByGroup } from "../../functionality/api";
import { Word } from "../mini-game/call/Speaker/PlayCall";
import Sppeaker from "../mini-game/call/Speaker/speackker/Sppeaker";
import style from "./dictionary.module.css";
import Player from "./Player";

function Dictionary() {	
	const [group, setGroup] = useState(0);
	const [page, setPage] = useState(0);
	const [words, setWords] = useState([] as Word[]);
	const [urlArr, setUrlArr] = useState([] as string[]);
	const [count, setCount] = useState(0);
	const [activCard, setActivCard] = useState(1);
	const audioPlayer = useRef() as RefObject<HTMLAudioElement>;


	useEffect(() => {
		getWords(group, page).then(res => setWords(res))
	}, [group, page])


	console.log(`${group}`, `${page}`, words);

	useEffect(() => {
		console.log(words);
		if (words.length) {
			const audio = [`https://react-learnwords-example.herokuapp.com/${words[activCard - 1].audio}`,
			`https://react-learnwords-example.herokuapp.com/${words[activCard - 1].audioExample}`,
			`https://react-learnwords-example.herokuapp.com/${words[activCard - 1].audioMeaning}`]
			setUrlArr(audio);
		}

	}, [words])

	const array = Array(30).fill(1);


	function chengeGroup(num: number) {
		setGroup(num)
		setPage(0)
	}

	function changeActivCard(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
		console.log(e.currentTarget.id);
		setActivCard(+e.currentTarget.id)
	}

	console.log(words, '**', count);

	function playaa() {
		console.log(audioPlayer.current?.duration, '))', count);
		audioPlayer.current?.play()
		if (count <= 2) {
			setTimeout(() => {
				setCount(count + 1);
			}, audioPlayer.current?.duration!);
		}
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
								<audio onClick={playaa} src={urlArr[count]} ref={audioPlayer} />
							</div>
						</div>
						<div className={style.card_description_titles}>
							<div>{words[activCard - 1].word}</div>
							<div>{words[activCard - 1].transcription}</div>
							<div>{words[activCard - 1].wordTranslate}</div>
						</div>
						<div className={style.card_btn_level}>
							<button>add easy</button>
							<button>add hard</button>
						</div>
						<p className={style.card_description_titles}>
							{words[activCard - 1].textExample}
						</p>
						<p className={style.card_description_titles}>
							{words[activCard - 1].textExampleTranslate}
						</p>
						<p className={style.card_description_titles}>
							{`${words[activCard - 1].textMeaning}`}
						</p>
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

export default Dictionary
