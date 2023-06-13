const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model("User")
const Order = mongoose.model("Order")


router.post('/addorder',  (req, res) => {
	const {type, mbl, loc, qty, user, date} = req.body;	
	if(!type || !mbl || !loc || !qty) {
		return res.json({err: "Please Enter All Fields"})
	}
	
	const order = new Order({		
		type,
		mbl,
		loc,
		qty,
		orderBy: user,
		createdAt: date,
	})
	order.save()
	.then(order => {		
		res.json({order})
	})
	.catch(err => {
		console.log(err)
		res.json({error: err})
	})	
})

router.get('/allorders', (req, res) => {
	const {userid} = req.query	
	Order.find({orderBy: userid})		
	.then(orders => {
		res.json({orders})
	})
	.catch(err => console.log(err))
})


router.get('/getorder', (req, res) => {	
	const {placeid} = req.query;	
	Place.findOne({_id: placeid})
	.populate('postedBy', 'id name')
	.populate('comments.postedBy', 'pic name _id')
	.then(place => {	
		res.json({place})
	})
	.catch(err => console.log(err))
})

module.exports = router