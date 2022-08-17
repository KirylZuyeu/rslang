import styles from './speaker.module.css';

type Prop ={
	playWord: () => void
}

export default function Sppeaker(props: Prop) {
	return (
		<><div className={styles.speaker} onClick={ props.playWord }></div></>
	)
}
