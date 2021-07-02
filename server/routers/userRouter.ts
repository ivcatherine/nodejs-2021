export {}
const express = require("express");
const checkToken = require("../utils/tokenChecker");
const { UserModel } = require('../models/user.model');
const { UserGroupModel } = require('../models/userGroup.model');
const UserService = require('../services/userService');
const { userUpdateSchema, userCreateSchema, userIdSchema, userSearchSchema, validator } = require('../utils/validation');
const userRouter = express.Router();
const userService = new UserService(UserModel, UserGroupModel);

userRouter.get('/', checkToken, validator.query(userIdSchema), async (req, res, next) => {
    const { id } = req.query;
    try{
        const user = await userService.getUserById(id);
        if (user) {
            res.status(200).json(user);
        } else {
            next({ status: 404, messages: ['User not found']})
        }
    } catch(err) {
        next(err)
    }
});

userRouter.get('/search', checkToken, validator.query(userSearchSchema), async (req, res, next) => {
    const { starts_with, limits } = req.query;
    try{
        if (starts_with && limits) {
            const userList = await userService.getUserListByLogin(starts_with, limits);
            res.status(200).json(userList);
        }
    } catch(err) {
        next(err)
    }
});

userRouter.post('/addUsersToGroup', checkToken, async (req, res, next) => {
    const { groupId, userIds } = req.body
    try{
        const userGroupRecords = await userService.addUsersToGroup(groupId, userIds)
        res.status(200).json(userGroupRecords);
    } catch(err) {
        next(err)
    }
})

userRouter.post('/', checkToken, validator.body(userCreateSchema), async (req, res, next) => {
    const { login, password, age } = req.body;
    try{
        const user = await userService.createUser({ login, password, age });
        res.status(200).json(user);
    } catch(err) {
        next(err)
    }
});

userRouter.put('/', checkToken, validator.body(userUpdateSchema), async (req, res, next) => {
    const {  id, login, password, age } = req.body;
    try{
        const user = await userService.updateUser({  id, login, password, age });    
        res.status(200).json(user);
    } catch(err) {
        next(err)
    }
});

userRouter.delete('/', checkToken, validator.body(userIdSchema), async (req, res, next) => {
    const { id } = req.body;
    try{
        await userService.removeUser(id);
        res.status(200).json({ deletedId: id});
    } catch(err) {
        next(err)
    }
});

module.exports = {
    userRouter
}