export {}
const express = require("express");
const checkToken = require("../utils/tokenChecker");
const { getAllGroups, getGroupById, createGroup, removeGroup, updateGroup } = require('../services/groupService');
const { groupUpdateSchema, groupCreateSchema, groupGetSchema, groupDeleteSchema, validator } = require('../utils/validation');
const groupRouter = express.Router();

groupRouter.get('/', checkToken, validator.query(groupGetSchema), async (req, res, next) => {
    const { id } = req.query;
    try{
        if (id) {
                const group = await getGroupById(id);
                if (!group) {
                    next({status: 404, messages: ['Group not found']});
                }
                res.status(200).json(group);
        }
        const groups = await getAllGroups();
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
        const group = await createGroup({ name, permissions });
        res.status(200).json(group);
    }catch(err){
        next(err)
    }
});

groupRouter.put('/', checkToken, validator.body(groupUpdateSchema), async (req, res, next) => {
    const {  id, name, permissions } = req.body;
    try{
        const group = await updateGroup({  id, name, permissions });    
        res.status(200).json(group);
    }catch(err){
        next(err)
    }
});

groupRouter.delete('/', checkToken, validator.body(groupDeleteSchema), async (req, res, next) => {
    const { id } = req.body;
    try{
        await removeGroup(id);
        res.status(200).json({ deletedId: id});
    }catch(err){
        next(err)
    }
});

module.exports = {
    groupRouter
}