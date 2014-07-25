/*set up database stuffs here*/
var PORT = 3000;
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
  db = new sqlite3.Database('./edgedb.sqlite', sqlite3.OPEN_READWRITE);
};

function executeQuery(query, params, callbackfunc) 
{
  db.prepare(query, params).all(callbackfunc).finalize();
};

function cleanup() {db.close()};

module.exports = 
{
  open : open,
  executeQuery : executeQuery,
  cleanup : cleanup,
  PORT : PORT
}
