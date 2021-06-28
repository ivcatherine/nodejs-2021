export {};
const { logAndFormat } = require("../utils/logger");
const { GroupModel } = require('../models/group.model');
const { UserGroupModel } = require('../models/userGroup.model');
const { v4: uuidv4 } = require('uuid');
import { Group } from '../types/index'

const getGroupById = async (id: string) => {
    try{
        const group = await GroupModel.findByPk(id)

        return group.toJSON() ?? null;
    }catch(err){
        logAndFormat('getGroupById', [id], err)
    }
};

const getAllGroups = async () => {
    try{
        const groupList = await GroupModel.findAll()
        
        return groupList
    }catch(err){
        logAndFormat('getAllGroups', [], err)
    }
};

const updateGroup = async (group: Group) => {
    try{
        const [ _ , updatedGroup] = await GroupModel.update({ ...group }, { where: { id: group.id }, returning: true })    
        
        return updatedGroup;
    }catch(err){
        logAndFormat('updateGroup', [group], err)
    }
};

const createGroup = async (group: Group) => {
    try{
        const createdGroup = await GroupModel.create({
            name: group.name,
            permissions: group.permissions,
            id: uuidv4()
        });
        
        return createdGroup.toJSON();
    }catch(err){
        logAndFormat('createGroup', [group], err)
    }
};

const removeGroup = async (id: string) => {
    try{
        await GroupModel.destroy({ where: { id }});
        await UserGroupModel.destroy({ where: {groupId : id}})
        
        return null;
    }catch(err){
        logAndFormat('removeGroup', [id], err)
    }
};

module.exports = {
    getGroupById,
    getAllGroups,
    updateGroup,
    createGroup,
    removeGroup
};
