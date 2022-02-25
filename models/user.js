'use strict';
const {
  Model
} = require('sequelize');

const bcrypt = require("bcryptjs")
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasOne(models.Profile, { foreignKey: 'profileId' })
      User.hasMany(models.Item, {foreignKey: 'ownerId', sourceKey: 'id'})
    }
  }
  User.init({
    username: 
    { type: DataTypes.STRING, 
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Username is required"
        }
      }
    },
    phone: { type: DataTypes.STRING, 
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Phone number is required"
        }
      }
    },
    email: { type: DataTypes.STRING, 
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "email is required"
        }
      }
    },
    password: { type: DataTypes.STRING, 
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Password is required"
        }
      }
    },
    type: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate(data){
        const salt = bcrypt.genSaltSync(8);
        const hash = bcrypt.hashSync(data.password, salt);
        data.password = hash
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};