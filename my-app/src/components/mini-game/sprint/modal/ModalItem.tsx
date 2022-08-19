import React from 'react'
import { Base } from '../GameSprint';
import styles from './modal.module.css';

type PropType = {
    obj: Base;
}

export default function ModalItem(props: PropType) {
    function playAudio() {
        return new Audio(`https://react-learnwords-example.herokuapp.com/${props.obj.audio}`).play();
    }
  return (
    <div className={styles.gameList}>
      <span className={styles.iconAudio} onClick={playAudio}></span>
      <span>{props.obj.word}</span>
      <span>-</span>
      <span>{props.obj.wordTranslate}</span>
    </div>
  )
}
