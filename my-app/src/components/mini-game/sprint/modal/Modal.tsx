import React, { Dispatch, SetStateAction } from 'react';
import { Base } from '../GameSprint';
import styles from './modal.module.css';
import ModalItem from './ModalItem';

type ModalType = {
    func: Dispatch<SetStateAction<boolean>>,
    arrayMistaken: string[],
    arrayRight: string[],
    totalResult?: number,
    base: Base[]
}

export default function Modal (props:ModalType) {

    function findObjectInBase(base: Base[], el:string) {
        let resultObject = {} as Base;
        base.forEach(obj => obj.id === el? resultObject = obj : null)
        return resultObject;
    }

    return (
        <div>
            <div className={styles.modal}>
                <div className={styles.modalBody}>
                    {props.totalResult? <h1>Total result: {props.totalResult}</h1> : null}
                    <div className={styles.gameResult}>
                        <h4 className={styles.headingMistakes}>Ошибок: {props.arrayMistaken.length}</h4>
                        {props.arrayMistaken.map((el, i) => <ModalItem key={i} obj={findObjectInBase(props.base, el)}/>)}
                        <h4 className={styles.headingRight}>Знаю: {props.arrayRight.length}</h4>
                        {props.arrayRight.map((el, i)=> <ModalItem key={i} obj={findObjectInBase(props.base, el)}/>)}                        
                        <button  onClick={()=> props.func(false)}>Close modal</button>
                    </div>
                </div>
            </div>
        </div>
    )  
}
