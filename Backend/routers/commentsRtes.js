//Imports
const express = require("express");
const router = express.Router();
const commentsCtrl = require("../controllers/commentsCtrl");

//middleware
const auth = require("../middleware/auth");
const isAdmin = require('../middleware/admin');

//Posts routes
router.post("/posts/:id/comment/new", auth, commentsCtrl.createComment);
router.get("/posts/:id/comments/", commentsCtrl.listComments);
router.delete("/posts/:id/comment/",isAdmin, commentsCtrl.deleteOneComment);



module.exports = router;
