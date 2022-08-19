import styles from './sprint.module.css';

type Type = {
    n:number
}

export default function Circle(props:Type) {
    const arr = Array(props.n).fill('') as string[];
  return (
    <>
    {arr.map((el:string, i:number) => <span key={i} className={styles.circle}></span>)}
    </>  
  )
}
