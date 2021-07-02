export {};
const { logAndFormat } = require("../utils/logger");
const { v4: uuidv4 } = require('uuid');
import { Group } from '../types/index'

class GroupService {
    groupModel: any;
    userGroupModel: any; 

    constructor(groupModel, userGroupModel){
        this.groupModel = groupModel;
        this.userGroupModel = userGroupModel;
    }
    getGroupById = async (id: string) => {
        try{
            const group = await this.groupModel.findByPk(id)
    
            return group.toJSON() ?? null;
        }catch(err){
            logAndFormat('getGroupById', [id], err)
        }
    };

    getAllGroups = async () => {
        try{
            const groupList = await this.groupModel.findAll()
            
            return groupList
        }catch(err){
            logAndFormat('getAllGroups', [], err)
        }
    };

    updateGroup = async (group: Group) => {
        try{
            const [ _ , updatedGroup] = await this.groupModel.update({ ...group }, { where: { id: group.id }, returning: true })    
            
            return updatedGroup;
        }catch(err){
            logAndFormat('updateGroup', [group], err)
        }
    };

    createGroup = async (group: Group) => {
        try{
            const createdGroup = await this.groupModel.create({
                name: group.name,
                permissions: group.permissions,
                id: uuidv4()
            });
            
            return createdGroup.toJSON();
        }catch(err){
            logAndFormat('createGroup', [group], err)
        }
    };

    removeGroup = async (id: string) => {
        try{
            await this.groupModel.destroy({ where: { id }});
            await this.userGroupModel.destroy({ where: {groupId : id}})
            
            return null;
        }catch(err){
            logAndFormat('removeGroup', [id], err)
        }
    };
}

module.exports = GroupService;
