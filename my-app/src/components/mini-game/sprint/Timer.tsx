import styles from './sprint.module.css';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

type Modal = {
    func: Dispatch<SetStateAction<boolean>>
}

function Timer(props:Modal) {    
    const [time,setTime] = useState(30);
    
    useEffect(()=> {
        if (time > 0) {
            setTimeout(() => {setTime(time - 1)}, 1000);
        } else {        
            props.func(true);        
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [time])

  return (
    <div className={styles.timerWrapper}>
        <h2>{time}</h2>
    </div>
  )
}

export default Timer;
