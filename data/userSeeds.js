var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('tt.db');

db.serialize(() => {
db.run("PRAGMA foreign_keys = ON;"); //enables foreign keys in sqlite3


db.run("INSERT INTO students (email) VALUES (?)",
  'emmett.chen23@trinityschoolnyc.org',
  function(err) {
    if (err) { throw err;}
  }
);

db.run("INSERT INTO transactions (userPostId, userBuyId, title, description, imageSRC) VALUES (?,?,?,?,?)",
  'emmett.chen23@trinityschoolnyc.org', "nancy.chen23@trinityschoolnyc.org", "hoodienew2", "grey hoodie", "/uploads/image-1683491793468.jpeg",
  function(err) {
    if (err) { throw err;}
  }
);

db.all('SELECT * FROM students', function(err, rows){
  if(err){
    console.log(err);
  } else {
    console.log(rows);
  }
});
db.all('SELECT * FROM transactions', function(err, rows){
  if(err){
    console.log(err);
  } else {
    console.log(rows);
  }
});
});

db.close();
