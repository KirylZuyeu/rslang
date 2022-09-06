import Circle from './Circle';
import styles from './sprint.module.css';
import PropTypes from 'prop-types';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
// import base from './base.json';
import Timer from './Timer';
import Modal from './modal/Modal';
import { Link } from 'react-router-dom';
import { changeUserStatistic, changeUserWord, createUserWord, getUserStatistic, getUserWords, objStatisticZero, OptionStatistics, Statistic, WordType} from '../../../functionality/api';

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
  base:Base[],
  start: Dispatch<SetStateAction<boolean>>,
  level:Dispatch<SetStateAction<number>>
}

type IndexWord = {
  word:number,
  translatedWord:number
}

function getRandomNumber(n:number) {
  return Math.floor(Math.random() * n);
}

let arrUsedNumbers = [] as number[];

function changeStateObject(objChanged:IndexWord, setIndex:(value: React.SetStateAction<IndexWord>) => void, base:Base[], func:Dispatch<SetStateAction<boolean>>) {
  const numberRandom = getRandomNumber(base.length-1);  
  if (!arrUsedNumbers.includes(numberRandom)) {
    arrUsedNumbers.push(numberRandom);
    const numberRandom2 = getRandomNumber(2);  
    objChanged.word = numberRandom;  
    numberRandom2 === 0? objChanged.translatedWord = getRandomNumber(base.length-1) : objChanged.translatedWord = numberRandom; 
    return setIndex(objChanged)
  } else {
    if(arrUsedNumbers.length === base.length-1) {
      func(true);
      return;
    }
    changeStateObject(objChanged, setIndex, base, func)
  }  
}

function compaireWords(index:number, wordTranslatedInCard:string, base:Base[]) {
  const realTranslatedWord = base[index].wordTranslate;  
  return realTranslatedWord === wordTranslatedInCard;
}

