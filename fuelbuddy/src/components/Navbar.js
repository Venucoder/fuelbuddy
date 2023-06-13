import React, {useState, useContext} from 'react';
import {Link, useNavigate} from 'react-router-dom'
import { searchContext } from '../App';
import logo from '../assets/fuel1.png'

function Navbar() {
  const navigate = useNavigate()
  const {state, setState} = useContext(searchContext)

  const renderNavs = () => {
    if(state.user) {
      return [
        <li><Link to="/orders" className="navv-link">Orders</Link></li>,
        <li><p className='prf-link'>{state.user?.name}</p></li>,
        <li><Link to='/signin' className="loginbtn" 
          onClick={() => {
            localStorage.clear()
            state.user = undefined;            
          }}
        >
          Logout
        </Link></li>
      ]
    }
    else {
        return [
          <li><Link to="/signin" className="navv-link">Log in</Link></li>,
          <li><Link to="/signup" className="loginbtn">Signup</Link></li>  
        ]
      }
  }

  return (
    <div className="navv-bar" style={{zIndex: '999'}}>
        <div className='logo'>
          <img src={logo} alt='logo'/>
          <Link to='/' className="navv-brand" >Fuel Buddy</Link>  
        </div>
        
        <div className="navv-menu">
            <li><Link to="/" className="navv-link">Home</Link></li>
            <li><Link to="/services" className="navv-link">Services</Link></li>
            <li><Link to="/aboutus" className="navv-link">About us</Link></li>
            {renderNavs()}
        </div>
    </div>
  );
}

export default Navbar;
