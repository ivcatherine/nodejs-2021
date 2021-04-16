export {};
const { UserModel } = require('../models/user.model');
const { Op } = require("sequelize");
const { v4: uuidv4 } = require('uuid');

type User = {
    id: string;
    login: string;
    password: string;
    age: number;
    isDeleted: boolean;
};

const getUserById = async (id: string) => {
    const user = await UserModel.findByPk(id)
    if(user){
        return user.toJSON();
    }
    return null
};

const getUserListByLogin = async (substring: string, limits: number) => {
    const userList = await UserModel.findAll({ limit: limits, where : { isDeleted: false, login: { [Op.startsWith]: substring, } }})
    return userList
};

const updateUser = async (user: User) => {
    const updatedUser = await UserModel.update({...user}, { where: { id: user.id }})
    return updatedUser;
};

const createUser = async (user: User) => {
    const createdUser = await UserModel.create({
        login: user.login,
        age: user.age,
        password: user.password,
        id: uuidv4(),
        isDeleted: false
    });
    return createdUser.toJSON();
};

const removeUser = async (id: string) => {
    const deletedUser = await UserModel.update({isDeleted: true}, { where: { id }});
    return deletedUser;
};

module.exports = {
    getUserById,
    createUser,
    removeUser,
    updateUser,
    getUserListByLogin,
};
