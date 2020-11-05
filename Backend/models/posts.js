"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Posts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Posts.hasOne(models.Comments);
      models.Posts.belongsTo(models.Users, {
        foreignKey: {
          allowNull: false,
        },
      });
    }
  }
  Posts.init(
    {
      title: DataTypes.STRING,
      image_post: DataTypes.STRING,
      likes: DataTypes.INTEGER,
      dislikes: DataTypes.INTEGER,
      all_comments: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Posts",
    }
  );
  return Posts;
};
