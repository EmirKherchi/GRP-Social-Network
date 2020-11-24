//Imports

const jwt = require("jsonwebtoken");
const models = require("../models");
const JWT_SIGN_SECRET = require('../config/key');

//Fonction
module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, JWT_SIGN_SECRET.JWT_SIGN_SECRET);
    const user = await models.Users.findOne({
      where: {
        id: decodedToken.id,
      },
    });
    if (!user) {
      throw new Error();
    }
    req.user = user;
    //Passe à l'étape suivante
    next();
  } catch (err) {
    console.log(err);
    res.status(401).send({ error: "Please authenticate" });
  }
};
