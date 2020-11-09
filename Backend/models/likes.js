"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Likes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // models.Users.belongsToMany(models.Posts, {
      //   through: models.Likes,
      //   foreignKey: "UsersId",
      //   otherKey: "PostsId",
      // });
      // models.Posts.belongsToMany(models.Users, {
      //   through: models.Likes,
      //   foreignKey: "PostsId",
      //   otherKey: "UsersId",
      // });
      models.Likes.belongsTo(models.Users, {
        foreignKey: "UsersId",
        as: "Users",
      });
      models.Likes.belongsTo(models.Posts, {
        foreignKey: "PostsId",
        as: "Posts",
      });
    }
  }
  Likes.init(
    {
      PostsId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Posts",
          key: "id",
        },
      },
      UsersId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
      },
      Like: DataTypes.INTEGER,
      Dislike: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Likes",
    }
  );
  return Likes;
};
