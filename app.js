var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var expressValidator = require("express-validator");
var flash = require("connect-flash");
var session = require("express-session");
var passport = require("passport");
var localStrategy = require("passport-local").Strategy;
var user = require('./routes/user');
var mongo = require("mongodb");
var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/runfordev');
var db = mongoose.connection;


var event = require('./routes/events');
var login = require('./routes/login');
var signUp = require('./routes/signup');
var About = require('./routes/about');
var ContactUs = require('./routes/contactUs');
var routes = require('./routes/home');
//Init App
var app = express();



//view Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));
app.use(cookieParser());

//set static folder for style sheets and images..
app.use(express.static(path.join(__dirname, 'public')));

//Express Session
app.use(session({
	secret :'secret',
	saveUninitialized: true,
	resave : true
}));

//passport init
app.use(passport.initialize());
app.use(passport.session());

//Express Validator
app.use(expressValidator({
	errorFormatter: function(param,msg,value){
		var namespace = param.split('.')
		, root = namespace.shift()
		, formParam = root;
		
		while(namespace.length){
			formParam += '[' + namespace.shift() + ']';
		}
		return{
			param : formParam,
			msg : msg,
			value : value
		};
	}
}));

//Connect Flash
app.use(flash());
app.use('/', routes);
app.use('/welcome', user);
app.use('/login', login);
app.use('/signup', signUp);
app.use('/events', event);
app.use('/about', About);
app.use('/contactUs', ContactUs);

//Global Vars
/*app.use(function(req, res, next){
	res.local.success_msg = req.flash('success_msg');
	res.local.error_msg = req.flash('error_msg');
	res.local.error = req.flash('error');
	next();
});*/




app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'),function(){
	console.log('Server is started on port '+ app.get('port'));
});