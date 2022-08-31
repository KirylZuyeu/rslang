import MainPage from './pages/main-page/main-page';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Layout from './components/loyout/Layout';
import Team from './components/team/team';
import Game from './pages/Game/game';
import Sprint from './components/mini-game/sprint/Sprint';
import AudioCall from './components/mini-game/call/audioCall';
import Learn from './components/Learn-Words/Learn';
import Statistic from './components/Statistic/Statistic';
import Dictionary from './components/Dictionary/Dictionary';
import Autorization from './pages/authorization/autorization';
import Cabinet from './components/header/Cabinet/Cabinet';
import { Context } from './Context';
import LayoutHeader from './components/loyout/LayoutHeader';
import { checkToken } from './functionality/api';

import { useState } from 'react';



function App() {	
	const [isAvtorization, setIsAvtorization] = useState(false);

	if (localStorage.getItem('a') && !isAvtorization) {
		setIsAvtorization(true);
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
						<Route path='/statistics' element={<Statistic />} />
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
