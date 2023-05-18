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

exports.addTran = function(user, name, des, imageSRC){
  db.run("INSERT INTO transactions (userPostId, userBuyId, title, description, imageSRC) VALUES (?,?,?,?,?)",
    user, "n/a", name, des, imageSRC,
    function(err) {
      if (err) { throw err;}
    }
  );
}

exports.completeSale = function(userPostId, userBuyId, title, description, imageSRC) {

  db.run("DELETE FROM transactions WHERE imageSRC=?", [imageSRC], function(err){
    if(err){
      throw err
    }
  });

  db.run("INSERT INTO transactions (userPostId, userBuyId, title, description, imageSRC) VALUES (?,?,?,?,?)",
[userPostId, userBuyId, title, description, imageSRC],
    function(err) {
      if (err) { throw err;}
    }
  );
  /*
  const sql = 'UPDATE transactions SET userBuyId = ? WHERE imageSRC = ?';

  db.run(sql, [userBuyId, imageSRC], function(err) {
    if(err) {
      return callback(err);
    }
    callback(null);
  });
  */
}
