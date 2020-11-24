//Imports

const models = require("../models");
const { sequelize } = require("../models");
//constante

//Routes

module.exports = {
  createPost: function (req, res) {
    // Params
    const title = req.body.title;
    const image_post = req.file;

    //Vérifie la présence de params envoyés
    if (title == null || image_post == null) {
      res.status(400).json({ error: "missing parameters" });
    } else {
      console.log("all params ok");
    }

    models.Users.findOne({
      where: { id: req.user.id },
    })
      .then(function (userFound) {
        if (userFound) {
          models.Posts.create({
            UserId: userFound.id,
            title: title,
            image_post: `${req.protocol}://${req.get("host")}/images/${
              req.file.filename
            }`,
            likes: 0,
            dislikes: 0,
            all_comments: 0,
          })
            .then(function (newPosts) {
              if (newPosts) {
                models.Users.update(
                  //MaJ du compteur de post de l'utilisateur
                  { all_posts: sequelize.literal("all_posts + 1") },
                  { where: { id: req.user.id } }
                );
              }
              return res.status(201).json({
                postId: newPosts.id,
                "user firstname": userFound.firstname,
                "user lastname": userFound.lastname,
              });
            })
            .catch(function (err) {
              console.log(err);
              return res.status(500).json({ error: "can't add Post" });
            });
        } else {
          res.status(400).json({ error: "User not found" });
        }
      })
      .catch(function (err) {
        return res.status(500).json({ error: "Unable to verify user" });
      });
  },

  listPosts: function (req, res) {
    models.Posts.findAll({
      // envoi des post par date de création du plus récent au plus ancien
      order: [["createdAt", "DESC"]],
      include: [
        // Ajout de data concernant les utilisateurs qui ont créer la publication
        {
          model: models.Users,
          attributes: ["firstname", "lastname", "profil_image"],
        },
      ],
    })
      .then(function (allPosts) {
        if (allPosts) {
          return res.status(200).json(allPosts);
        } else {
          return res.status(400).json({ error: "Posts not found" });
        }
      })
      .catch(function (err) {
        res.status(500).json({ error: "invalid request" });
      });
  },

  getOnePost: function (req, res) {
    const idPost = req.params.id;

    if (idPost == null) {
      // vérification de la présence du params envoyé
      res.status(400).json({ error: "missing parameters" });
    }

    models.Posts.findOne({
      attributes: [
        "id",
        "title",
        "image_post",
        "likes",
        "dislikes",
        "all_comments",
      ],
      include: [
        {
          //Récupération des informations concernant l'utilisateur qui a crée le post
          model: models.Users,
          attributes: ["firstname", "lastname", "profil_image"],
        },
      ],
      where: { id: idPost },
    })
      .then(function (onePost) {
        if (!onePost) {
          return res.status(401).json({ error: "Post not found" });
        }
        return res.status(201).json(onePost);
      })
      .catch(function (err) {
        return res.status(500).json({ error: "Post not available" });
      });
  },
  deleteOnePost: function (req, res) {
    const idPost = req.params.id;

    if (idPost == null) {
      // vérification de la présence du params envoyé
      res.status(400).json({ error: "missing parameters" });
    }
    models.Posts.findOne({
      where: { id: idPost },
    })
      .then(function (onePost) {
        if (onePost) {
          const user = onePost.UserId;
          const likes = onePost.likes;
          const dislikes = onePost.dislikes;
          onePost.destroy();
   
          //Maj des infos dans la BDD concernant le post
          models.Users.update(
            { all_posts: sequelize.literal("all_posts - 1") },
            { where: { id: user } }
          );
          models.Users.update(
            { all_likes: sequelize.literal(`all_likes - ${likes}`) },
            { where: { id: user } }
          );
          models.Users.update(
            { all_dislikes: sequelize.literal(`all_dislikes - ${dislikes}`) },
            { where: { id: user } }
          );
          return res.status(200).json(" post supprimé ");
        } else {
          return res.status(400).json({ error: "Post not found" });
        }
      })
      .catch(function (err) {
        res.status(500).json({ error: "invalid request" });
      });
  },
};
