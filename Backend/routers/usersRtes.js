//Imports
const express = require("express");
const router = express.Router();


//middleware
const auth = require("../middleware/auth");
const multer = require('../middleware/multer-config');

const usersCtrl = require("../controllers/usersCtrl");

//Users routes
router.post("/users/register/",multer, usersCtrl.register);
router.post("/users/login/", usersCtrl.login);
router.get("/users/me/", auth, usersCtrl.GetUserProfil);
router.put("/users/me/", auth, multer, usersCtrl.updateUserProfil);

module.exports = router;
