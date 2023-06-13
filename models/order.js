const mongoose = require('mongoose')
const moment = require('moment-timezone');
const {ObjectId} = mongoose.Schema.Types

const orderSchema = new mongoose.Schema({
	type: {
		type: String,
		required: true
	},	
	mbl: {
		type: String,
		required: true
	},	
	loc: {
		type: String,
		required: true
	},	
	qty: {
		type: Number,
		required: true
	},	
	createdAt: {type: String, required: true},
	orderBy: {type: ObjectId, ref: "User"}
})

mongoose.model("Order", orderSchema)