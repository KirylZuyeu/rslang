import { Word } from '../PlayCall';
import styles from './picture.module.css';

export default function Picture(props: { word: Word, show: boolean }) {
	const picLink = `https://react-learnwords-example.herokuapp.com/${props.word.image}`
	return (
		<>
		<div style={{ backgroundImage: props.show ? `url(${picLink})` : '' }} className={styles.picture} ></div>
			<p className={styles.text}>{props.show ? props.word.wordTranslate : ' '}</p>
		</>
	)
}
