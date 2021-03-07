const express = require('express');
const router = express.Router();
const fs = require('fs');

router.get('/', (req, res, next) => {
  fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) throw err;
    const style = "text-align: initial; white-space: break-spaces";
    res.send('<p style="'+style+'">'+data+'</p>');
  });
});

module.exports = router;
