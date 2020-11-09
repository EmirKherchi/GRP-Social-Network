//Imports
const express = require("express");
const router = express.Router();
const likesCtrl = require("../controllers/likesCtrl");

//middleware
const auth = require("../middleware/auth");

//Posts routes
router.post("/posts/:id/like/", auth, likesCtrl.likePost);
router.post("/posts/:id/dislike/",auth, likesCtrl.dislikePost);



module.exports = router;
