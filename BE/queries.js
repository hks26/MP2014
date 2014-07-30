var edgeDB = require('./database.js');
edgeDB.open();

/*Want to add a new endpoint? Here's what you do:
 * 1) Open edgeserver.js and define a new endpoint. You can define a GET, POST, PUT or DELETE endpoint using app.[get | post | put | delete](<url>, <callback>). The URL is simply the URL you stick after localhost:3000 to reach the endpoint, and the callback takes the request and response objects as arguments and lets you read the parameters of the request and send a response.
 * 2) Since this is pretty much just a wrapper for the database, we stick a query function in queries.js and simply call said method from our new endpoint in edgeserver.js. Make sure to export it!
 * 3) You're done.
 * */

/*Private helper function to simply return all rows in the result set, optionally binding the parameters.*/
function getResultSet(query, params, callback)
{
  edgeDB.executeQuery(query, params, callback);
}

/*Helper function for your UPDATE or INSERT statements.*/
function doUpdate(statement, params, callback)
{
  edgeDB.executeUpdate(statement, params, callback);
}


/*Queries go under here,*/

function getUser(userid, callback) {
  getResultSet("SELECT user_id, first_name, last_name, primary_email, secondary_email, job_title, address, image_url, organization_name AS organization FROM User JOIN Organization ON User.organization_id = Organization.organization_id WHERE user_id = ? ;", [userid], callback);
}

function getFollowedUsers(followeeid, callback)
{
  getResultSet("SELECT * FROM Following WHERE followee_id = ? ;", [followeeid], callback);
}

function getSharedArticlesStream(userid, callback)
{
  getResultSet("SELECT share_id, user_id, link, timestamp FROM Following JOIN Share ON Following.follower_id = Share.user_id WHERE Followee.user_id = ?", [userid], callback); 
}

//we can do this much less messily (and concurrently) with promises. just a thought
function getTimeline(userid, callback)
{
    getResultSet("SELECT * FROM Comment JOIN Share ON Comment.share_id = Share.share_id WHERE Share.user_id = ?", [userid], function(cerror, comments)
      {
        if(cerror) console.log(cerror); 
        else getResultSet("SELECT * FROM StatusUpdate JOIN Following ON StatusUpdate.user_id = Following.followee_id WHERE Following.follower_id = ?", [userid], function(sterror, statuses)
          {
            if(sterror) console.log(sterror); 
            else getResultSet("SELECT * FROM Share JOIN Following ON Share.user_id = Following.followee_id WHERE Following.follower_id = ?", [userid], function(sherror, shares)
              {
                 if(sherror) console.log(sherror); 
                 else {
                 var activites = comments.append(statuses).append(shares).sort(function(a1, a2){return (a1.timestamp<a2.timestamp)?-1:1;});
                 callback(sherror, activities);
                 }
              })
          })
      })
}

//TODO: will order by work in SQLite if they don't have a date format?
function getActivity(userid, callback)
{
  getResultSet("SELECT * FROM Comment WHERE user_id = ?", [userid], function(cerror, comments)
      {
         if(cerror) console.log(cerror); 
         else getResultSet("SELECT * FROM StatusUpdate WHERE user_id = ?", [userid], function(sterror, statuses)
          {
            if(sterror) console.log(sterror); 
            else getResultSet("SELECT * FROM Share WHERE user_id = ?", [userid], function(sherror, shares)
              {
                 if(sherror) console.log(sherror); 
                 else{
                 var activites = comments.append(statuses).append(shares).sort(function(a1, a2){return (a1.timestamp<a2.timestamp)?-1:1;});
                 callback(sherror, activities);
                 }
              })
          })
      })
}

function getComments(shareid, callback)
{
  getResultSet("SELECT * FROM Comment WHERE share_id = ? ORDER BY timestamp DESC;", [shareid], callback);
}

function addFollowing(followeeid, followerid, callback)
{
  doUpdate("INSERT INTO Following(followee_id, follower_id) (?, ?)", [followeeid, followerid]);
}

function postComment(userid, comment, share_id, callback)
{
   doUpdate("INSERT INTO Comment(user_id, comment_body, timestamp, share_id) (?,?,?,?)",
      [userid, comment, new Date().getTime(), articleid],
      callback);
}

function postStatusUpdate(userid, statustext, callback)
{
   doUpdate("INSERT INTO StatusUpdate(user_id, timestamp, status_text) (?, ?, ?)",
         [userid, new Date().getTime(), comment],
         callback);
}

function shareArticle(userid, link, callback)
{
  doUpdate("INSERT INTO Share(user_id, link, timestamp) (?, ?, ?)", 
      [userid, link, new Date().getTime()],
      callback);
}

/*but above here*/
var querylist = {
  getUser : getUser,
  getFollowedUsers : getFollowedUsers,
  getTimeline : getTimeline,
  getActivity : getActivity,
  getComments : getComments,
  addFollowing : addFollowing,
  postComment : postComment,
  postStatusUpdate : postStatusUpdate,
  shareArticle : shareArticle
};

module.exports = querylist;


