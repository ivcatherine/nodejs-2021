export {};
const { logAndFormat } = require("../utils/logger");
const sequelize = require('../sequelize');
const { Op } = require("sequelize");
const { v4: uuidv4 } = require('uuid');
import { User } from '../types/index'

class UserService{
    userModel: any;
    userGroupModel: any;

    constructor(userModel, userGroupModel){
        this.userModel = userModel;
        this.userGroupModel = userGroupModel;
    };

    loginUser = async (login: string, password: string) => {
        try{
            const user = await this.userModel.findOne({ where: { login, password }});
    
            return user ?? null
        }catch(err){
            logAndFormat('loginUser', [login, password], err)
        }
    };
    getUserById = async (id: string) => {
        try{
            const user = await this.userModel.findByPk(id);
    
            return user.toJSON() ?? null;
        }catch(err){
            logAndFormat('getUserById', [id], err)
        }
    
    };
    getUserListByLogin = async (substring: string, limits: number) => {
        try{
            const userList = await this.userModel.findAll({ limit: limits, where : { isDeleted: false, login: { [Op.startsWith]: substring, } }})
            
            return userList
        }catch(err){
            logAndFormat('getUserListByLogin', [substring, limits], err)
        }
    };
    updateUser = async (user: User) => {
        try{
            const [ _ , updatedUser] = await this.userModel.update({...user}, { where: { id: user.id }, returning: true }); 
            
            return updatedUser;
        }catch(err){
            logAndFormat('updateUser', [user], err)
        }
    };
    createUser = async (user: User) => {
        try{
            const createdUser = await this.userModel.create({
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
    removeUser = async (id: string) => {
        try{
            await this.userModel.update({isDeleted: true}, { where: { id }});
            
            return null;
        }catch(err){
            logAndFormat('removeUser', [id], err)
        }
    };
    addUsersToGroup = async (groupId: string, userIds: string[]) => {
        let transaction;
        
        try{
            transaction = await sequelize.transaction();
            for (const userId of userIds) {
                this.userGroupModel.create({userId, groupId});
            }
            await transaction.commit();
        } catch (err) {
            if (transaction) {
                await transaction.rollback();
            }
            logAndFormat('addUsersToGroup', [groupId, userIds], err)
        }
    };
};

module.exports = UserService;
