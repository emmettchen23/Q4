DROP TABLE IF EXISTS students;
DROP TABLE IF EXISTS transactions;



CREATE TABLE transactions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  userPostId INTEGER,
  userBuyId INTEGER,
  title TEXT,
  description TEXT


);

CREATE TABLE students (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT


);
