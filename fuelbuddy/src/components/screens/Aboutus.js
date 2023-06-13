import React from 'react'
import {FaPhoneAlt} from 'react-icons/fa'
import {MdOutlineEmail} from 'react-icons/md'
import {FaTwitter, FaInstagram, FaFacebook, FaGlobe} from 'react-icons/fa'
import {TiLocation} from 'react-icons/ti'
import aboutus1 from '../../assets/aboutus1.png'
import male2 from '../../assets/male2.png'
import female2 from '../../assets/female2.png'



function Aboutus() {
  return (
    <div className='aboutus'>

      <div className='our-story'>
        <div className='story-inner'>
          <h1>What is <span>Fuel Buddy</span></h1>
          <p>  Getting food, medicine, groceries, and electronics delivered to your doorstep is not new,
                 we are all familiar with this concept and are actively using it.
                In fact, buying stuff online and getting it delivered to our place with just
                a few taps on our phone screens is what we all love doing.
               
                And fuel delivery is one and the same.
                 The only difference is that the fuel delivery app supplies the fuel at your current spot,
                  the fuel delivery person restocks your vehicle, and you are all equipped to go.</p>
        </div>   
        <img src={aboutus1} alt="" />        
      </div>

      <div className='our-team'>
        <h1>Our <span>Team</span></h1>
        <div className='team-inner'>
            <div className='team-card'>
                <img src={male2} alt="" />
                <h2>Dayakar</h2>
            </div>            
            
            <div className='team-card'>
                <img src={female2} alt="" />
                <h2>Naga Lakshmi</h2>
            </div>
            <div className='team-card'>
                <img src={male2} alt="" />
                <h2>Srikanth </h2>
            </div>
            <div className='team-card'>
                <img src={female2} alt="" />
                <h2>Renuka</h2>
            </div>
            <div className='team-card'>
                <img src={female2} alt="" />
                <h2>Navitha</h2>
            </div>
            <div className='team-card'>
                <img src={female2} alt="" />
                <h2>Harika</h2>
            </div>
        </div>
      </div>

      <div className='contactus'>
        <h1><span>Contact</span> Us</h1>
        <div className='cont-icons'>
          <div>
            <FaPhoneAlt className='cont-icn'/>
            <h3>+91 7035216351</h3>  
          </div>
          <div>
            <MdOutlineEmail className='cont-icn'/>
            <h3>srikanthreddy4651@gmail.com</h3>  
          </div>
          <div>
            <TiLocation className='cont-icn'/>
            <h3>102 Street, Ongole, Andhra Pradesh</h3>  
          </div>
        </div>
        <div className='social-icons'>
          <FaTwitter className='cont-icn'/>
          <FaInstagram className='cont-icn'/>
          <FaFacebook className='cont-icn'/>
          <FaGlobe className='cont-icn'/>
        </div>
      </div>
    </div>
  );
}

export default Aboutus;
