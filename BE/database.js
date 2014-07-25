/*API from our queries to our database. If we switch to another database, we need to make sure we implement any function in the exports using whatever database library we use.*/

//TODO: figure out what goes here
//var spciqdb = {};

//TODO: decide what database we're actually using 

/*Sequelize
var localdb = new Sequelize('database', null, null, {
//OPTIONS GO HERE
  dialect : 'sqlite' //WHATEVER DB WE USE
  storage: ./edgetestdb.sqlite'
});
*/

/*MySQL(local)
var mysql      = require('mysql');
connection = mysql.createConnection({
  host     : 'localhost',
  database : 'mydb',
  user     : 'root',
  password : 'root'
});
connection.connect(); 
*/

/*SQLite*/
function open()
{
  var sqlite3 = require('sqlite3').verbose();
  db = new sqlite3.Database('./edgetestdb.sqlite', sqlite3.OPEN_READWRITE);
  executeQuery("PRAGMA foreign_keys=ON");
};

function executeQuery(query, params, callbackfunc) 
{
  var stmt = db.prepare(query, params);
  console.log(JSON.stringify(stmt));
  stmt.all(callbackfunc).finalize();
};

function executeUpdate(query, params, callbackfunc)
{
  db.prepare(query).run(params, callbackfunc).finalize();
}

function cleanup() {db.close()};

module.exports = 
{
  open : open,
  executeQuery : executeQuery,
  executeUpdate : executeUpdate,
  cleanup : cleanup
}