function GameSprint(props:Props) {
  const [indexObj, setIndex] = useState({word:props.base.length - 1, translatedWord:props.base.length - 1} as IndexWord);
  const [points, setPoints] = useState(0);
  const [flagModal, setflagModal] = useState(false);
  const [flagIncreasePoint, setFlagIncreasePoint] = useState(false);
  let [rightAnswers, setRightAnswers] = useState(0);
  const [seriaRightAnswers, setSeriaRightAnswers] = useState(0);
  const [mistakenWords, setmistakenWords] = useState([] as string[]);
  const [rightWords, setrightWords] = useState([] as string[]);
  const [currentIncrease, setCurrentIncrease] = useState(10);
  const [messageIncrease, setMessageIcrease] = useState(10);
  let [countLearnedWords, setCountLearnedWords] = useState(0);
  const objChanged:IndexWord = {word:0, translatedWord:0};
  const wordInCard = props.base[indexObj.word].word;
  const wordTranslatedInCard = props.base[indexObj.translatedWord].wordTranslate;
  const idWordInCard = props.base[indexObj.word].id as string;
  const [doMistake, setDoMistake] = useState(false);
  let [userWords, setUserWords] = useState([] as WordType[]);

  function resultLearningWord(increase:number, btn:boolean) {
    const arrMistakenWords = mistakenWords as string[];
    const arrRightWords = rightWords as string[];

    if(compaireWords(indexObj.word, wordTranslatedInCard, props.base)) {                 
      if(btn === false) {
        arrMistakenWords.push(idWordInCard);
        setmistakenWords(arrMistakenWords);        
        setCurrentIncrease(10);
        setRightAnswers(0);
        increase = 0;
        setCountLearnedWords(countLearnedWords = 0);
        setDoMistake(true);
      }else{
      arrRightWords.push(idWordInCard);
      setrightWords(arrRightWords);      
      setCountLearnedWords(countLearnedWords += 1);
      setFlagIncreasePoint(true);
      setTimeout(()=> {setFlagIncreasePoint(false)},1000);
      setRightAnswers(rightAnswers += 1);
      setDoMistake(false);    
      }
    } else { 
      if(btn === true) {
        arrMistakenWords.push(idWordInCard);
        setmistakenWords(arrMistakenWords);        
        setCurrentIncrease(10);
        setRightAnswers(0);
        increase = 0;
        setCountLearnedWords(countLearnedWords = 0);
        setDoMistake(true);
      }else{
      arrRightWords.push(idWordInCard);
      setrightWords(arrRightWords);     
      setCountLearnedWords(countLearnedWords += 1);
      setFlagIncreasePoint(true);
      setTimeout(()=> {setFlagIncreasePoint(false)},1000);
      setRightAnswers(rightAnswers += 1);
      setDoMistake(false);     
      }
    }
    setMessageIcrease(currentIncrease);
    if (countLearnedWords > 2) {
      setCurrentIncrease(currentIncrease*2);
      setCountLearnedWords(countLearnedWords = 0);
    }
    if(rightAnswers > seriaRightAnswers) {setSeriaRightAnswers(rightAnswers)}
    return setPoints(points + increase)
  }

  function updateStatistics() {    
    const user = localStorage.getItem('a') as string;
    const userID = JSON.parse(user).userId;
    const userToken = JSON.parse(user).token;
    const statistic = getUserStatistic(userID, userToken);    
    statistic.then(result => {     
      let learnedWords = result.learnedWords as number;      
      let optional = result.optional as OptionStatistics;
      let longTimeStatPrev = result.optional.longTimeStatistic as Record<string, Statistic>;
      if(longTimeStatPrev === undefined) {longTimeStatPrev = {}}

      const dateNow = Date().split(' ').slice(1,4).join(' ');
      const datePrev = optional.date? optional.date : null;
      
      if (dateNow !== datePrev) {
        learnedWords = 0;
        optional = objStatisticZero;
        optional.longTimeStatistic = longTimeStatPrev;
      } 
      const arrLearnedWordsPrev = optional.arrLearnedWords.arr;

      const allWordsInGame = [...mistakenWords, ...rightWords];
      const updatedArrLearnedWords = [...arrLearnedWordsPrev, ...allWordsInGame].filter((el, i) => [...arrLearnedWordsPrev, ...allWordsInGame].indexOf(el) === i)
      const sprintArrLearnedWords = optional.sprint.arrLearnedWords;
      const updatedSprintArrLearnedWords = [...sprintArrLearnedWords, ...allWordsInGame].filter((el, i) => [...sprintArrLearnedWords, ...allWordsInGame].indexOf(el) === i)
      const periodPrev = optional.sprint.period;
      const sumAllPrev = optional.sprint.sumAll;
      const sumAllRightPrev = optional.sprint.sumRight;
      let arrUserWordsID = [] as string[];

      optional.sprint = {
        arrLearnedWords: updatedSprintArrLearnedWords,
        arrFalse: mistakenWords,
        arrRight: rightWords,
        sumRight: sumAllRightPrev + rightWords.length,
        sumAll: sumAllPrev + mistakenWords.length + rightWords.length,
        period: periodPrev > seriaRightAnswers ? periodPrev : seriaRightAnswers
      }
      optional.arrLearnedWords.arr = updatedArrLearnedWords;
      optional.date = dateNow;      
      learnedWords = updatedArrLearnedWords.length;
      // const optionalForLongStat = Object.assign({}, optional);   
      // optional.longTimeStatistic[dateNow] = {learnedWords:learnedWords, optional: {sprint: optionalForLongStat.sprint,
      // audioCall: optionalForLongStat.audioCall,
      // book: optionalForLongStat.book,
      // arrLearnedWords: optionalForLongStat.arrLearnedWords,
      // date: optionalForLongStat.date}}
      optional.longTimeStatistic[dateNow] = {learnedWords:learnedWords}

      changeUserStatistic(userID, userToken, learnedWords, optional);

      getUserWords(userID, userToken).then(words=> {
        userWords = (words as WordType[]).map(el=>el);
        setUserWords(userWords);
        getUserStatistic(userID, userToken).then(() => {

          arrUserWordsID = userWords.map(el => {return el.wordId});        
      
          mistakenWords.map(wordID => {
            if(arrUserWordsID.includes(wordID)){
              changeUserWord(userID, wordID, 'simple', 1, userToken)
            }          
          });

          rightWords.map(wordID => {
            console.time('start');
            if(arrUserWordsID.includes(wordID)) {
              const repeatWord = userWords.find(obj => obj.wordId === wordID)?.optional.repeat as number;
              +repeatWord < 2?
              changeUserWord(userID, wordID, 'simple', (+repeatWord + 1), userToken)
              : changeUserWord(userID, wordID, 'easy', 3, userToken);            
            } else { 
              console.timeEnd('start');                  
              createUserWord(userID, wordID, 'simple', 1, userToken)
            }
          })
        }); 
      });
    })
  }

	useEffect(() => {
		if (flagModal && localStorage.getItem('a')) {
			updateStatistics();      
		}    

	}, [flagModal === true]);

  return (    
    <div className={styles.gameSprint}>     
      <div className={styles.gameWrapper}>      
      {flagIncreasePoint? <div className={styles.increasePoint}>+{messageIncrease}</div> : null}
      {flagModal? arrUsedNumbers = [] : null}
      {flagModal ?
      <Modal func={setflagModal} arrayRight={rightWords} arrayMistaken={mistakenWords} base={props.base} totalResult={points} start={props.start} level={props.level}/>
      : null}

        <h2 className={styles.gamePoints}>Количество баллов: {points}</h2>
        <div className={styles.gameWindow}>
          <div className={styles.gameMarks}>
          <Circle n={3} count={countLearnedWords} arrMistaken={mistakenWords} arrRight={rightWords} doMistake={doMistake}/>
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
