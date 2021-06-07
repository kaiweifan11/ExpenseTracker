module.exports = (req, res, next) =>{
	// Check that user is logged in
	if(!req.user){
		return res.status(401).send({error: 'Please Log In.'})
	}
	
	next();
};