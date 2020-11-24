//Imports
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const models = require("../models");


//constante
const JWT_SIGN_SECRET = require('../config/key');
//REGES Pour vérif des inputs
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordRegex = /^(?=.*\d).{4,15}$/;

//Routes

module.exports = {
  register: function (req, res) {
    //Params
    const email = req.body.email;
    const password = req.body.password;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const is_admin = req.body.is_admin;
    if (
      email == null ||
      password == null ||
      firstname == null ||
      lastname == null
    ) {
      return res.status(400).json("Tous les champs ne sont pas complets");
    }
    //test des inputs avec REGEX
    if (!passwordRegex.test(password)) {
      return res
        .status(400)
        .json(
          "Le mot de passe doit contenir entre 4 et 15 caractères et inclure au moins un chiffre"
        );
    }
    if (!emailRegex.test(email)) {
      return res.status(400).json("l'adresse email est incorrect");
    }

    models.Users.findOne({
      attributes: ["email"],
      where: { email: email },
    })
      .then(function (usersFound) {
        if (!usersFound) {
          //Cryptage du MDP avant envoi dans BDD
          bcrypt.hash(password, 5, function (err, bcryptedPassword) {
            newUsers = models.Users.create({
              email: email,
              password: bcryptedPassword,
              firstname: firstname,
              lastname: lastname,
              profil_image: `${req.protocol}://${req.get("host")}/images/${
                req.file.filename
              }`,
              all_posts: 0,
              all_likes: 0,
              all_dislikes: 0,
              is_admin: is_admin,
            })
              .then(function (newUsers) {
                return res
                  .status(201)
                  .json("Félicitation, votre profil est créer");
              })
              .catch(function (err) {
                return res.status(500).json("can't add User");
              });
          });
        } else {
          return res.status(400).json("Utilisateur déjà existant");
        }
      })
      .catch(function (err) {
        return res.status(500).json("Impossible de vérifier l'utilisateur");
      });
  },

  login: function (req, res) {
    //Params
    const email = req.body.email;
    const password = req.body.password;

    //Vérification des params envoyés
    if (email == null || password == null) {
      return res.status(400).json("Veuillez remplir tous les champs");
    }
    //test des inputs avec REGEX
    if (!passwordRegex.test(password)) {
      return res
        .status(400)
        .json(
          "Le mot de passe doit contenir entre 4 et 15 caractères et inclure au moins un chiffre"
        );
    }
    if (!emailRegex.test(email)) {
      return res.status(400).json("Adresse email invalide");
    }

    models.Users.findOne({
      where: { email: email },
    })
      .then(function (usersFound) {
        if (usersFound) {
          bcrypt.compare(password, usersFound.password, function (
            errBcrypt,
            resBcrypt
          ) {
            if (resBcrypt) {
              const token = jwt.sign(
                { id: usersFound.id, is_admin: usersFound.is_admin },
                JWT_SIGN_SECRET.JWT_SIGN_SECRET,
                {
                  expiresIn: "24h",
                }
              );

              return res.status(200).json({
                Id: usersFound.id,
                is_admin: usersFound.is_admin,
                token: token,
              });
            } else {
              return res.status(400).json("Mot de passe invalide");
            }
          });
        } else {
          return res
            .status(400)
            .json("Impossible de trouver un utilisateur correspondant");
        }
      })
      .catch(function (err) {
        console.log(err);
        return res.status(500).json({ error: "Unable to verify user" });
      });
  },

  GetUserProfil: async (req, res) => {
    try {
      const user = await models.Users.findOne({
        where: {
          id: req.user.id,
        },
      });
      res.status(200).send(user);
    } catch (err) {
      res.status(500).send(err);
    }
  },

  deleteOneUser: async (req, res) => {

    const idUser = req.user.id;

    //vérifs des params envoyés
    if (idUser == null) {
      res.status(400).json({ error: "missing parameters" });
    }
    models.Users.findOne({
      where: { id: idUser },
    })
      .then(function (userFound) {
        if (userFound) {
          userFound.destroy();
          return res.status(200).json(userFound + "supprimé");
        } else {
          return res.status(400).json({ error: "user not found" });
        }
      })
      .catch(function (err) {
        res.status(500).json({ err });
      });
  },

  updateUserProfil: function (req, res) {
    models.Users.findOne({
      attributes: ["id", "profil_image"],
      where: { id: req.user.id },
    }).then(function (users) {
      if (users) {
        //récupération du FormDATA avec fichier image
        profil_image = req.file;
        users
          .update({
            profil_image: `${req.protocol}://${req.get("host")}/images/${
              req.file.filename
            }`,
          })
          .then(function () {
            return res.status(201).json(users);
          })
          .catch(function (err) {
            return res
              .status(500)
              .json(console.log("This is the invalid field ->", err.field));
          });
      } else {
        res.status(400).json("Utilisateur non trouvé");
      }
    });
  },
};
