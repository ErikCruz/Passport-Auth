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

passport.use(new passportLocal.Strategy(function(username, password, done){
    // pretend this is using a real database
    if(username === password){
        done(null, {id: username, name: username});
    } else {
        done(null, null);
    }
}));

passport.serializeUser(function(user, done){
    done(null, user.id);
});

passport.deserializeUser(function(id, done){
   // Query database or cache here
   done(null, {id: id, name: id});
});

app.get('/', function(req, res){
   res.render('index', {
       isAuthenticated: req.isAuthenticated(),
       user: req.user
   }); 
});

app.get('/login', function(req, res){
   res.render('login'); 
});

app.post('/login', passport.authenticate('local'), function(req, res){
    res.redirect('/');
});

app.get('/logout', function(req, res){
   req.logout();
   res.redirect('/');
});

var port = process.env.PORT || 3000;

app.listen(port, function(){
    console.log(process.env.IP + ': ' + process.env.PORT);
});