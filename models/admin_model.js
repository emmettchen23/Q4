const fs = require('fs');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('data/tt.db');

db.run("PRAGMA foreign_keys = ON;"); //enables foreign keys in sqlite3

exports.refreshTrans = function(callback){
  db.run("DELETE FROM transactions", function(err){
    if(err){
      throw err
    }
  });
}


exports.removeUser = function(email){
  db.run("DELETE FROM users WHERE email=?", [email], function(err){
    if(err){
      throw err
    }
  });


}

exports.getTransactions = function(callback){
  db.all('SELECT * FROM transactions', function(err, rows){
    if(err) {
      return null;
    } else {
      callback(rows);
    }
  });
}

exports.getUsers = function(callback){
  db.all('SELECT * FROM users', function(err, rows){
    if(err) {
      return null;
    } else {
      callback(rows);
    }
  });
}
