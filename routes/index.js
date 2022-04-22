var express = require('express');
var router = express.Router();

const newsController = require('../controllers').news;
const userController = require('../controllers').user;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api/news', newsController.findAll);
router.get('/api/news/:id', newsController.getById);
router.post('/api/news', newsController.add);
router.put('/api/news/:id', newsController.update);
router.delete('/api/news/:id', newsController.delete);

router.get('/api/user', userController.list);
router.get('/api/user/:id', userController.getById);
router.post('/api/user', userController.add);
router.put('/api/user/:id', userController.update);
router.delete('/api/user/:id', userController.delete);

router.post('/api/news/add_with_users', newsController.addWithUsers);
module.exports = router;
