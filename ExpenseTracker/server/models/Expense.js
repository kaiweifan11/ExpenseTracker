const mongoose = require('mongoose');
const { Schema } = mongoose;

const expenseSchema = new Schema({
	name: String, 
	amount: {type: Number, default: 0},
	category: String,
	_user: {type: Schema.Types.ObjectId, ref: 'User'},
	dateSent: Date
});

mongoose.model('expenses', expenseSchema);