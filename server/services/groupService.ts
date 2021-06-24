export {};
const { GroupModel } = require('../models/group.model');
const { UserGroupModel } = require('../models/userGroup.model');
const { v4: uuidv4 } = require('uuid');
import { Group } from '../types/index'

const getGroupById = async (id: string) => {
    const user = await GroupModel.findByPk(id)
    if(user){
        return user.toJSON();
    }
    return null
};

const getAllGroups = async () => {
    const groupList = await GroupModel.findAll()
    return groupList
};

const updateGroup = async (group: Group) => {
    const [ _ , updatedGroup] = await GroupModel.update({ ...group }, { where: { id: group.id }, returning: true })    
    return updatedGroup;
};

const createGroup = async (group: Group) => {
    const createdGroup = await GroupModel.create({
        name: group.name,
        permissions: group.permissions,
        id: uuidv4()
    });
    return createdGroup.toJSON();
};

const removeGroup = async (id: string) => {
    await GroupModel.destroy({ where: { id }});
    await UserGroupModel.destroy({ where: {groupId : id}})
    return null;
};

module.exports = {
    getGroupById,
    getAllGroups,
    updateGroup,
    createGroup,
    removeGroup
};
