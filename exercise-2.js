var mysql = require('mysql');
var colors = require('colors');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'dm87',
    database: 'addressbook'
})

connection.query('select * from Account limit 5',function(err,results) {
    if (err)
    console.log(err);
    else
    results.reduce(function(acc,current){
       console.log(colors.bold(current.id + ': ') + current.email);
        return acc
    },{})
    
    //console.log(colors.bold(JSON.stringify(x)));
    
    connection.end()
})