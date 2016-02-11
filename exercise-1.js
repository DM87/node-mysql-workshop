var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'dm87'
})

connection.query('show databases',function(err,results) {
    if (err)
    console.log(err)
    else
    console.log(results);
    
    connection.end()
})