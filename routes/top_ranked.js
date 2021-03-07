const express = require('express');
const router = express.Router();
const fs = require('fs');

router.get('/', (req, res, next) => {
  fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) throw err;
    const topPositionCounter = (obj) => Object.values(obj).filter(position => position <= 10).length;
    const data_export = JSON.parse(data).data
      .filter(app => topPositionCounter(app.rank_history))
      .sort((a, b) => topPositionCounter(b.rank_history) - topPositionCounter(a.rank_history));
    res.send(JSON.stringify(data_export));
  });
});

module.exports = router;
