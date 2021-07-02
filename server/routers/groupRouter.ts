export {}
const express = require("express");
const checkToken = require("../utils/tokenChecker");
const GroupService = require('../services/groupService');
const { GroupModel } = require('../models/group.model');
const { UserGroupModel } = require('../models/userGroup.model');
const { groupUpdateSchema, groupCreateSchema, groupGetSchema, groupDeleteSchema, validator } = require('../utils/validation');
const groupRouter = express.Router();
const groupService = new GroupService(GroupModel, UserGroupModel);

groupRouter.get('/', checkToken, validator.query(groupGetSchema), async (req, res, next) => {
    const { id } = req.query;
    try{
        if (id) {
                const group = await groupService.getGroupById(id);
                if (!group) {
                    next({status: 404, messages: ['Group not found']});
                }
                res.status(200).json(group);
        }
        const groups = await groupService.getAllGroups();
        if (!groups) {
            next({ status: 404,  messages: ['No groups found']});
        }
        res.status(200).json(groups);
    } catch(err){
        next(err)
    }
});

groupRouter.post('/', checkToken, validator.body(groupCreateSchema), async (req, res, next) => {
    const { name, permissions } = req.body;
    try{
        const group = await groupService.createGroup({ name, permissions });
        res.status(200).json(group);
    }catch(err){
        next(err)
    }
});

groupRouter.put('/', checkToken, validator.body(groupUpdateSchema), async (req, res, next) => {
    const {  id, name, permissions } = req.body;
    try{
        const group = await groupService.updateGroup({  id, name, permissions });    
        res.status(200).json(group);
    }catch(err){
        next(err)
    }
});

groupRouter.delete('/', checkToken, validator.body(groupDeleteSchema), async (req, res, next) => {
    const { id } = req.body;
    try{
        await groupService.removeGroup(id);
        res.status(200).json({ deletedId: id});
    }catch(err){
        next(err)
    }
});

module.exports = {
    groupRouter
}