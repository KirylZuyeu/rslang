import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { changeUserStatistic, getUserStatistic, RespSign, Statistic } from '../../../../functionality/api';
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
	const [arrRight, setArrRight] = useState([] as string[]);
	const [arrFalse, setArrF] = useState([] as string[]);
	const [modalOpen, setmodalOpen] = useState(true);
	const [picShow, setPicShow] = useState(false);
	const [allWords, setAllWords] = useState([] as string[]);
	const [statistic, setStatistic] = useState({} as Statistic);
	const [know, setKnow] = useState(true);		

	useEffect(() => {
		setWords(props.words)
	}, [props.words])

	console.log(words);

	const rndNumbers = () => {
		const result = [];
		result.push(count);
		while (result.length < 5) {
			const randomNumber = Math.floor(Math.random() * (words.length - 1));			
				if (!result.includes(randomNumber)){
					result.push(randomNumber);
				}			
		}
		return result;
	}
	const  shuffle = (arr: number[]) => arr.sort(() => Math.random() - 0.5);

	const playWord =  () => {
		if (words.length > count) {
			console.log('----', words[count].word);
			new Audio(`https://react-learnwords-example.herokuapp.com/${words[count].audio}`).play();		
		}
	}		
	useEffect(() => {
		playWord();
	}, [words])

	useEffect(()=>{		
		playWord();		

	}, [count])

	if(words.length > count && know ){
		let array = shuffle(rndNumbers());
		arr = array;		
	}	

	const getNextWord = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		(e.target as HTMLButtonElement).previousSibling?.childNodes.forEach(el =>
			(el as HTMLElement).style.background = 'whitesmoke');		
		setPicShow(false)
		if(know){
			if (!allWords.includes(words[count].id)) {
				setAllWords(arr => [...arr, `${words[count].id}`])
			}
			setArrF(arr => [...arr, `${words[count].id}`]);
		}
		setKnow(true);
		setCount(count +1);
		arr.length = 0;		
	}

	const checkWord = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: string) => {				
		if(know){
			if(id === words[count].id){
				(e.target as HTMLButtonElement).style.background = '#00ff00';		
				if (!allWords.includes(words[count].id)) {
					setAllWords(arr => [...arr, `${words[count].id}`])
				}		
				setArrRight(arr => [...arr, `${id}`]);
			}else{
				if (!allWords.includes(words[count].id)) {
					setAllWords(arr => [...arr, `${words[count].id}`])
				}
				setArrF(arr => [...arr, `${words[count].id}`]);
				(e.target as HTMLButtonElement).style.background = '#ff0000';						
			}		
			setKnow(false);
		}
		setPicShow(true)
	}


	// function updateStatistics() {
	// 	const user = localStorage.getItem('a') as string;
	// 	const userID = JSON.parse(user).userId;
	// 	const userToken = JSON.parse(user).token;
	// 	const statistic = getUserStatistic(userID, userToken);
	// 	statistic.then(result => {
	// 		console.log(result);
	// 		let learnedWords = result.learnedWords as number;
	// 		let optional = result.optional as OptionStatistics;
	// 		const dateNow = Date().split(' ').slice(1, 4).join(' ');
	// 		const datePrev = optional.date ? optional.date : null;
	// 		if (dateNow !== datePrev) {
	// 			learnedWords = 0;
	// 			optional = objStatisticZero;
	// 		}
	// 		const arrLearnedWordsPrev = optional.arrLearnedWords;
	// 		const allWordsInGame = [...arrFalse, ...arrRight];
	// 		const updatedArrLearnedWords = [...arrLearnedWordsPrev, ...allWordsInGame].filter((el, i) => [...arrLearnedWordsPrev, ...allWordsInGame].indexOf(el) === i)
	// 		const periodPrev = optional.sprint.period;
	// 		optional.sprint = {
	// 			arrFalse,
	// 			arrRight,
	// 			period: periodPrev > seriaRightAnswers ? periodPrev : seriaRightAnswers
	// 		}
	// 		optional.arrLearnedWords = updatedArrLearnedWords;
	// 		optional.date = dateNow;
	// 		learnedWords = updatedArrLearnedWords.length;

	// 		changeUserStatistic(userID, userToken, { learnedWords, optional });
	// 	})
	// }

	// if (modalOpen && localStorage.getItem('a')) {
	// 	updateStatistics();
	// }


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



