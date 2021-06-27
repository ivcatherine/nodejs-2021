export {}
const express = require("express");
const { createUser, getUserById, getUserListByLogin, addUsersToGroup, removeUser, updateUser } = require('../services/userService');
const { userUpdateSchema, userCreateSchema, userIdSchema, userSearchSchema, validator } = require('../utils/validation');
const userRouter = express.Router();

userRouter.get('/', validator.query(userIdSchema), async (req, res, next) => {
    const { id } = req.query;
    try{
        const user = await getUserById(id);
        if (user) {
            res.status(200).json(user);
        } else {
            next({ status: 404, messages: ['User not found']})
        }
    } catch(e) {
        next(e);
    }
});

userRouter.get('/search', validator.query(userSearchSchema), async (req, res) => {
    const { starts_with, limits } = req.query;

    if (starts_with && limits) {
        const userList = await getUserListByLogin(starts_with, limits);
        res.status(200).json(userList);
    }
});

userRouter.post('/addUsersToGroup', async (req, res) => {
    const { groupId, userIds } = req.body
    
    const userGroupRecords = await addUsersToGroup(groupId, userIds)
    res.status(200).json(userGroupRecords);
})

userRouter.post('/', validator.body(userCreateSchema), async (req, res) => {
    const { login, password, age } = req.body;

    const user = await createUser({ login, password, age });
    res.status(200).json(user);
});

userRouter.put('/', validator.body(userUpdateSchema), async (req, res) => {
    const {  id, login, password, age } = req.body;

    const user = await updateUser({  id, login, password, age });    
    res.status(200).json(user);
});

userRouter.delete('/', validator.body(userIdSchema), async (req, res) => {
    const { id } = req.body;

    await removeUser(id);
    res.status(200).json({ deletedId: id});
});

module.exports = {
    userRouter
}