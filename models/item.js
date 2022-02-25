'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Item.belongsTo(models.User, {foreignKey: 'ownerId'})
    }
  }
  Item.init({
    name: { type: DataTypes.STRING, 
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Name of product is required"
        }
      }
    },
    price: { type: DataTypes.INTEGER, 
      allowNull: false,
      validate: {
        notNull: {
          msg: "Price is required"
        },
        min: {
          args: [1000],
          msg: "Price not meet minimum required"
        }
      }
    },
    description: { type: DataTypes.STRING, 
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Description is required"
        }
      }
    },
    picture: { type: DataTypes.STRING, 
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Picture is required"
        }
      }
    },
    ownerId: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Item',
  });
  return Item;
};