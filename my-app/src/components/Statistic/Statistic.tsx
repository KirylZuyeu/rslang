import { useContext, useEffect, useState } from "react";
import { Context } from "../../Context";
import { getUserStatistic, objStatisticZero, RespSign, Statistic} from "../../functionality/api";
import styles from "./statistic.module.css";

export default function Statistics() {
	const [statistic, setStatistic] = useState({learnedWords:0, optional:objStatisticZero} as Statistic)
	const appContext = useContext(Context);

	const user = JSON.parse(localStorage.getItem('a') as string) as RespSign;
	useEffect(() => {
		if (user) {
			console.log(user.userId, user.token)
			const userStatistics = getUserStatistic(user.userId, user.token);
			userStatistics.then(res => setStatistic(res))
		}
	}, []);

	const learnedWords = statistic.learnedWords;
	const sumRightGames = statistic.optional.sprint.sumRight + statistic.optional.audioCall.sumRight;
	const sumAllWordsGames = statistic.optional.sprint.sumAll + statistic.optional.audioCall.sumAll;

	return (
		<div className={styles.statistics}>
			{!appContext?.isAvtorization ? <div>Для доступа к статистике необходимо авторизоваться</div>
				: <><section className={styles.statistic_today_wrapper}>
			<h2>Статистика за сегодня</h2>
			<div className={styles.today_info}>
			  <h3>
				  {learnedWords? learnedWords : 0}
				  <p>слов изучено</p>
			  </h3>
			  <h3>
			      {sumAllWordsGames === 0 ? 0 : Math.round((sumRightGames / sumAllWordsGames) * 100)} %
				  <p>правильных ответов</p>
			  </h3>
			</div>
			<div className={styles.game_statistic_wrapper}>
				<div className={styles.game_sprint}>
					<h3>Cпринт</h3>
							<h4>Изучено слов: {statistic.optional.sprint.arrLearnedWords ? statistic.optional.sprint.arrLearnedWords.length : 0}</h4>
					<h4>Правильных ответов: {statistic.optional.sprint.sumAll === 0? 0 : Math.round(statistic.optional.sprint.sumRight/statistic.optional.sprint.sumAll *100)} %</h4>
					<h4>Самая длинная серия правильных ответов: {statistic.optional.sprint.period}</h4>
				</div>
				<div className={styles.game_audioCall}>
				    <h3>Аудиовызов</h3>
							<h4>Изучено слов: {statistic.optional.audioCall.arrLearnedWords ? statistic.optional.audioCall.arrLearnedWords.length : 0}</h4>
							<h4>Правильных ответов: {statistic.optional.audioCall.sumAll === 0 ? 0 : Math.round(statistic.optional.audioCall.sumRight / statistic.optional.audioCall.sumAll * 100)} %</h4>
					<h4>Самая длинная серия правильных ответов: {statistic.optional.audioCall.period}</h4>
				</div>
			</div>
		  </section>
		  <section className={styles.statistic_all_wrapper}></section>
				</>}
		</div>
	)
}
