const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');

const Expense = mongoose.model('expenses');

module.exports = app =>{
	app.get('/api/expenses', requireLogin, async (req, res) =>{
		const expenses = await Expense.find({ _user: req.user.id }).select({
		    recipients: false
	    });

	    res.send(expenses);
	});
	
	app.post('/api/createExpense', requireLogin, async (req, res) =>{
		const {name, amount, category} = req.body;
		const expense = new Expense({
			name: name,
			amount: amount,
			category: category,
			_user: req.user.id,
			dateSent: Date.now()
		});
		
		try{
			await expense.save();
			const user = await req.user.save();
			res.send(user);
		}catch(err){
			console.log(err)
			res.status(422).send(err);
		}
	});
	
	app.post('/api/updateExpense', requireLogin, async (req, res) =>{
		const {id, name, amount, category} = req.body;
		Expense.findByIdAndUpdate(
			id,
			{name: name, amount: amount, category: category}, 
			async function(err, result){
				if(err){
					console.log(err)
		            res.send(err)
		        }
		        else{
		        	const user = await req.user.save();
					res.send(user);
		        }
			}
		);
	});
	
	app.post('/api/deleteExpense', requireLogin, async (req, res) =>{
		const {id} = req.body;
		
		Expense.deleteOne(
			{ _id: id }, 
			function(err, result) {
				if (err) {
					res.send(err);
				} else {
					res.send(result);
				}
			}
		);
	});
};