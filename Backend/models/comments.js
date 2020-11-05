'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      models.Comments.belongsTo(models.Users,{
        foreignKey: {
          allowNull: false,
        },
      });
    
      models.Comments.belongsTo(models.Posts,{
        foreignKey: {
          allowNull: false,
        },
      });
    }
  };
  Comments.init({
    idPOSTS: DataTypes.INTEGER,
    idUSERS: DataTypes.INTEGER,
    content: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Comments',
  });
  return Comments;
};