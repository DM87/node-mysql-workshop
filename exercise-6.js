var mysql = require('mysql');
var groupBy = require('underscore').groupBy;

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'dm87',
    database: 'addressbook'
});

connection.query('select Account.id as AccountId, Account.email, AddressBook.id as AddressBookId, AddressBook.name, Entry.id as EntryID, Entry.firstName, Entry.lastName from Account left join AddressBook on Account.id = AddressBook.accountId left join Entry on AddressBook.id = Entry.addressBookId;',function(err,results) {
    
    
    if (err)
         console.log(err);
    else
//         console.log(results)
//         var grouped = groupBy(results, function (thing) {
//         return thing.AccountId;  // return value must be an array 
// });
// console.log(grouped);
        var accounts = results.reduce(function(acc, val){
            var idx = acc.findIndex(function(item){
                return item.id === val.AccountId;
            });
            if (idx>=0){
                var idx2 = acc[idx].addressBook.findIndex(function(item) {
                    return item.id === val.AddressBookId;
                });
                
                if (idx2 >= 0) {
                    acc[idx].addressBook[idx2].entries.push(
                        {id:val.EntryID,firstName:val.firstName,lastName:val.lastName}
                    );
                }
                else {
            acc[idx].addressBook.push({
                id : val.AddressBookId,
                name : val.name,
                entries: [{id:val.EntryID,firstName:val.firstName,lastName:val.lastName}]
            })                    
                }

            }
            else
            acc.push({
            id: val.AccountId,
            email: val.email,
            addressBook: [{id: val.AddressBookId, name:val.name, entries:[{id:val.EntryID,firstName:val.firstName,lastName:val.lastName}]}]
            });
            return acc
        },[]);
                console.log(JSON.stringify(accounts, null, 2))
    connection.end();
})