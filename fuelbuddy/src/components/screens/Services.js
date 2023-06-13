import React, {useContext} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import cycle from '../../assets/bicycle2.png'
import car from '../../assets/car3.png'
import mechanic from '../../assets/mechanic.png'
import { searchContext } from '../../App';

function Services() {
  const navigate = useNavigate()
  const {type, setType, state} = useContext(searchContext)

  const handleBook = (type) => {
    setType(type)
    navigate('/book')
  }

  return (
    <div className="service-main">
        <h1>Our <span>Services</span></h1>
        <div className="service">
            <div className="service-card">
                <img src={cycle} alt="cycle" />
                <h3>Petrol</h3>
                <p>₹110.73/-</p>
                <Link to={state.user ? '/book' : '/signin'} id="petrol" className='ser-btn' onClick={() => handleBook('petrol')}>Book Now</Link>
            </div>
            <div className="service-card">
                <img src={car} alt="car" />
                <h3>Diesel</h3>
                <p>₹98.21/-</p>
                <Link to={state.user ? '/book' : '/signin'} className='ser-btn' onClick={() => handleBook('diesel')}>Book Now</Link>
            </div>
            <div className="service-card">
                <img src={mechanic} alt="mechanic" />
                <h3>Mechanic</h3>
                <p>Not availble right now.</p>
                <Link to={state.user ? '/book' : '/signin'} className='ser-btn' onClick={() => handleBook('mechanic')}>Book Now</Link>
            </div>
        </div>
    </div>
  );
}

export default Services;
