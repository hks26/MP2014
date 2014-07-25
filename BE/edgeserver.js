//putting sequelize stuff on the backburner because it's a pain in the ass to work with
//Import models from our "schema" file
//var MODELSURL = './models/models.js';
//sequelize.import(MODELSURL);
//sequelize.sync();
//singleton models object, because node.js's module caching policy may result in multiple open connections to the DB
//app.set('models', require('./models/models.js'));

var express = require('express'); 
var config = require('./config.js');
/*there's probs. a better way to go about this*/
/*maybe define a method in config that sets up the connections to the databases*/
//var ourdb = config.dbconfig; //the DB we're using
var QUERYBASEURL = './queries.js'; //all db queries go here(?)
var queries = require(QUERYBASEURL); //object containing all our queries


function returnData(error, rows, resp)
{
   var result = error ? error : rows;
   resp.send(result);
}

var app = express();
/*
 * this is where the magic happens (this is our REST API.)
 * assign callbacks to HTTP requests here!
 * e.g. app.[get/post/put/delete]('<url>', <callback>);
 */
app.get('/users', function(req, res){
   console.log('Getting all users.');
   queries.allUsers(res);
});



app.get('/users/:id', function(req, res){
   console.log('Getting user ' + req.params.id);  
   queries.getUser(res, req.params.id);
});
/*
var connectedUsers = [];
app.post('/register', function(req, res){
  //TODO: how do we identify who's registering?
  //TODO: make sure that we're not registering a user twice
  connectedUsers.push();//???
}

app.post('/deregister', function(req, res){
  //TODO: see /register
}

//TODO: how are we ingesting articles from the streams? do we just poll every 5 seconds?

var sources; //TODO: populate from streams and followings

//TODO: query to get all sources for each user

function pollSources()
{
  sources.each(function(src, type, latest){
    var update;//???
    //check for updates here. how do we do this if not in DB???
    if(update) //if latest != newest, you have an update
  {
    var subscribedUsers; //TODO: fetch all users subscribed to this particular stream type, and take intersection with connected users
    if(type === )//following
    {
      //get any new shared articles
      
    }else if(type === )//feed
    {
     //get new articles from feed
     //TODO: insert into DB???
    }
    else//unmsupported
    {}
    }
    subscribedUsers.each(function(){
      //TODO: PUSH HERE
    }
  }
}

*/
//TODO on front end: hit /register on startup, establish connection?
//TODO: how do we handle deregistering when you navigate away from the page? do socket connections auto
//TODO: will our updates be formatted as RSS feeds? if so, find library
//TODO: is our polling being initiated on the client side? if so, don't bother with push notification registration; create an endpoint that returns the RSS feed
//TODO: new endpoint that fetches users' RSS subscriptions from external websites
//TODO: new endpoint that fetches the newest shared articles from followed users (all followed users v. individual???)
//TODO: new endpoint that fetches and combines both
//TODO: new endpoint to add following
//TODO (OPTIONAL): new endpoint to remove following
//TODO: new endpoint to add rss feed
//TODO: are there any more types of feeds we need to handle (on the backend?)
//TODO: what is the roadmap for our Demo? what features are we going to show off?

app.listen(config.PORT);

console.log('Server listening on port ' + config.PORT + ', yo');
