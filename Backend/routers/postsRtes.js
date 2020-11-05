//Imports
const express = require("express");
const router = express.Router();
const postsCtrl = require("../controllers/postsCtrl");

//middleware
const auth = require("../middleware/auth");

//Posts routes
router.post("/posts/new/", auth, postsCtrl.createPost);
router.get("/posts/", postsCtrl.listPosts);
router.get("/posts/:id", postsCtrl.getOnePost);


module.exports = router;
