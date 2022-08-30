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
	const w = props.words
	const [words, setWords] = useState([] as Word[]);
	const [count, setCount] = useState(0);
	const [arrTrue, setArrT] = useState([] as string[]);
	const [arrFalse, setArrF] = useState([] as string[]);
	const [modalOpen, setmodalOpen] = useState(true);
	const [picShow, setPicShow] = useState(false);
	const [allWords, setAllWords] = useState([] as string[]);
	const [user, setUser] = useState({} as RespSign);
	const [statistic, setStatistic] = useState({} as Statistic);

	const [know, setKnow] = useState(true);		

	useEffect(() => {
		setWords(w)
	}, [/* w */])


	useEffect(() => {
		const c = localStorage.getItem('a')
		if (c) {
			const d = JSON.parse(c)
			setUser(d)
			console.log('data D', d);
		}
	}, [/* modalOpen */])


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
	}, [/* words */])

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
				setArrT(arr => [...arr, `${id}`]);
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
	
	console.log('//', !!user, user);


	// if (user) {
	// 	const sett = getUserStatistic(user.userId, user.token)
	// 		.then(res => setStatistic(res))
	// 		.catch(err => console.log(err))
	// 	console.log(sett)
	// 	console.log(statistic)

	// }




	if (words.length <= count && modalOpen) {
		console.log('openMod', allWords);
		// const option = {
		// 	learnedWords: 0,
		// 	sprint: {
		// 		arrFalse: ['2', '3', '4'],
		// 		arrRight: ['', ''],
		// 		period: 0
		// 	},
		// 	audioCall: {
		// 		arrFalse: [],
		// 		arrRight: [],
		// 		period: 0
		// 	},
		// 	book: { arrWords: [] }
		// } as Statistic
		// const v = changeUserStatistic(user.userId, user.token, option)
		// console.log('vvv', v);

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
				: modalOpen ? <Modal base={words} arrayMistaken={arrFalse} arrayRight={arrTrue} func={setmodalOpen} start={props.fu} />
					: null
			}
		</div>			
	)		
}



