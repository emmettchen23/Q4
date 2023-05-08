const express = require('express');
const imageModel = require('../models/imageModel');

module.exports = (upload, db) => {
  const router = express.Router();

  router.get('/', (req, res) => {
    res.render('upload');
  });

  router.post('/upload', upload.single('image'), (req, res) => {
    const imageData = {
      file_name: req.file.filename,
      file_path: req.file.path.replace(/\\/g, '/').replace('public', '')
    };

    imageModel.saveImage(db, imageData, (err, result) => {
      if (err) {
        console.error('Error saving image to database:', err);
        res.status(500).send('Error saving image to database');
      } else {
        res.redirect('/image/' + result.insertId);
      }
    });
  });

  router.get('/image/:id', (req, res) => {
    const id = req.params.id;
    imageModel.getImage(db, id, (err, row) => {
      if (err) {
        res.status(500).send('Error retrieving image from database');
      } else {
        res.render('image', { image: row });
      }
    });
  });

  return router;
};
