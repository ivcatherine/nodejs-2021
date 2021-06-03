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
            res.json({errors: ['group not found']}).status(404)
        }
        res.json(group).status(200);
    }
    const groups = await getAllGroups()
    res.json(groups).status(200)
});

groupRouter.post('/', validator.body(groupCreateSchema), async (req, res) => {
    const { name, permissions } = req.body;

    const group = await createGroup({ name, permissions });
    res.json(group).status(200);
});

groupRouter.put('/', validator.body(groupUpdateSchema), async (req, res) => {
    const {  id, name, permissions } = req.body;

    const group = await updateGroup({  id, name, permissions });    
    res.json(group).status(200);
});

groupRouter.delete('/', validator.body(groupDeleteSchema), async (req, res) => {
    const { id } = req.body;

    await removeGroup(id);
    res.json({ deletedId: id}).status(200);
});

module.exports = {
    groupRouter
}