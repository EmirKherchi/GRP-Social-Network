//Imports
const models = require("../models");
const { sequelize } = require("../models");
//constante

//Routes

module.exports = {
  createComment: function (req, res) {
    //params

    const content = req.body.content;
    const postsId = req.params.id;

    //Logique
    if (postsId == 0) {
      return res.status(400).json("Paramètre post Id introuvable");
    }

    models.Posts.findOne({
      where: { id: req.params.id },
    })
      .then(function (postFound) {
        if (postFound) {
          models.Users.findOne({
            where: { id: req.user.id },
          })
            .then(function (userFound) {
              if (userFound) {
                models.Comments.create({
                  PostId: postFound.id,
                  UserId: userFound.id,
                  content: content,
                })
                  .then(function (newComment) {
                    if (newComment) {
                      models.Posts.update(
                        { all_comments: sequelize.literal("all_comments + 1") },
                        { where: { id: postFound.id } }
                      );
                    }
                    return res.status(201).json(newComment);
                  })
                  .catch(function (err) {
                    return res.status(500).json(err);
                  });
              } else {
                console.log(error);
              }
            })
            .catch(function (err) {
              return res.status(500).json("Utilisateur Inconnu");
            });
        }
      })
      .catch(function (err) {
        return res.status(500).json(err);
      });
  },

  listComments: function (req, res) {
    const postsId = req.params.id;
    if (postsId == 0) {
      return res.status(400).json("Paramètre post Id introuvable");
    }
    models.Posts.findOne({
      where: { id: req.params.id },
    })
      .then(function (postFound) {
        if (postFound) {
          models.Comments.findAll({
            where: { PostId: postFound.id },
            include: [
              {
                model: models.Users,
                attributes: ["firstname", "lastname", "profil_image"],
              },
            ],
          })
            .then(function (allComments) {
              if (allComments) {
                return res.status(200).json(allComments);
              } else {
                return res.status(404).json({ error: "comments not found" });
              }
            })
            .catch(function (err) {
              return res.status(500).json({ err });
            });
        }
      })
      .catch(function (err) {
        return res.status(500).json({ err });
      });
  },
  deleteOneComment: function (req, res) {
    const idPost = req.params.id;
    const comment = req.body.comment;

    if (idPost == null) {
      res.status(400).json({ error: "missing parameters" });
    }
    models.Posts.findOne({
      where: { id: idPost },
    })
      .then(function (onePost) {
        if (onePost) {
          models.Comments.findOne({
            where: { id: comment },
          })
            .then(function (oneComment) {
              if (oneComment) {
                
                oneComment.destroy();
                models.Posts.update(
                  { all_comments: sequelize.literal("all_comments - 1") },
                  { where: { id: idPost } }
                );
                return res.status(200).json(" commentaire supprimé ");
              }
            })
            .catch(function () {
              return res.status(404).json({ error: "Comment not found" });
            });
        } else {
          return res.status(404).json({ error: "Post not found" });
        }
      })
      .catch(function (err) {
        res.status(500).json({ error: "invalid request" });
      });
  },
};
