var mysql = require('mysql');

var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'chakr',
	password : '666',
	database : 'chatapp'
});

module.exports = connection;