import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
	words: Word[]
	fu: (a: boolean) => void
}

let arr = [] as number[];
export default function PlayCall(props: PropsWord) {
	const words = props.words;

	console.log('====================================');
	console.log(words);

	const [count, setCount] = useState(0);
	const [arrTrue, setArrT] = useState([] as string[]);
	const [arrFalse, setArrF] = useState([] as string[]);
	const [modalOpen, setmodalOpen] = useState(true);
	const [picShow, setPicShow] = useState(false);

	const [know, setKnow] = useState(true);		

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
		setPicShow(false)
		if(know){
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
				setArrT(arr => [...arr, `${id}`]);
			}else{
				setArrF(arr => [...arr, `${words[count].id}`]);
				(e.target as HTMLButtonElement).style.background = '#ff0000';						
			}		
			setKnow(false);
		}
		setPicShow(true)
	}
	
	return (		
		<div className={styles.speaker_wrapper}>
			{words.length > count
			? <div className={styles.speaker_play}>
					<Picture pic={words[count].image} show={picShow} />
					<Sppeaker playWord={playWord} />
				<div className={styles.btns_speacer}>
					{(arr as number[]).map(el => <button key={words[el].id} className={styles.btn} onClick={(e) =>
						checkWord(e, words[el].id)}>{words[el].wordTranslate}</button>)}
				</div>
					<button className={styles.btn_next} onClick={(e) => getNextWord(e)}>{know ? `Не знаю` : count !== 19
				? `Следующее слово`: 'Результат'}</button></div>
				: modalOpen ? <Modal base={words} arrayMistaken={arrFalse} arrayRight={arrTrue} func={setmodalOpen} />
					: <div className={styles.btns_reset}>
						<button className={styles.btn_resetGame} onClick={() => props.fu(true)}>С начала</button>
						<Link to={'/mini-game'} className={styles.btn_resetGame} >К списку игр</Link>

					</div>}

		</div>			
	)		
}


