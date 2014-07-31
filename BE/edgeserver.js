//putting sequelize stuff on the backburner because it's a pain in the ass to work with
//Import models from our "schema" file
//var MODELSURL = './models/models.js';
//sequelize.import(MODELSURL);
//sequelize.sync();
//singleton models object, because node.js's module caching policy may result in multiple open connections to the DB
//app.set('models', require('./models/models.js'));

var express = require('express'); 
var config = require('./config.js');
//var AWS = require('aws-sdk');
//var Promise = require('promise');
/*there's probs. a better way to go about this*/
/*maybe define a method in config that sets up the connections to the databases*/
//var ourdb = config.dbconfig; //the DB we're using
var QUERYBASEURL = './queries.js'; //all db queries go here(?)
var queries = require(QUERYBASEURL); //object containing all our queries
var bodyParser = require('body-parser')

var app = express();
//app.use( bodyParser.json() ); // to support URL-encoded bodies
app.use( bodyParser.urlencoded() );
/*
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));
/*
var io = require('socket.io')(http);

io.on('connection', function(socket){
  console.log('Connection request from: ');
  socket.emit('registrationrequest');
  socket.on('registrationresponse', function(userid){
    console.log('Registration response from: '+ +' with user id: ' + +' ');
    connectedUsers.push({userid: userid, socket: socket});
    socket.on('disconnect', function() {connectedUsers.splice(connectedUserIndex(), 1)});
  });
});
var connectedUsers = [];
*/

function notifyFollowers(userid, eventData)
{
    queries.getFollowingUsers(userid, function(error, usersToNotify)
    {
       notifyUsers(usersToNotify, eventData);
    })
}

function notifyUsers(usersToUpdate, update){
  usersToUpdate.forEach(function(e, i){
    var conUser = connectedUsers.findUser(e);
    if(user)
    {conUser.socket.emit(update.eventName, update.data);}
})}

function sendResultSet(res) { return function(error, rows){
    if(error)
      console.log(error);
    result = error ? error : rows;
    res.send(result);
  }
}

function sendUpdateResult(res) { return function(error) {
    if(error)
      console.log(error);
    result = error ? error : {message: "Success"};
    res.end(result);
    }
}

/*
 * this is where the magic happens (this is our REST API.)
 * assign callbacks to HTTP requests here!
 * e.g. app.[get/post/put/delete]('<url>', <callback>);
 */

app.get('/', function(req, res)
    {
      console.log('Recieved GET request: ' + JSON.stringify(req.query));
    })

app.get('/user', function(req, res){
   console.log('Getting user ' + req.query.userid);  
   queries.getUser(req.query.userid, sendResultSet(res)); });

//TODO: notify user?
app.get('/following', function(req, res){
  console.log('Getting followed users of ' + req.query.userid);
  queries.getFollowedUsers(req.query.userid, sendResultSet(res));
    })

app.get('/timeline', function(req, res){
  console.log('Getting timeline of user ' + req.query.userid);
  queries.getTimeline(req.query.userid, sendResultSet(res));
  }
)

app.get('/activity', function(req, res){
  console.log('Getting activity by user ' + req.query.userid);
  queries.getActivity(req.query.userid, sendResultSet(res))
  })

app.get('/comment', function(req, res){
  console.log('Getting comments on share with id ' + req.query.shareid);
  queries.getComments(req.query.shareid, sendResultSet(res));
  })

app.get('/news', function(req, res){
  console.log('Getting news about ' + req.query.ticker);
  queries.getNews(req.query.ticker, sendResultSet(res));
}

app.post('/comment', function(req, res) 
    {
  console.log('Posting comment ' + req.body.text + ' by user ' + req.query.userid + ' on share ' + req.query.shareid);      
     queries.postComment(req.query.userid, req.body.text, req.query.shareid, function (error){ 
        /*if(!error){
          notifyFollowers(req.query.userid, {eventName: , eventData: })}
      */})
    })

app.post('/share', function(req, res){
  console.log('Uploading shared article ' + req.query.link +  ' shared by user ' + req.query.userid);
  queries.shareArticle(req.query.userid, req.query.link, function(error){
      /*if(!error){
        notifyFollowers(req.query.userid, {eventName: , eventData: })}*/
  })
})

app.post('/status', function(req, res){
  console.log('Posting status ' + req.body.text + ' by user ' + req.query.userid);
  queries.postStatusUpdate(req.query.userid, req.body.text, function(error){
      /*if(!error){
        notifyFollowers(req.query.userid, {eventName: , eventData: })}
  */})
})

/*

app.post('/login', passport.authenticate('local', { successRedirect: '/',
                                                    failureRedirect: '/login',
                                                    failureFlash: true }));
*/

//TODO on front end: hit /register on startup, establish connection?
//TODO: how do we handle deregistering when you navigate away from the page? do socket connections auto
//TODO: will our updates be formatted as RSS feeds? if so, find library
//TODO: is our polling being initiated on the client side? if so, don't bother with push notification registration; create an endpoint that returns the RSS feed
//TODO: new endpoint that fetches users' RSS subscriptions from external websites
//TODO: are there any more types of feeds we need to handle (on the backend?)
//TODO: what is the roadmap for our Demo? what features are we going to show off?
//TODO: authentication. cookies?

app.listen(config.PORT);

console.log('Server listening on port ' + config.PORT + ', yo');
