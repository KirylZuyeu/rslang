import styles from './picture.module.css';

export default function Picture(props: { pic: string, show: boolean }) {
	console.log(props.pic);

	const picLink = `https://react-learnwords-example.herokuapp.com/${props.pic}`
	return (
		<div style={{ backgroundImage: props.show ? `url(${picLink})` : '' }} className={styles.picture} ></div>
	)
}
