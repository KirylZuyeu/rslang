import { useEffect, useState } from 'react';
import ResultCall from '../ResultCall';
import styles from './speaker.module.css';
import Sppeaker from './Sppeaker';

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
	words: Word[]
}

let arr = [] as number[];
export default function PlayCall(props: PropsWord) {
	const words = props.words
	console.log('====================================');
	console.log(words);
	console.log('====================================');			
	const [count, setCount] = useState(0);
	const [resultTrue, setResultT] = useState(0);	
	const [arrTrue, setArrT] = useState([] as number[]);	
	const [resultFalse, setResultF] = useState(0);		
	const [arrFalse, setArrF] = useState([] as number[]);		
	const [a, setA] = useState(true);		
						
	const [know, setKnow] = useState(true);		

	const rndNumbers = () => {
		const result = [];
		result.push(count);
		while (result.length < 4) {
			const randomNumber = Math.floor(Math.random() * (words.length - 1));			
				if (!result.includes(randomNumber)){
					result.push(randomNumber);
				}			
		}
		return result;
	}

	const  shuffle = (arr: number[]) => arr.sort(() => Math.random() - 0.5);

	const playWord =  () => {
		if(words.length > count ){
			new Audio(`https://react-learnwords-example.herokuapp.com/${words[count].audio}`).play();
		}
	}		

	useEffect(()=>{		
		playWord();		

	}, [words, count])

	if(words.length > count && know ){
		let array = shuffle(rndNumbers());
		arr = array;	
	}	

	const getNextWord = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		(e.target as HTMLButtonElement).previousSibling?.childNodes.forEach(el =>
			(el as HTMLElement).style.background = 'whitesmoke');		
		if(know){
			setResultF(resultFalse + 1);
			setArrF(arr => [...arr, count]);
		}
		setKnow(true);
		setCount(count +1);
		arr.length = 0;		
	}

	const checkWord = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: string) => {				
		if(know){
			if(id === words[count].id){
				(e.target as HTMLButtonElement).style.background = '#00ff00';						
				setResultT(resultTrue + 1);				
				setArrT(arr => [...arr, count]);
			}else{
				setResultF(resultFalse + 1);
				setArrF(arr => [...arr, count]);
				(e.target as HTMLButtonElement).style.background = '#ff0000';						
			}		
			setKnow(false);
		}
		
	}
	
	return (		
		<div className={styles.speaker_wrapper}>
			{ words.length > count
			? <div className={styles.speaker_play}>
					<Sppeaker playWord={playWord} />
				<div className={styles.btns_speacer}>
					{(arr as number[]).map(el => <button key={words[el].id} className={styles.btn} onClick={(e) =>
						 checkWord(e ,words[el].id)}>{words[el].wordTranslate}</button>)}
				</div>
				<button className={styles.btn_next} onClick={(e) => getNextWord(e)}>{ know ? `Не знаю`: count !== 19
				? `Следующее слово`: 'Результат'}</button></div>
			: <ResultCall resTrue={resultTrue} arrTrue={arrTrue} resFalse={resultFalse} arrFalse={arrFalse} words={words}/>}
		</div>			
	)		
}
