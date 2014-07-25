var edgeDB = require('./database.js');
edgeDB.open();

/*Want to add a new endpoint? Here's what you do:
 * 1) Open edgeserver.js and define a new endpoint. You can define a GET, POST, PUT or DELETE endpoint using app.[get | post | put | delete](<url>, <callback>). The URL is simply the URL you stick after localhost:3000 to reach the endpoint, and the callback takes the request and response objects as arguments and lets you read the parameters of the request and send a response.
 * 2) Since this is pretty much just a wrapper for the database, we stick a query function in queries.js and simply call said method from our new endpoint in edgeserver.js. Make sure to export it!
 * 3) You're done.
 * */

/*Private helper function to simply return all rows in the result set, optionally binding the parameters.*/
function getResultSet(resp, query, params)
{
  edgeDB.executeQuery(query, params, function(error, rows){
    if(error)
      console.log(error);
    result = error ? error : rows;
    resp.send(result);
  });
}

/*Helper function for your UPDATE or INSERT statements.*/
function doUpdate(resp, statement, params)
{
  edgeDB.executeUpdate(statement, params, function(error) {
    if(error)
      console.log(error);
    result = error ? error : {message: "Success"};
    resp.send(result);
    }); 
}

/*Queries go under here,*/

var allUsers = function(resp){
  getResultSet(resp, "SELECT * FROM User;");
};

var getUser = function(resp, userid) {
  getResultSet(resp, "SELECT * FROM User WHERE user_id = ? ;", [userid]);
}
/*but above here*/
var querylist = {allUsers : allUsers,
  getUser : getUser};

module.exports = querylist;
