var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'dm87',
    database: 'addressbook'
});

connection.query('select * from Account join AddressBook on Account.id=AddressBook.accountId limit 5',function(err,results) {
    if (err)
        console.log(err);
    else
        
        results.reduce(function(acc, val){
            console.log(val.accountId + ': ' + val.email);
            console.log('  ' + val.name);
        },[]);
    
    connection.end();
})