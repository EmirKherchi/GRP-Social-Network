//Imports
const express = require("express");
const router = express.Router();
const postsCtrl = require("../controllers/postsCtrl");

//middleware
const auth = require("../middleware/auth");
const multer = require('../middleware/multer-config');

//Posts routes
router.post("/posts/new/", auth, multer, postsCtrl.createPost);
router.get("/posts/", postsCtrl.listPosts);
router.get("/posts/:id", postsCtrl.getOnePost);


module.exports = router;
