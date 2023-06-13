import React, {useContext, useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom'
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import { searchContext } from '../../App';
import cycle from '../../assets/bicycle1.png'
import skate from '../../assets/skate.gif'
import car from '../../assets/car3.png'
import {distances} from './placesData'


const Orders = () => {
	const navigate = useNavigate()
	const {state, orders, setOrders} = useContext(searchContext)

	const [isLoading, setLoading] = useState(true);	
	console.log(orders)

	useEffect(() => {      
      axios.get(`${process.env.REACT_APP_BACKEND_URL}/allorders`, {
      	params: {
      		userid: state.user?._id,
      	},
      })
      .then(response => { 
      	// console.log(response.data.orders)              	
        setOrders(response.data.orders)             
        setLoading(false);         
      })
      .catch(err => console.log(err)) 
   }, [])

	const capitalize = (str) => {
      	return str.charAt(0).toUpperCase() + str.slice(1);
   	}

	if (isLoading) {
    return (
      <div className='loading'>
      	<img src={skate} alt='Loading...' />
      </div>
    )
  	}else {
	    return (
	        <div className='orders'>
	        	{
	        		orders.reverse().map(order => {	        			
	        			let date = String(new Date(order.createdAt)).slice(0, 24)
	        			let dist = distances[order.loc]
						let total_time = dist * 1.6;
						let order_time = Math.floor((new Date() - new Date(order.createdAt)) / 1000 / 60)
						let delivery_time = total_time - order_time						
	        			return (
	        				<div className='orders-item'>
		        				<div className='ord-item-top'>
		        					<img src={order.type == 'petrol' ? cycle : car} alt={order.type} />        								        					
		        					<div>
		        						<h2 style={{fontWeight: '500'}}>{capitalize(order.type)}</h2>
		        						<p >{order.qty} Liters</p>
		        						<p>₹ {(order.qty * (order.type == 'petrol' ? 110.73 : 98.21)).toFixed(2)}/-</p>
		        						{delivery_time < 0 && <p style={{fontWeight: '700', color: '#414141'}}>Order Delivered</p>}
		        						{delivery_time >= 0 && <p style={{fontWeight: '700', color: '#414141'}}>Order is on your way...</p>}
		        						<p style={{position: 'relative', top: '35px', fontSize: '12px'}}>Ordered on {date}</p>	        						
		        					</div>	    
		        				</div>		
        						    					
	        					<Link to={'/orders/'+order._id}>View Order</Link>
	        				</div>
	        				
	        			)
	        		})
	        	}
	        </div>
	    );
	}	
};

export default Orders;
