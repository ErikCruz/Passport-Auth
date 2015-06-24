var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require("express-session");

var passport = require('passport');
var passportLocal = require('passport-local');

var app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressSession({
    secret: 'mySecret'
}));

app.use(passport.initialize());
app.use(passport.session());

app.get('/', function(req, res){
   res.render('index', {
       isAuthenticated: false,
       user: req.user
   }); 
});

app.get('/login', function(req, res){
   res.render('login'); 
});

app.post('/login', function(req, res){
    
});

var port = process.env.PORT || 3000;

app.listen(port, function(){
    console.log(process.env.IP + ': ' + process.env.PORT);
});