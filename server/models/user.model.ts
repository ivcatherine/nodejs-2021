export {};
const { DataTypes } = require('sequelize');
const sequelize = require("../sequelize");
const { GroupModel } = require("./group.model")
const { UserGroupModel } = require("./userGroup.model")

const UserModel = sequelize.define('users', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    login: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
});

UserModel.belongsToMany(GroupModel, { through: UserGroupModel, as:'userId' })
GroupModel.belongsToMany(UserModel, { through: UserGroupModel, as: 'groupId' })

module.exports = { UserModel };