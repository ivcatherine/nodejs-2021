export {};
const { DataTypes } = require('sequelize');
const sequelize = require("../sequelize");

const GroupModel = sequelize.define('groups', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    permissions: {
      type: DataTypes.ARRAY(DataTypes.ENUM({
        values: ['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES']
      })),
      allowNull: false
    },
});

module.exports = { GroupModel };