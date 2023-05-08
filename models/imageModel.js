exports.saveImage = (db, imageData, callback) => {
  const sql = 'INSERT INTO images (file_name, file_path) VALUES (?, ?)';
  const params = [imageData.file_name, imageData.file_path];
  db.run(sql, params, function (err) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, { insertId: this.lastID });
    }
  });
};

exports.getImage = (db, id, callback) => {
  const sql = 'SELECT * FROM images WHERE id = ?';
  db.get(sql, [id], (err, row) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, row);
    }
  });
};
