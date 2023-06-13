import React, {useContext, useState, useEffect} from 'react';
import { searchContext } from '../../App';
import {useParams, useLocation} from 'react-router-dom'
import check from '../../assets/check.png'
import {distances} from './placesData'

const Order = () => {
	const location = useLocation();	
	const {orders} = useContext(searchContext)
	const {orderid} = useParams() || location.state?.orderid
	
	let order;		
	for(let i = 0; i < orders.length; i++) {
		if(orders[i]._id == orderid) {
			order = orders[i]
		}
	}

	let price;
	if(order.type == 'petrol') price = 110.73 * order.qty
	else if(order.type == 'diesel') price = 98.21 * order.qty
	else price = `We'll let you know when we reach you.`

	let dist = distances[order.loc]
	let total_time = dist * 1.6;
	console.log(total_time)
	let order_time = Math.floor((new Date() - new Date(order.createdAt)) / 1000 / 60)
	const [deliveryTime, setDeliveryTime] = useState(total_time - order_time)
	useEffect(() => {		
		const update = () => {
			setDeliveryTime(prev => prev - 1)
		}
		const interval = setInterval(update, 1000 * 60)	
		return () => clearInterval(interval)
	}, [])	
	let tempdt = deliveryTime
	
	let text1, text2;	
	if(deliveryTime >= (0.90 * total_time)) {
		text1 = `Your order placed`; text2 = ` Successfully!`
	}
	else if(deliveryTime < (0.90 * total_time) && deliveryTime >= (0.7 * total_time)) {
		text1 = `Your order picked by our`; text2 = `delivery boy.`
	}
	else if(deliveryTime < (0.7 * total_time) && deliveryTime >= (0.3 * total_time)) {
		text1 = `Your order is on the way to you.`; text2 = ``	
	} 
	else if(deliveryTime < (0.3 * total_time) && deliveryTime >= (0.15 * total_time)) {
		text1 = `Your order is Near to you` ; text2 = `Be ready to pickup.`
	}
	else if(deliveryTime < (0.15 * total_time) && deliveryTime >= 0) {
		text1 = `Your order is out`;text2 = `for Delivery.`		
	} 
	else {
		text1 = `Order Delivered `;text2 = `Successfully!`
	}

	
	console.log(deliveryTime)
	console.log(distances[order.loc])

    return (
        <div className='order-success'>
        	<div className='ordsuc-top'>
        		<img src={check} alt={check} /> 	
		    	<div>
		    		<h2>{text1} <br/ > {text2}</h2>
		    		{
		    			order_time <= 30 && (deliveryTime <= 30 && deliveryTime > 0 ) && 
		    			<p>Estimated delivery time <strong>{deliveryTime.toFixed(0)}</strong> min.</p>
		    		}
		    	</div>			    	
        	</div>
        	<div className='ordsuc-btm'>
        		<div className='ordsuc-btm-field'>
        			<p>Address</p>
        			<h3>{order.loc}</h3>
        		</div>
        		<div className='ordsuc-btm-field'>
        			<p>Fuel</p>
        			<h3>{order.type}</h3>
        		</div>
        		<div className='ordsuc-btm-field'>
        			<p>Qty</p>
        			<h3>{order.qty}</h3>
        		</div>
        		<div className='ordsuc-btm-field'>
        			<p>Delivery boy ph no.</p>
        			<h3>+91 7032144412</h3>
        		</div>
        		<div className='ordsuc-btm-field'>
        			<p>Price</p>
        			<h3>₹ {(order.qty * (order.type == 'petrol' ? 110.73 : 98.21)).toFixed(2)}</h3>
        		</div>   
        		<div className='ordsuc-btm-field'>
        			<p>Order Id</p>
        			<h3>{order._id}</h3>
        		</div>
        		     		
        	</div>
        </div>
    );
};

export default Order;
