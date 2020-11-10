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
          res.status(404).json({ error: "User not found" });
        }
      })
      .catch(function (err) {
        return res.status(500).json({ error: "Unable to verify user" });
      });
  },

  listPosts: function (req, res) {
    models.Posts.findAll({
      order: [["createdAt", "DESC"]],
      include: [
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
          return res.status(404).json({ error: "Posts not found" });
        }
      })
      .catch(function (err) {
        res.status(500).json({ error: "invalid request" });
      });
  },

  getOnePost: function (req, res) {
    const idPost = req.params.id;

    if (idPost == null) {
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
          model: models.Users,
          attributes: ["firstname", "lastname", "profil_image"],
        },
      ],
      where: { id: idPost },
    })
      .then(function (onePost) {
        if (!onePost) {
          return res.status(404).json({ error: "Post not found" });
        }
        return res.status(201).json(onePost);
      })
      .catch(function (err) {
        return res.status(500).json({ error: "Post not available" });
      });
  },
};
