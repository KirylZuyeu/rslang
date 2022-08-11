import { Outlet} from 'react-router-dom'
import { props } from '../../App'
import React from 'react';
import Footer from '../footer/Footer'
import Header from '../header/header'


function Layout(props: props) {
    return (   
        <div className="app">
            <Header link = { props.link}/>            
            <Outlet/>
            <Footer dev = {props.dev}/>
        </div>    
    )
}

export default Layout