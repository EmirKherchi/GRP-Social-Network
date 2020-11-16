//Imports
const express = require("express");
const router = express.Router();
const postsCtrl = require("../controllers/postsCtrl");

//middleware
const auth = require("../middleware/auth");
const multer = require('../middleware/multer-config');
const isAdmin = require('../middleware/admin');

//Posts routes
router.post("/posts/new/", auth, multer, postsCtrl.createPost);
router.get("/posts/", postsCtrl.listPosts);
router.get("/posts/:id", postsCtrl.getOnePost);
router.delete("/posts/:id", isAdmin, postsCtrl.deleteOnePost);


module.exports = router;
