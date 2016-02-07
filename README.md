# NodeJS + MySQL workshop
*This is our sequel to the databases workshops :)*

## Basic instructions
* Fork this repository and create a new Cloud9 project by cloning your fork
* All exercises to be done on **master**, in a file called `exercise-#.js`
* Some exercises may require NPM packages. You will need to use `npm install --save` to get these packages. The `package.json` should be part of the same commit where you start using the required package(s). For example, if one of the exercises requires the use of the [`request`](https://github.com/request/request) library, then the `package.json` for that submission should contain the dependency, and it should be committed at the same time as the `exercise-#.js` that `require`s it.
* A **`boilerplate.js`** file is made available to you. It contains the base code to load the MySQL library, make a first query, extract the rows as well as close the connection. You may copy this file for each exercise so that you have a base to get started from.

## Before starting
Before starting the exercises, import the file called `data.sql` in MySQL. This will create a database called `addressbook`. The database will contain a few tables. Explore all the tables using `describe` to get a feel for this address book schema. Don't come back here until you know the table structure well! It'll make it easier to do the exercises.

## Exercise 1: Getting started!
1. Write a program that fetches all the databases in MySQL and prints them nicely on the screen.
2. Don't hesitate to use `colors` or `cli-table` or any other module of your choice to make the output nicer.

## Exercise 2: Getting back our data
1. Write a program that fetches the first 5 accounts in the addressbook database
2. For each account, `console.log` a line with the account's ID and email, like this: **`#1:`**`email@domain.com`
3. Use the `colors` NPM module with the `.bold` option to achieve this effect

## Exercise 3: Joining up the data, part 1
1. Write a program that fetches all the accounts and their addressbooks.
2. Output one line for each account as in Exercise 4, followed by a listing of all the address book names for that account, one per line
3. Make the output look nice in any way you like
4. Here is an example:
```
#1: john@smith.com
  business contacts
  friends
#2: jane@smith.com
  ...
```

## Exercise 4: More about joins...
1. Notice that for the previous exercise, Account #5 did not appear in the listing. Don't come back here until you have re-checked the previous exercise and noticed for yourself that Account #5 is missing.
2. The reason for this is because Account #5 does not have any AddressBook, so doing the JOIN left it out.
3. [Read and **understand** this article on SQL JOINs](http://blog.codinghorror.com/a-visual-explanation-of-sql-joins/), more specifically about the `LEFT JOIN`.
4. Based on your new understanding, create a similar program to Exercise #4.
5. The only difference, if an account does not have any address book, print it like this:
```
#3: xxx@yyy.com
  --no address books--
```

## Exercise 6: Joining up the data, part 2
1. Write a program that fetches all accounts, their addressbooks, and entries.
2. Hint #1: you will have two `JOIN`s in your query.
3. Hint #2: you will need to use `AS` to give each column a unique name
4. Once you receive your results in JavaScript land, transform them into an **array** of accounts with nested relations.
5. Here is an example of the end result we are looking for. Note you will probably need to use some of these array methods we saw together in week 1. This is a good time to remind yourself of them, specifically `map` and `reduce`.
```javascript
[
  {
    id: 1,
    email: 'john@smith.com',
    addressBooks: [
      {
        id: 1,
        name: 'business contacts',
        entries: [
          {
            id: 1,
            firstName: 'John',
            lastName: 'Connor'
          },
          {
            id: 10,
            firstName: 'Sarah',
            lastName: 'Connor'
          }
        ]
      },
      {
        // another address book for account 1...
      }
    ]
  },
  {
    // another account...
  }
]
```

## Exercise 7: Joining up the data, part 3
1. This exercise expands on #6. Here we want to get all accounts with all address books, all entries, AND all emails/phones/addresses
2. We want to get an array of accounts as the output
3. The only difference is that each entry will now contain arrays for `emails`, `phones` and `addresses`, basically one more level of nesting

## Exercise 8: Mixing it up a bit
1. Using `inquirer`, `prompt` or a similar library, ask the user for their email address and use it as a "login" to the address book system in the following way.
2. Find the account that corresponds to this email, and show the user a list of `firstName lastName` entries, listed in alphabetical order of last name.
3. When the user chooses an entry, display a `cli-table` showing all the data for that entry.
4. Then loop back to show them all the entries again.
5. Hint #1: if a person (account) has multiple address books, we want to see all entries from all address books, no matter what.
6. Hint #2: you will need to join a few tables together to get your result.

## Exercise 9: Challenge with pagination
1. This exercise builds up on Exercise #8.
2. The only difference is, when showing the list of entries, we will show them 5 by 5.
3. Below the list of 5 entries, we will have two extra options for "Previous Page" and "Next Page"
4. These options should only be enabled if there is a previous/next page
5. Selecting one of them should show the appropriate entries
6. The rest of the program works the same way

## Exercise 10: Challenge with text search
1. This exercise builds up on Exercise #8. **It does NOT require Exercise #9**, but can go well with it :)
2. The only difference is, in addition to the list of entries, the user will have a choice to "Search entries"
3. Choosing "search entries" will make the program ask for an input search
4. Following the search, the program should show only the entries that match the search
5. Matching the search means: firstName contains search term OR lastName contains search term OR any email address contains search term OR any address line1/city/state/country match the search term.
6. The rest of the program works the same way

## MEGA CHALLENGE: Connecting the address book project
For this challenge, you will link up your address book project with MySQL:
  1. Your app will NOT be holding the full address book data as an array anymore!
  2. All the data ("source of truth") will be in your MySQL database, as tables
  3. When you choose "Create", the app will ask you all the same info, but at the end will put it in the table structure account/addressbook/entry/emails+addresses+phones.
  4. When someone does a search, do the search using a MySQL query instead
  6. When somemone deletes an entry, delete it from MySQL
  6. All the rest of the application stays the same
