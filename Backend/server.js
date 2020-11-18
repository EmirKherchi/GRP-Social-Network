// Imports

const express = require("express");
const path = require("path");
const cors = require('cors')
const bodyParser = require("body-parser");

const xss = require("xss-clean");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");

const userRouter = require("./routers/usersRtes");
const postRouter = require("./routers/postsRtes");
const likeRouter = require("./routers/likesRtes");
const commentsRouter = require("./routers/commentsRtes");

// **Init Server
const app = express();
//Enable all CORS Requests
app.use(cors())

// **Body Parser config
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//**Security

// Empêche les attaques cross-site scripting (xss)
app.use(xss());
// Setting various HTTP headers.
app.use(helmet());
// Limite le nombre de requête pour eviter attaque DDoS(deni de service) // to limit repeated requests
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 mins
  max: 100, //limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Empêche la pollution des paramètres http eviter les paramètre de l'url vérifier
app.use(hpp());

// **Configure Routes

app.use("/images", express.static(path.join(__dirname, "images")));


app.use("/api/", userRouter);
app.use("/api/", postRouter);
app.use("/api/", likeRouter);
app.use("/api/", commentsRouter);

//Launch app

app.listen(8080, function () {
  console.log("Server connected on port 8080");
});
