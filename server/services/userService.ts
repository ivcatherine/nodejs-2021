export {};
const { logAndFormat } = require("../utils/logger");
const { UserModel } = require('../models/user.model');
const { UserGroupModel } = require('../models/userGroup.model');
const sequelize = require('../sequelize');
const { Op } = require("sequelize");
const { v4: uuidv4 } = require('uuid');
import { User } from '../types/index'

const loginUser = async (login: string, password: string) => {
    try{
        const user = await UserModel.findOne({ where: { login, password }});

        return user ?? null
    }catch(err){
        logAndFormat('loginUser', [login, password], err)
    }
}

const getUserById = async (id: string) => {
    try{
        const user = await UserModel.findByPk(id);

        return user.toJSON() ?? null;
    }catch(err){
        logAndFormat('getUserById', [id], err)
    }

};

const getUserListByLogin = async (substring: string, limits: number) => {
    try{
        const userList = await UserModel.findAll({ limit: limits, where : { isDeleted: false, login: { [Op.startsWith]: substring, } }})
        
        return userList
    }catch(err){
        logAndFormat('getUserListByLogin', [substring, limits], err)
    }
};

const updateUser = async (user: User) => {
    try{
        const [ _ , updatedUser] = await UserModel.update({...user}, { where: { id: user.id }, returning: true }); 
        
        return updatedUser;
    }catch(err){
        logAndFormat('updateUser', [user], err)
    }
};

const createUser = async (user: User) => {
    try{
        const createdUser = await UserModel.create({
            login: user.login,
            age: user.age,
            password: user.password,
            id: uuidv4(),
            isDeleted: false
        });

        return createdUser.toJSON();
    }catch(err){
        logAndFormat('createUser', [user], err)
    }
};

const removeUser = async (id: string) => {
    try{
        await UserModel.update({isDeleted: true}, { where: { id }});
        
        return null;
    }catch(err){
        logAndFormat('removeUser', [id], err)
    }
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
        logAndFormat('addUsersToGroup', [groupId, userIds], err)
    }
};

module.exports = {
    loginUser,
    getUserById,
    createUser,
    removeUser,
    updateUser,
    getUserListByLogin,
    addUsersToGroup,
};
