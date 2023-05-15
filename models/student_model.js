const fs = require('fs');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('data/tt.db');

db.run("PRAGMA foreign_keys = ON;"); //enables foreign keys in sqlite3

exports.getStudents = function(){
  db.all('SELECT * FROM students', function(err, rows){
    if(err) {
      return null;
    } else {
      return rows;
    }
  });
}
