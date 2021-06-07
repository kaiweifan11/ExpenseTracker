const express = require('express');
const bodyParser = require('body-parser');
// Mongoose service for MongoDB
const mongoose = require('mongoose');
// Cookie Session helps extracting cookie data which we store user db id
const cookieSession = require('cookie-session');
const passport = require('passport');
// Import keys
const keys = require('./config/keys');

//Mongoose Models
require('./models/User');
require('./models/Expense');

// Using Google OAuth2.0
// Authenticate users by using Passport.js and Strategy Google 
// http://www.passportjs.org/
// Authentication handled in '/services/passport'
require('./services/passport');

//MongoDB connection
mongoose.connect(keys.mongoURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});

const app = express();
app.use(bodyParser.json());

app.use(
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
		keys: [keys.cookieKey]
	})
);

app.use(passport.initialize());
app.use(passport.session());

// Route Handlers 
require('./routes/authRoutes')(app);
require('./routes/expenseRoutes')(app);

if(process.env.NODE_ENV === 'production'){
	// Express will serve production files inclient/build folder eg. main.js or main.css
	app.use(express.static('client/build'));
	
	// Express will serve index.html if it doesnt recognise the route
	const path = require('path');
	app.get('*', (req, res) =>{
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);