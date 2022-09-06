// import styles from './sprint.module.css';

import { Dispatch, SetStateAction } from "react";
type PropsLevel = {
  setLevel:Dispatch<SetStateAction<number>>;
}

export default function ListLevels(props:PropsLevel) {
  return (
    <select id="listLevels" onChange={(e)=> {props.setLevel(+e.target.value.slice(-1))}}>
      <option value="level0">Уровень 1</option>
      <option value="level1">Уровень 2</option>
      <option value="level2">Уровень 3</option>
      <option value="level3">Уровень 4</option>
      <option value="level4">Уровень 5</option>
      <option value="level5">Уровень 6</option>
    </select>
  )
}
