import MainPage from './pages/main-page/main-page';
import { link, develops } from './store'; 
import './App.css';
import { Route,	BrowserRouter, Routes} from 'react-router-dom';
import Oleg from './pages/Team/Oleg';
import Layout from './components/loyout/Layout';
import Team from './components/team/team';
import Game from './pages/Game/game';
import Sprint from './components/mini-game/sprint';
import AudioCall from './components/mini-game/audio-call';
import Authorization from './pages/authorization/authorization';
import Kiryl from './pages/Team/Kiryl';
import Katya from './pages/Team/Katya';
import Learn from './components/Learn-Words/Learn';
import Statistic from './components/Statistic/Statistic';
import Dictionary from './components/Dictionary/Dictionary';



function App() {	
  return (
		<BrowserRouter>			
		  <Routes>
				<Route path='/' element={<Layout link={link} dev={develops}/>}>
					<Route index  element={<MainPage/>}/>
					<Route path='/team' element = { <Team/>}/>
					<Route path='/learn_words' element = { <Learn/>}/>
					<Route path='/statistics' element = { <Statistic/>}/>
					<Route path='/dictionary' element = { <Dictionary/>}/>
					<Route path='/team/Oleg' element = { <Oleg/>}/>
					<Route path='/team/Kiryl' element = { <Kiryl/>}/>
					<Route path='/team/Katya' element = { <Katya/>}/>					
					<Route path='/mini-game' element = { <Game/>}/>
					<Route path="/mini-game/sprint" element={<Sprint/>}/>
					<Route path="/mini-game/audio-call" element={<AudioCall/>}/>					
					<Route path="/come_in" element={<Authorization/>}/>					
			  </Route>
			</Routes>
				
		</BrowserRouter>
	
  );
}

export default App;
