export {};
const { UserModel } = require('../models/user.model');
const { UserGroupModel } = require('../models/userGroup.model');
const sequelize = require('../sequelize');
const { Op } = require("sequelize");
const { v4: uuidv4 } = require('uuid');
import { User } from '../types/index'

const getUserById = async (id: string) => {
    const user = await UserModel.findByPk(id)
    if(user){
        return user.toJSON();
    }
    return null;
};

const getUserListByLogin = async (substring: string, limits: number) => {
    const userList = await UserModel.findAll({ limit: limits, where : { isDeleted: false, login: { [Op.startsWith]: substring, } }})
    return userList
};

const updateUser = async (user: User) => {
    const [ _ , updatedUser] = await UserModel.update({...user}, { where: { id: user.id }, returning: true }); 
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
    await UserModel.update({isDeleted: true}, { where: { id }});
    return null;
};

const addUsersToGroup = async (groupId: string, userIds: string[]) => {
    let transaction;
    
    try{
        transaction = await sequelize.transaction();
        for (const userId of userIds) {
            UserGroupModel.create({userId, groupId});
        }
        await transaction.commit();
    } catch (err) {
        if (transaction) {
            await transaction.rollback();
        }
    }
};

module.exports = {
    getUserById,
    createUser,
    removeUser,
    updateUser,
    getUserListByLogin,
    addUsersToGroup,
};
