// Imports
const models = require("../models");
const { sequelize } = require("../models");

// Constants

//routes
module.exports = {
  likePost: function (req, res) {
    const postsId = req.params.id;

    if (postsId == 0) {
      return res.status(400).json("Paramètre post Id introuvable");
    }

    models.Posts.findOne({
      where: { id: postsId },
    })
      .then(function (postFound) {
        if (postFound) {
          models.Users.findOne({
            where: { id: req.user.id },
          })
            .then(function (userFound) {
              if (userFound) {
                models.Likes.findOne({
                  where: {
                    UsersId: userFound.id,
                    PostsId: postFound.id,
                    Like : 1,
                  },
                })
                  .then(function (isUserAlreadyLiked) {
                    if (isUserAlreadyLiked) {
                      models.Likes.update(
                        { Like: 0 },
                        {
                          where: {
                            UsersId: userFound.id,
                            PostsId: postFound.id,
                          },
                        }
                      );
                      models.Posts.update(
                        { likes: sequelize.literal("likes - 1") },
                        { where: { id: postFound.id } }
                      );
                      return res.status(200).json("like mis à jour");
                    } else {
                      newLikes = models.Likes.create({
                        UsersId: userFound.id,
                        PostsId: postFound.id,
                        Like: 1,
                        Dislike: 0,
                      });
                      models.Posts.update(
                        { likes: sequelize.literal("likes + 1") },
                        { where: { id: postFound.id } }
                      );
                      return res.status(200).json("like ajouté");
                    }
                  })
                  .catch(function (err) {
                    return res
                      .status(500)
                      .json(
                        "Impossible de vérifier si l'utilisateur à déjà liké"
                      );
                  });
              } else {
                return res.status(200).json("ne trouve pas l'user");
              }
            })
            .catch(function (err) {
              return res.status(500).json("Utilisateur Inconnu");
            });
        } else {
          return res.status(404).json("Publication déjà likée");
        }
      })
      .catch(function (err) {
        return res.status(500).json("Publication inconnue");
      });
  },

  dislikePost: function (req, res) {
    const postsId = req.params.id;

    if (postsId == 0) {
      return res.status(400).json("Paramètre post Id introuvable");
    }

    models.Posts.findOne({
      where: { id: postsId },
    })
      .then(function (postFound) {
        if (postFound) {
          models.Users.findOne({
            where: { id: req.user.id },
          })
            .then(function (userFound) {
              if (userFound) {
                models.Likes.findOne({
                  where: {
                    UsersId: userFound.id,
                    PostsId: postFound.id,
                    Dislike: 1,
                  },
                })
                  .then(function (isUserAlreadyDisliked) {
                    if (isUserAlreadyDisliked) {
                      models.Likes.update(
                        { Dislike: 0 },
                        {
                          where: {
                            UsersId: userFound.id,
                            PostsId: postFound.id,
                          },
                        }
                      );
                      models.Posts.update(
                        { dislikes: sequelize.literal("dislikes - 1") },
                        { where: { id: postFound.id } }
                      );
                      return res.status(200).json("Dislike supprimé");
                    } else {
                      let newDislikes = models.Likes.create({
                        UsersId: userFound.id,
                        PostsId: postFound.id,
                        Dislike: 1,
                      });
                      models.Posts.update(
                        { dislikes: sequelize.literal("dislikes + 1") },
                        { where: { id: postFound.id } }
                      );
                      return res.status(200).json("Dislike ajouté");
                    }
                  })
                  .catch(function (err) {
                    return res
                      .status(500)
                      .json(
                        "Impossible de vérifier si l'utilisateur à déjà liké"
                      );
                  });
              } else {
                return res.status(200).json("ne trouve pas l'user");
              }
            })
            .catch(function (err) {
              return res.status(500).json("Utilisateur Inconnu");
            });
        } else {
          return res.status(404).json("Publication déjà likée");
        }
      })
      .catch(function (err) {
        return res.status(500).json("Publication inconnue");
      });
  },
};
