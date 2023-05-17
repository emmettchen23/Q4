const fs = require('fs');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('data/tt.db');

db.run("PRAGMA foreign_keys = ON;"); //enables foreign keys in sqlite3

exports.getStudents = function(callback){
  db.all('SELECT * FROM students', function(err, rows){
    if(err) {
      return null;
    } else {
      callback(rows);
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

exports.addTran = function(name,des){
  db.run("INSERT INTO transactions (userPostId, userBuyId, title, description) VALUES (?,?,?,?)",
    'emmett.chen23@trinityschoolnyc.org', "nancy.chen23@trinityschoolnyc.org", name, des,
    function(err) {
      if (err) { throw err;}
    }
  );
}
