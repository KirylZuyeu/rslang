import MainPage from './pages/main-page/main-page';
import { Route, BrowserRouter, Routes, useNavigate } from 'react-router-dom';
import Layout from './components/loyout/Layout';
import Team from './components/team/team';
import Game from './pages/Game/game';
import Sprint from './components/mini-game/sprint/Sprint';
import AudioCall from './components/mini-game/call/audioCall';
import Learn from './components/Learn-Words/Learn';
import Dictionary from './components/Dictionary/Dictionary';
import Autorization from './pages/authorization/autorization';
import Cabinet from './components/header/Cabinet/Cabinet';
import { Context } from './Context';
import LayoutHeader from './components/loyout/LayoutHeader';
import { useContext, useState } from 'react';
import Statistics from './components/Statistic/Statistic';
import { changeUserStatistic, getUserStatistic, objStatisticZero, OptionStatistics } from './functionality/api';



function App() {	
	const [isAvtorization, setIsAvtorization] = useState(false);	

	if (localStorage.getItem('a') && !isAvtorization) {
		setIsAvtorization(true);
	}

	if (localStorage.getItem('a')  && isAvtorization) {
		const user = localStorage.getItem('a') as string;
		const userID = JSON.parse(user).userId;
		const userToken = JSON.parse(user).token;
		getUserStatistic(userID , userToken).catch(() => changeUserStatistic(userID , userToken, 0, objStatisticZero))
		const statistic = getUserStatistic(userID, userToken);    
		statistic.then(result => { 
			console.log(result);   
		  let learnedWords = result.learnedWords as number;      
		  let optional = result.optional as OptionStatistics;
		  const dateNow = Date().split(' ').slice(1,4).join(' ');
		  const datePrev = optional.date? optional.date : null;
		  if (dateNow !== datePrev) {
			learnedWords = 0;
			optional = objStatisticZero;
		  }
		})
	}

	{ console.log('isAvtorization+++', isAvtorization,) }

  return (
		<Context.Provider value={{ isAvtorization, setIsAvtorization }}>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<Layout />}>
						<Route index element={<MainPage />} />
						<Route path='/team' element={<Team />} />
						<Route path='/learn-words' element={<Learn />} />
						<Route path='/statistics' element={<Statistics />} />
						<Route path='/dictionary' element={<Dictionary />} />
						<Route path="/come-in" element={<Autorization />} />
						<Route path="/cabinet" element={<Cabinet />} />
					</Route>
					<Route path='/' element={<LayoutHeader />}>
						<Route path='/mini-game' element={<Game />} />
						<Route path="/mini-game/sprint" element={<Sprint />} />
						<Route path="/mini-game/audio-call" element={<AudioCall />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</Context.Provider >
  );
}

export default App;
