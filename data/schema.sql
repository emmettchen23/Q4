DROP TABLE IF EXISTS students;
DROP TABLE IF EXISTS transactions;



CREATE TABLE transactions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  userPostId TEXT,
  userBuyId TEXT,
  title TEXT,
  description TEXT,
  imageSRC TEXT


);

CREATE TABLE students (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT


);
