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
                  },
                })
                  .then(function (userOpinion) {
                    // vérifie la présence d'un ligne dans la bdd avec un précédent LIKE/Dislike de l'utilisateur sur le post et met à jour celui-ci
                    if (
                      userOpinion &&
                      userOpinion.Like === 0 &&
                      userOpinion.Dislike === 1
                    ) {
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
                      models.Users.update(
                        { all_dislikes: sequelize.literal("all_dislikes - 1") },
                        { where: { id: postFound.UserId } }
                      );
                      return res.status(200).json("User old dislike removed");
                    } else if (
                      userOpinion &&
                      userOpinion.Like === 0 &&
                      userOpinion.Dislike === 0
                    ) {
                      models.Likes.update(
                        { Like: 1 },
                        {
                          where: {
                            UsersId: userFound.id,
                            PostsId: postFound.id,
                          },
                        }
                      );
                      models.Posts.update(
                        { likes: sequelize.literal("likes + 1") },
                        { where: { id: postFound.id } }
                      );
                      models.Users.update(
                        { all_likes: sequelize.literal("all_likes + 1") },
                        { where: { id: postFound.UserId } }
                      );
                      return res.status(200).json("User liked it again");
                    } else if (
                      userOpinion &&
                      userOpinion.Like === 1 &&
                      userOpinion.Dislike === 0
                    ) {
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
                      models.Users.update(
                        { all_likes: sequelize.literal("all_likes - 1") },
                        { where: { id: postFound.UserId } }
                      );
                      return res.status(200).json("User old Like removed");
                    } else {
                      newLikes = models.Likes.create({
                        UsersId: userFound.id,
                        PostsId: postFound.id,
                        Like: 1,
                      });
                      models.Posts.update(
                        { likes: sequelize.literal("likes + 1") },
                        { where: { id: postFound.id } }
                      );
                      models.Users.update(
                        { all_likes: sequelize.literal("all_likes + 1") },
                        { where: { id: postFound.UserId } }
                      );
                      return res.status(200).json("User liked it");
                    }
                  })
                  .catch(function (err) {
                    return res.status(500).json(err);
                  });
              } else {
                return res.status(400).json("ne trouve pas l'user");
              }
            })
            .catch(function (err) {
              return res.status(400).json("Utilisateur Inconnu");
            });
        } else {
          return res.status(400).json("Publication déjà likée");
        }
      })
      .catch(function (err) {
        return res.status(400).json("Publication inconnue");
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
                  },
                })
                  .then(function (userOpinion) {
                     // vérifie la présence d'un ligne dans la bdd avec un précédent LIKE/Dislike de l'utilisateur sur le post et met à jour celui-ci
                    if (
                      userOpinion &&
                      userOpinion.Like === 1 &&
                      userOpinion.Dislike === 0
                    ) {
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
                      models.Users.update(
                        { all_likes: sequelize.literal("all_likes - 1") },
                        { where: { id: postFound.UserId } }
                      );
                      return res.status(200).json("User old like removed");
                    } else if (
                      userOpinion &&
                      userOpinion.Like === 0 &&
                      userOpinion.Dislike === 0
                    ) {
                      models.Likes.update(
                        { Dislike: 1 },
                        {
                          where: {
                            UsersId: userFound.id,
                            PostsId: postFound.id,
                          },
                        }
                      );
                      models.Posts.update(
                        { dislikes: sequelize.literal("dislikes + 1") },
                        { where: { id: postFound.id } }
                      );
                      models.Users.update(
                        { all_dislikes: sequelize.literal("all_dislikes + 1") },
                        { where: { id: postFound.UserId } }
                      );
                      return res.status(200).json("User Disliked it again");
                    } else if (
                      userOpinion &&
                      userOpinion.Like === 0 &&
                      userOpinion.Dislike === 1
                    ) {
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
                      models.Users.update(
                        { all_dislikes: sequelize.literal("all_dislikes - 1") },
                        { where: { id: postFound.UserId } }
                      );
                      return res.status(200).json("User old Dislike removed");
                    } else {
                      newLikes = models.Likes.create({
                        UsersId: userFound.id,
                        PostsId: postFound.id,
                        Dislike: 1,
                      });
                      models.Posts.update(
                        { dislikes: sequelize.literal("dislikes + 1") },
                        { where: { id: postFound.id } }
                      );
                      models.Users.update(
                        { all_dislikes: sequelize.literal("all_dislikes + 1") },
                        { where: { id: postFound.UserId } }
                      );
                      return res.status(200).json("Dislike ajouté");
                    }
                  })
                  .catch(function (err) {
                    return res.status(500).json(err);
                  });
              } else {
                return res.status(200).json("ne trouve pas l'user");
              }
            })
            .catch(function (err) {
              return res.status(400).json("Utilisateur Inconnu");
            });
        } else {
          return res.status(400).json("Publication déjà likée");
        }
      })
      .catch(function (err) {
        return res.status(500).json(err);
      });
  },
};
