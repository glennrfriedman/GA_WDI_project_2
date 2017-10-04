// require npm packages 
const express        	= require('express'), 
			mustacheExpress = require('mustache-express'),
			bodyParser     	= require('body-parser'),
			morgan 					= require('morgan'),
			pgp 						= require('pg-promise')(),
			convertTime 		= require('convert-time'),
			countdown 			= require('countdown'),
			logger				 	= require('morgan'),
			session 				= require('express-session'),
			cookieParser 		= require('cookie-parser');

// set up new instance of express
const app = express();

// declare port
const port = 3000;			

// body-parser setup.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// view setup.
app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

// asset setup.
app.use(express.static(__dirname + '/public'));

// auth setup.
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));

// logger setup.
app.use(logger('dev'));

const auth = require('./services/auth.js');
app.use(auth.passportInstance);
app.use(auth.passportSession);
app.use(cookieParser());

// Hook up shows controller.
app.use('/tvtime', require('./controllers/shows.js'));
// Hook up users controller.
app.use('/users', require('./controllers/users.js'));

// automatically reroute to /tvtime
app.get('/', (req, res) => res.redirect('/tvtime'));

// automatically renders main paig on typing in localhost:3000 
// @localhost:3000/tvtime
app.get('/tvtime', (req, res) => {
  res.render('index');
})

// start the app.
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

