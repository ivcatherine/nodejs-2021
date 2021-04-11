import { DataTypes, Sequelize } from 'sequelize';
import { app } from './app'
import { testSequalizer } from './utils/sequalizer-utils';

const PORT = 3000;

export const sequelize = new Sequelize('nodejs-2021', 'postgres', 'qwerty1234', {
    host: 'localhost',
    dialect: 'postgres'
})

testSequalizer()

app.listen(PORT, err => {
    if (err) {
        return console.error(err);
    }
    return console.log(`server is listening on ${PORT}`);
});

// TODO: move it to models
export const User = sequelize.define('users', {
    id: {
      type: DataTypes.STRING,
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