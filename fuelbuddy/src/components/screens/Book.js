import React, {useContext, useState} from 'react';
import Select from 'react-select';
import { searchContext } from '../../App';
import axios from "axios";
import {Link, useNavigate} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import bg1 from '../../assets/bg1.jpg'
import {places} from './placesData'

const Book = () => {
	const navigate = useNavigate()
	const {state, type, orders, setOrders} = useContext(searchContext)
	
	const [orderDetails, setOrderDetails] = useState({
		mbl: '',
		qty: '',
		loc: '',
	})

	let date = new Date()	

	function handleMbl(e) {
        setOrderDetails(prevState=>({...prevState, mbl: e.target.value}))       
    }

	function handleQty(e) {
        setOrderDetails(prevState=>({...prevState, qty: e.target.value}))       
    }

    function handleLoc(e) {
    	console.log(e.target.defaultValue)
        setOrderDetails(prevState=>({...prevState, loc: e.target.value}))        
    }
		
	function handleOrder(e) {
		console.log(orderDetails)		
			axios.post(`${process.env.REACT_APP_BACKEND_URL}/addorder`, {
				type,
				mbl: orderDetails.mbl,
				loc: orderDetails.loc,
				qty: orderDetails.qty,				
				user: state.user,
				date
			})
			.then(response => {
				if (response.data.err) {
					return toast.error(`${response.data.err}`, {
                    	position: toast.POSITION.TOP_RIGHT
                	});  
				} else {
					console.log(response.data.order)
					toast.success(`Succesfully Placed Order`, {
                    	position: toast.POSITION.TOP_RIGHT
                	});  
                	let newOrders = orders
                	newOrders.push(response.data.order)
                	setOrders(newOrders)
                	navigate(`/orders/${response.data.order._id}`, {state: {orderid: response.data.order._id}})
				}
			}).catch(err => {				
				toast.error(`${err.message}`, {
                    position: toast.POSITION.TOP_RIGHT
                });
				console.log(err)
			})	
		e.preventDefault()	
	}

	if(type == 'mechanic') {
		return (
			<div style={{display: 'grid', minHeight: '100vh', placeItems: 'center'}}>
				<h1>Currently not Availble</h1>
			</div>
		)
	}
	else {			
    return (
        <div className="login-main">
        <img src={bg1} alt="bg" className="bg" />
        <form className="login" onSubmit={handleOrder}>
            <h2>Order</h2>
            <div className="field">
                <p>Mobile</p>
                <input type="tel" name="mobile" value={orderDetails.mbl} placeholder="xxx-xxx-xxxx" onChange={handleMbl} pattern="[0-9]{10}"/>
            </div>
            <div className="field">
                <p>Address</p>                
                <select id="loc" onChange={handleLoc} value={orderDetails.loc} style={{width: '100%', padding: '10px 5px'}}>                	                	
                	<option key='select' value='select'>Select...</option>
                	{
                		places.map((place,i) => {
                			return (<option key={place} value={place}>{place}</option>)
                		}) 
                	}                                    
               </select>
            </div>
            <div className="field">
                <p>Quantity</p>
                <input type="number" name="quantity" value={orderDetails.qty} placeholder="in liters" onChange={handleQty} min="1" max="12" />
            </div>
            

            <div className="login-submit">
                <button type="submit">Order Now</button>
            </div>                                 
        </form>
        <ToastContainer />
    	</div>
    );
	}
};

export default Book;
