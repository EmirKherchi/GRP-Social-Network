// Imports

const express = require("express");
const path = require("path");
const cors = require('cors')
const bodyParser = require("body-parser");

const userRouter = require("./routers/usersRtes");
const postRouter = require("./routers/postsRtes");
const likeRouter = require("./routers/likesRtes");

// Init Server
const app = express();
//Enable all CORS Requests
app.use(cors())

//Body Parser config
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Configure Routes

app.use("/images", express.static(path.join(__dirname, "images")));


app.use("/api/", userRouter);
app.use("/api/", postRouter);
app.use("/api/", likeRouter);

//Launch app

app.listen(8080, function () {
  console.log("Server connected on port 8080");
});
