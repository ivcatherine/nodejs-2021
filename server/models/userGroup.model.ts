export {};
const { DataTypes } = require('sequelize');
const sequelize = require("../sequelize");

const UserGroupModel = sequelize.define('userGroups', {
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    groupId: {
      type: DataTypes.UUID,
      allowNull: false
    },
});
UserGroupModel.sync()
module.exports = { UserGroupModel };