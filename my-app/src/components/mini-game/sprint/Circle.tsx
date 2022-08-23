import styles from './sprint.module.css';

type Type = {
    n:number,
    count:number
}

export default function Circle(props:Type) {
    const arr = Array(props.n).fill('') as string[];
  return (
    <>
    {arr.map((el:string, i:number) => {
      if(i+1 <= props.count) {
        return (<span key={i} className={styles.circle_active}></span>)
      } else {
        return (<span key={i} className={styles.circle}></span>)
      }    
    })}
    </>  
  )
}
