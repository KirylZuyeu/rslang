import Circle from './Circle';
import styles from './sprint.module.css';
import PropTypes from 'prop-types';
import { Dispatch, SetStateAction, useState } from 'react';
import base from './base.json';
import Timer from './Timer';
import Modal from './modal/Modal';

export type Base = {
  id: string,
  group: number,
  page: number,
  word: string,
  image: string,
  audio: string,
  audioMeaning: string,
  audioExample: string,
  textMeaning: string,
  textExample: string,
  transcription: string,
  wordTranslate: string,
  textMeaningTranslate: string,
  textExampleTranslate: string
}

type Props = {
  base:Base[]
}

type IndexWord = {
  word:number,
  translatedWord:number
}

function getRandomNumber(n:number) {
  return Math.floor(Math.random() * n);
}

const arrUsedNumbers = [] as number[];

function changeStateObject(objChanged:IndexWord, setIndex:(value: React.SetStateAction<IndexWord>) => void, base:Base[], func:Dispatch<SetStateAction<boolean>>) {
  const numberRandom = getRandomNumber(base.length);
  if (!arrUsedNumbers.includes(numberRandom)) {
    arrUsedNumbers.push(numberRandom);
    const numberRandom2 = getRandomNumber(2);  
    objChanged.word = numberRandom;  
    numberRandom2 === 0? objChanged.translatedWord = getRandomNumber(40) : objChanged.translatedWord = numberRandom; 
    return setIndex(objChanged)
  } else {
    if(arrUsedNumbers.length === base.length) {
      func(true);
      return;
    }
    changeStateObject(objChanged, setIndex, base, func)
  }  
}

function compaireWords(index:number, wordTranslatedInCard:string) {
  const realTranslatedWord = base[index].wordTranslate;  
  return realTranslatedWord === wordTranslatedInCard;
}

function GameSprint(props:Props) {
  const [indexObj, setIndex] = useState({word:0, translatedWord:0} as IndexWord);
  const [points, setPoints] = useState(0);
  const [flagModal, setflagModal] = useState(false);
  const [mistakenWords, setmistakenWords] = useState([] as string[]);
  const [rightWords, setrightWords] = useState([] as string[]);
  const [currentIncrease, setCurrentIncrease] = useState(10);
  let [countLearnedWords, setCountLearnedWords] = useState(0);
  const objChanged:IndexWord = {word:0, translatedWord:0};
  const wordInCard = props.base[indexObj.word].word;
  const wordTranslatedInCard = props.base[indexObj.translatedWord].wordTranslate;
  const idWordInCard = props.base[indexObj.word].id as string;

  function resultLearningWord(increase:number, btn:boolean) {
    const arrMistakenWords = mistakenWords as string[];
    const arrRightWords = rightWords as string[]; console.log(increase, countLearnedWords)
    if (countLearnedWords >= 2) {
      setCurrentIncrease(currentIncrease*2);
      setCountLearnedWords(countLearnedWords = 0);
      console.log(countLearnedWords)
    }

    if(compaireWords(indexObj.word, wordTranslatedInCard)) {           
      if(btn === false) {
        arrMistakenWords.push(idWordInCard);
        setmistakenWords(arrMistakenWords);        
        setCurrentIncrease(10);
        increase = 0;
      }else{
      arrRightWords.push(idWordInCard);
      setrightWords(arrRightWords);
      setCountLearnedWords(countLearnedWords + 1);
      }
    } else {      
      if(btn === true) {
        arrMistakenWords.push(idWordInCard);
        setmistakenWords(arrMistakenWords);        
        setCurrentIncrease(10);
        increase = 0;
      }else{
      arrRightWords.push(idWordInCard);
      setrightWords(arrRightWords);
      setCountLearnedWords(countLearnedWords + 1);
      }
    }
    return setPoints(points + increase)
  }

  return (
    <div className={styles.gameSprint}>      
      <div className={styles.gameWrapper}>
      {flagModal ? <Modal func={setflagModal} arrayRight={rightWords} arrayMistaken={mistakenWords} base={base} totalResult={points}/> : null}
        <h2 className={styles.gamePoints}>Количество баллов: {points}</h2>
        <div className={styles.gameWindow}>
          <div className={styles.gameMarks}>
          <Circle n={3}/>
          </div>          
          <h3 className={styles.gameEnglishWord}>{wordInCard}</h3>
          <h4 className={styles.gameRussianWord}>{wordTranslatedInCard}</h4>
          <div className={styles.gameButtons}>
              <button
                className={styles.btnStart} 
                onClick={()=> {
                  changeStateObject(objChanged, setIndex, props.base, setflagModal);
                  return resultLearningWord(currentIncrease, false);
                }}>
                Неверно
              </button>
              <button
                className={styles.btnStart} 
                onClick={()=> {
                  changeStateObject(objChanged, setIndex, props.base, setflagModal);
                  return resultLearningWord(currentIncrease, true);
                  }}>
                Верно
              </button>
          </div>
        </div>
        <Timer func={setflagModal}/>
      </div>
    </div>
  )
}

GameSprint.propTypes = {
  base: PropTypes.arrayOf(PropTypes.object)
}

export default GameSprint;
