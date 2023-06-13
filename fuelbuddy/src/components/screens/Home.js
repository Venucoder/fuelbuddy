import React, {useContext, useEffect} from 'react'
import {Link} from 'react-router-dom'
import homebg1 from '../../assets/homebg1.jpg'
import { searchContext } from '../../App';
import {FaAngleRight} from 'react-icons/fa'
import axios from 'axios'

function Home() {
  const {state} = useContext(searchContext)  
  return (
    <div className='home-main'>      
        <img src={homebg1} alt="FuelBuddy" className="bg" />
        <div className="home">
            <h1>Fast & </h1>
            <h1 className='home-txt'>Reliable.</h1>
            <p>Get fuel whenever you need, we are there</p>            
            <Link to={state.user ? '/services' : '/signin'} className="home-link">{state.user ? 'Our Services' : 'Get Started'} <FaAngleRight className='home-link-icn' style={{position: 'relative', top: '4px'}}/></Link>
        </div>        
    </div>
  );
}

export default Home;
