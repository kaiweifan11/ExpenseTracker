const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

// Cookies for identifying return users
passport.serializeUser((user, done) => {
	// note: user.id = mongoDB id (Not Google profile id)
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	User.findById(id)
	  .then(user => {
		  done(null, user);
	  });
});

// Google OAuth2.0
// Authenticate users by using Passport.js and Strategy Google 
// http://www.passportjs.org/
passport.use(
	new GoogleStrategy({
		clientID: keys.googleClientID,
		clientSecret: keys.googleClientSecret,
		callbackURL: '/auth/google/callback',
		proxy: true
	}, 
	async (accessToken, refreshToken, profile, done) => {
		// Look for existing google id
		const existingUser = await User.findOne({googleId: profile.id});
		  
		if(existingUser){
			// If user already exists
			done(null, existingUser);
		}else{
			// If user does not exist
		    // Create and save a new user model with the google profile id
			const user = await new User({googleId: profile.id}).save()
			done(null, user);
		}
	})
);