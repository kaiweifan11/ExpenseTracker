const passport = require('passport');

module.exports = app =>{
	// Auth route handlers
	app.get('/auth/google',
		passport.authenticate('google', {
			scope: ['profile', 'email']
		})
	);

	app.get('/auth/google/callback', 
		passport.authenticate('google'),
		(req, res) => {
			res.redirect('/expenses');
		}
	);

	app.get('/api/current_user', (req, res) => {
		res.send(req.user);
	});
	
	app.get('/api/logout', (req, res) => {
		// passport function to clear token
		req.logout();
		res.redirect('/');
	});
}

