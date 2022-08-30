import styles from './sprint.module.css';

type Type = {
    n:number,
    count:number,
    arrMistaken: string[],
    arrRight: string[] 
}

export default function Circle(props:Type) {
    const arr = Array(props.n).fill('') as string[];
  return (
    <>
    {arr.map((el:string, i:number) => {
      if (props.count === 0 && props.arrMistaken.length === 0 && props.arrRight.length === 0) {return (<span key={i} className={styles.circle}></span>)} else {
      if(i+1 <= props.count) {
        return (<span key={i} className={styles.circle_active}></span>)
      } else if(props.count === 0) {
        return (<span key={i} className={styles.circle_active}></span>)
      } else {
        return (<span key={i} className={styles.circle}></span>)
      }
    }    
    })}
    </>  
  )
}
