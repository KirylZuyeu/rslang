import ChartBar from './Chart';
import ChartProgres from './ChartProgres';
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Context } from "../../Context";
import { changeUserStatistic, getUserStatistic, objStatisticZero, RespSign, Statistic} from "../../functionality/api";
import styles from "./statistic.module.css";

export default function Statistics() {
	const [statistic, setStatistic] = useState({learnedWords:0, optional:objStatisticZero, longTimeStatistic: {}} as Statistic)
	const appContext = useContext(Context);

// const navigate = useNavigate();

// const { fetch: originalFetch } = window;
// window.fetch = async (...args) => {
// 	let [resource, config] = args;
// 	let response = await originalFetch(resource, config);
// 	if (!response.ok && response.status === 401) {
// 		appContext?.setIsAvtorization(false);
// 		localStorage.removeItem('a');
// 		localStorage.removeItem('t');
// 		navigate('/come-in');
// 	}
// 	return response;
// };

	const user = JSON.parse(localStorage.getItem('a') as string) as RespSign;

	useEffect (() => {
		if(user && getUserStatistic(user.userId, user.token) === undefined) {
			changeUserStatistic(user.userId, user.token, 0, objStatisticZero)			
		}
	}, [statistic])

	const userStatistics = user? (getUserStatistic(user.userId, user.token) !== undefined? getUserStatistic(user.userId, user.token) : changeUserStatistic(user.userId, user.token, 0, objStatisticZero)) : new Promise(()=> {});
	useEffect (() => {		
		userStatistics.then(res => {
			let learnedWords = res.learnedWords as number;      
			let optional = res.optional;
			const longTimeStatPrev = res.optional.longTimeStatistic as Record<string, Statistic>;
			const dateNow = Date().split(' ').slice(1,4).join(' ');
			const datePrev = optional.date? optional.date : null;
			
			if (dateNow !== datePrev) {
			  learnedWords = 0;
			  optional = objStatisticZero;
			  optional.longTimeStatistic = longTimeStatPrev;
			  setStatistic({learnedWords, optional});
			} else {
				setStatistic(res);
			}
		})
	}, []);

	const learnedWords = statistic.learnedWords;
	const sumRightGames = statistic.optional.sprint.sumRight + statistic.optional.audioCall.sumRight;
	const sumAllWordsGames = statistic.optional.sprint.sumAll + statistic.optional.audioCall.sumAll;

	return (
		<div className={styles.statistics}>
			{!appContext?.isAvtorization ? 
			<div>Для доступа к статистике необходимо авторизоваться</div>
				: <><section className={styles.statistic_today_wrapper}>
			<h2>Статистика за сегодня</h2>
			<div className={styles.today_info}>
			  <h3>
				  {learnedWords? learnedWords : 0}
				  <p>новые слова</p>
			  </h3>
			  <h3>
			      {sumAllWordsGames === 0 ? 0 : Math.round((sumRightGames / sumAllWordsGames) * 100)} %
				  <p>правильных ответов</p>
			  </h3>
			</div>
			<div className={styles.game_statistic_wrapper}>
				<div className={styles.game_sprint}>
					<h3>Cпринт</h3>
					<h4>Пройдено новых слов: {statistic.optional.sprint.arrLearnedWords.length}</h4>
					<h4>Правильных ответов: {statistic.optional.sprint.sumAll === 0? 0 : Math.round(statistic.optional.sprint.sumRight/statistic.optional.sprint.sumAll *100)} %</h4>
					<h4>Самая длинная серия правильных ответов: {statistic.optional.sprint.period}</h4>
				</div>
				<div className={styles.game_audioCall}>
				    <h3>Аудиовызов</h3>
					<h4>Пройдено новых слов: {statistic.optional.audioCall.arrLearnedWords.length}</h4>
					<h4>Правильных ответов: {statistic.optional.audioCall.period === 0? 0 : Math.round(statistic.optional.audioCall.arrRight.length/(statistic.optional.audioCall.arrRight.length + statistic.optional.audioCall.arrFalse.length)*100)} %</h4>
					<h4>Самая длинная серия правильных ответов: {statistic.optional.audioCall.period}</h4>
				</div>
			</div>
		  </section>
		  <section className={styles.statistic_all_wrapper}>
			<ChartBar settings={statistic}/>
			<ChartProgres settings={statistic}/>
		  </section>
				</>}
		</div>
	)
}
