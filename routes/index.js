var express = require('express');
var router = express.Router();

const low = require("lowdb");
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter)

db.defaults({ posts: []}).write()

/* GET home page. */
router.get('/', function(req, res, next) {

  var values = db.get('posts', []).value()

  res.render('index', { title: 'Covid Tips', posts: values});
});

router.post('/', function(req, res) {
  var fname = req.body.fname

  db.get('posts')
      .push({ id: 1, post: fname})
      .write()

  var values = db.get('posts', []).value()

  res.render('index', {title: 'Covid Tips', posts: values})
})

router.get('/api/data', () => {
  res.send(db.get('posts', []).value())
})

module.exports = router;
