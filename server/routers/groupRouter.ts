export {}
const express = require("express");
const { getAllGroups, getGroupById, createGroup, removeGroup, updateGroup } = require('../services/groupService');
const { groupUpdateSchema, groupCreateSchema, groupGetSchema, groupDeleteSchema, validator } = require('../utils/validation');
const groupRouter = express.Router();

groupRouter.get('/', validator.query(groupGetSchema), async (req, res) => {
    const { id } = req.query;
    if (!!id) {     
        const group = await getGroupById(id);
        if (!group) {
            res.status(404).json({errors: ['group not found']});
        }
        res.status(200).json(group);
    }

    const groups = await getAllGroups();
    res.status(200).json(groups);
});

groupRouter.post('/', validator.body(groupCreateSchema), async (req, res) => {
    const { name, permissions } = req.body;

    const group = await createGroup({ name, permissions });
    res.status(200).json(group);
});

groupRouter.put('/', validator.body(groupUpdateSchema), async (req, res) => {
    const {  id, name, permissions } = req.body;

    const group = await updateGroup({  id, name, permissions });    
    res.status(200).json(group);
});

groupRouter.delete('/', validator.body(groupDeleteSchema), async (req, res) => {
    const { id } = req.body;

    await removeGroup(id);
    res.status(200).json({ deletedId: id});
});

module.exports = {
    groupRouter
}