var express = require('express'); 
var config = require('config.js');
/*there's probs. a better way to go about this*/
/*maybe define a method in config that sets up the connections to the databases*/
var ourdb = config.ourdb //the DB we're using
var spciqdb = config.spciqdb //the SPCIQ database connection
var HOSTADDR = config.HOSTADDR //the address we're listening with (do we even need this?)
var PORT = config.PORT //the port we're listening on
var QUERYBASEURL = './routes/queries' //all db queries go here(?)
var queries = require(QUERYBASEURL); //object containing all our queries

var app = express();
/*
 * this is where the magic happens (this is our REST API.)
 * if we ~want~ to introduce some sort of proxy b/w the client and the middleware tier, i ~guess~ we'll just, um, move the URL-callback routing to some other file and use this as our default "client proxy" object - but that seems like overkill since we're probably definitely not going to switch out our REST API for something else
 */


/*
assign callbacks to HTTP requests here!
app.[get/post/put/delete]('<url>', <method>);
// if this is just a glorified wrapper for the server, all our methods will reside in queries.<method> and we'll define all our queries in one script file
*/

app.listen(PORT);

console.log('Server listening on port ' + PORT ', yo');
