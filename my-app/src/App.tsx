import MainPage from './pages/main-page/main-page';
import { Route, BrowserRouter, Routes, useNavigate } from 'react-router-dom';
import Layout from './components/loyout/Layout';
import Team from './components/team/team';
import Game from './pages/Game/game';
import Sprint from './components/mini-game/sprint/Sprint';
import AudioCall from './components/mini-game/call/audioCall';
import Dictionary from './components/Dictionary/Dictionaty';
import Autorization from './pages/authorization/autorization';
import Cabinet from './components/header/Cabinet/Cabinet';
import { Context } from './Context';
import LayoutHeader from './components/loyout/LayoutHeader';
import { useContext, useState } from 'react';
import Statistics from './components/Statistic/Statistic';
import { changeUserStatistic, getUserStatistic, objStatisticZero, OptionStatistics } from './functionality/api';
import Learnwords from './components/LearnWords/Learn';




function App() {	
	const [isAvtorization, setIsAvtorization] = useState(false);	

	if (localStorage.getItem('a') && !isAvtorization) {
		setIsAvtorization(true);
	}

  return (
		<Context.Provider value={{ isAvtorization, setIsAvtorization }}>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<Layout />}>
						<Route index element={<MainPage />} />
						<Route path='/team' element={<Team />} />
						<Route path='/learn-words' element={<Learnwords />} />
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
