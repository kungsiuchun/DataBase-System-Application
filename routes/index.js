var express = require('express');
var router = express.Router();
const db = require('../config/database');

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  db.any(`SELECT * FROM customer ORDER BY customerid DESC`)
      .then(data => res.render('index', {
        customer: data,
        qCount: data.length
      }))
      .catch(() => createError(500));
});

module.exports = router;
