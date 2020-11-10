//Imports
const express = require("express");
const router = express.Router();
const commentsCtrl = require("../controllers/commentsCtrl");

//middleware
const auth = require("../middleware/auth");

//Posts routes
router.post("/posts/:id/comment/new", auth, commentsCtrl.createComment);
router.get("/posts/:id/comments/", commentsCtrl.listComments);



module.exports = router;
