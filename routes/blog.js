var express = require('express');
var router = express.Router();
const Blog = require('../models/Blog');
const {
  allBlogs,
  createBlog,
  getBlogById,
  updateBlog,
  deleteBlog,
} = require('../controllers/BlogController');

/* GET home page. */
// router.get('/', function (req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.post('/blog', 'createBlog');

router.get('/blogs', 'getAllBlogs');

router.get('/blog/:id', 'getBlogById');

router.get('/blog/:id', 'updateBlog');

router.delete('/blog/:id', 'deleteBlog');

module.exports = router;
