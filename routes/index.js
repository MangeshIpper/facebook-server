const router = require("express").Router();
const auth = require("./auth");
const users = require("./users");
const posts = require("./posts");

router.use('/auth', auth);
router.use('/user', users);
router.use('/posts', posts);



module.exports = router