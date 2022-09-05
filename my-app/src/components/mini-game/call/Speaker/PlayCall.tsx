import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { changeUserStatistic, getUserStatistic, objStatisticZero, OptionStatistics, RespSign, Statistic } from '../../../../functionality/api';
import Modal from '../../sprint/modal/Modal';
import Picture from './picture/Picture';
import styles from './speackker/speaker.module.css';
import Sppeaker from './speackker/Sppeaker';

export type Word = {
	audio: string
	audioExample: string
	audioMeaning: string
	group: number
	id: string
	image: string
	page: number
	textExample: string
	textExampleTranslate: string
	textMeaning: string
	textMeaningTranslate: string
	transcription: string
	word: string
	wordTranslate: string
}

export type PropsWord = {
	words: SetStateAction<Word[]>
	fu: Dispatch<SetStateAction<boolean>>
	resetWords: Dispatch<SetStateAction<never[]>>
}

let arr = [] as number[];
export default function PlayCall(props: PropsWord) {
	const [words, setWords] = useState([] as Word[]);
	const [count, setCount] = useState(0);
	const [countSeria, setCountSeria] = useState(0);
	const [maxSeria, setMaxSeria] = useState(0);
	const [arrRight, setArrRight] = useState([] as string[]);
	const [arrFalse, setArrF] = useState([] as string[]);
	const [modalOpen, setmodalOpen] = useState(true);
	const [picShow, setPicShow] = useState(false);
	const [allWords, setAllWords] = useState([] as string[]);
	const [know, setKnow] = useState(true);

	console.log('countSeria', countSeria);
	console.log('maxSeria', maxSeria);

	useEffect(() => {
		setWords(props.words)
	}, [props.words])

	console.log(words);

	const rndNumbers = () => {
		const result = [];
		result.push(count);
		while (result.length < 5) {
			const randomNumber = Math.floor(Math.random() * (words.length - 1));
			if (!result.includes(randomNumber)) {
				result.push(randomNumber);
			}
		}
		return result;
	}
	const shuffle = (arr: number[]) => arr.sort(() => Math.random() - 0.5);

	const playWord = () => {
		if (words.length > count) {
			console.log('----', words[count].word);
			new Audio(`https://react-learnwords-example.herokuapp.com/${words[count].audio}`).play();
		}
	}
	useEffect(() => {
		playWord();
	}, [words])

	useEffect(() => {
		playWord();

	}, [count])

	if (words.length > count && know) {
		let array = shuffle(rndNumbers());
		arr = array;
	}

	const getNextWord = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		(e.target as HTMLButtonElement).previousSibling?.childNodes.forEach(el =>
			(el as HTMLElement).style.background = 'whitesmoke');
		setPicShow(false)
		if (know) {
			if (!allWords.includes(words[count].id)) {
				setAllWords(arr => [...arr, `${words[count].id}`])
			}
			setArrF(arr => [...arr, `${words[count].id}`]);
			if (maxSeria < countSeria) {
				setMaxSeria(countSeria)
			}
			setCountSeria(0);
		}
		setKnow(true);
		setCount(count + 1);

		arr.length = 0;
	}

	const checkWord = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: string) => {
		if (know) {
			if (id === words[count].id) {
				(e.target as HTMLButtonElement).style.background = '#00ff00';
				if (!allWords.includes(words[count].id)) {
					setAllWords(arr => [...arr, `${words[count].id}`])
				}
				setArrRight(arr => [...arr, `${id}`]);
				setCountSeria(countSeria + 1);
				console.log('=======', countSeria);

			} else {
				if (!allWords.includes(words[count].id)) {
					setAllWords(arr => [...arr, `${words[count].id}`])
				}
				if (maxSeria < countSeria) {
					setMaxSeria(countSeria)
				}
				setCountSeria(0);
				setArrF(arr => [...arr, `${words[count].id}`]);
				(e.target as HTMLButtonElement).style.background = '#ff0000';
			}
			setKnow(false);
		}
		setPicShow(true)
	}

	function updateStatistics() {
		const user = localStorage.getItem('a') as string;
		const userID = JSON.parse(user).userId;
		const userToken = JSON.parse(user).token;
		const statistic = getUserStatistic(userID, userToken);
		statistic.then(result => {
			let learnedWords = result.learnedWords as number;
			let optional = result.optional as OptionStatistics;
			const dateNow = Date().split(' ').slice(1, 4).join(' ');
			const datePrev = optional.date ? optional.date : null;
			if (dateNow !== datePrev) {
				learnedWords = 0;
				optional = objStatisticZero;
			}
			const arrLearnedWordsPrev = optional.arrLearnedWords.arr;

			const allWordsInGame = [...arrFalse, ...arrRight];
			const updatedArrLearnedWords = [...arrLearnedWordsPrev, ...allWordsInGame].filter((el, i) =>
				[...arrLearnedWordsPrev, ...allWordsInGame].indexOf(el) === i)
			const callArrLearnedWords = optional.audioCall.arrLearnedWords;
			const updatedSprintArrLearnedWords = [...callArrLearnedWords, ...allWordsInGame].filter((el, i) =>
				[...callArrLearnedWords, ...allWordsInGame].indexOf(el) === i)
			const periodPrev = optional.audioCall.period;
			const sumAllPrev = optional.audioCall.sumAll;
			const sumAllRightPrev = optional.audioCall.sumRight;

			optional.audioCall = {
				arrLearnedWords: updatedSprintArrLearnedWords,
				arrFalse: arrFalse,
				arrRight: arrRight,
				sumRight: sumAllRightPrev + arrRight.length,
				sumAll: sumAllPrev + arrFalse.length + arrRight.length,
				period: periodPrev > maxSeria ? periodPrev : maxSeria
			}
			optional.arrLearnedWords.arr = updatedArrLearnedWords;
			optional.date = dateNow;
			learnedWords = updatedArrLearnedWords.length;
			getUserStatistic(userID, userToken).then(res => console.log(res))
			console.log(userID, userToken, { learnedWords, optional })
			changeUserStatistic(userID, userToken, learnedWords, optional);
			getUserStatistic(userID, userToken).then(res => console.log(res))
		})
	}

	useEffect(() => {
		if ((words.length <= count) && localStorage.getItem('a')) {
			if (maxSeria < countSeria) {
				setMaxSeria(countSeria)
			}
			updateStatistics();
			console.log('-----===', arrRight, arrFalse);
		}
	}, [words.length <= count])






	if (words.length <= count && modalOpen) {
		console.log('openMod', allWords);
	}

	return (

		<div className={styles.speaker_wrapper}>
			{words.length > count
				? <div className={styles.speaker_play}>
					<Picture word={words[count]} show={picShow} />
					<Sppeaker playWord={playWord} />
					<div className={styles.btns_speacer}>
						{(arr as number[]).map(el => <button key={words[el].id} className={styles.btn} onClick={(e) =>
							checkWord(e, words[el].id)}>{words[el].wordTranslate}</button>)}
					</div>
					<button className={styles.btn_next} onClick={(e) => getNextWord(e)}>{know ? `Не знаю` : count !== 19
						? `Следующее слово` : 'Результат'}</button>
				</div>
				: modalOpen ? <Modal base={words} arrayMistaken={arrFalse} arrayRight={arrRight} func={setmodalOpen} start={props.fu} />
					: null}
		</div>
	)
}



