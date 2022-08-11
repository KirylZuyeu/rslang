import MainPage from './pages/main-page/main-page';
import { link, develops } from './store'; 
import './App.css';
import { 
	Router,
  Route,
  Link,
	BrowserRouter,
	Routes} from 'react-router-dom';
import Oleg from './pages/Oleg/Oleg';
import Layout from './components/loyout/Layout';
import React from 'react';
import About from './components/about/About';
import Game from './pages/game';
import Sprint from './components/mini-game/sprint';
import AudioCall from './components/mini-game/audio-call';
import Authorization from './pages/authorization/authorization';
// import Layout from './components/loyout/Layout';
// import React from 'react';

export type Dev = {dev: string[]};
export type Links = {link: string[]}
export type props = {
	link: string[],
	dev: string[]
};


function App() {	
  return (
		<BrowserRouter>			
		  <Routes>
				<Route path='/' element={<Layout link={link} dev={develops}/>}>
					<Route index  element={<MainPage/>}/>
					<Route path='/about_team/Oleg' element = { <Oleg/>}/>
					<Route path='/about_team' element = { <About/>}/>
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
