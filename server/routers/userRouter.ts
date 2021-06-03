export {}
const express = require("express");
const { createUser, getUserById, getUserListByLogin, removeUser, updateUser } = require('../services/userService');
const { userUpdateSchema, userCreateSchema, userIdSchema, userSearchSchema, validator } = require('../utils/validation');
const userRouter = express.Router();

userRouter.get('/', validator.query(userSearchSchema), async (req, res) => {
    const { id, starts_with, limits } = req.query;
    if (!!id) {     
        const user = await getUserById(id);
        if (!user) {
            res.json({errors: ['user not found']}).status(404)
        }
        res.json(user).status(200);
    }
    if (!!starts_with || !!limits) {
        const userList = await getUserListByLogin(starts_with, limits);
        res.json(userList).status(200);
    }
});

userRouter.post('/', validator.body(userCreateSchema), async (req, res) => {
    const { login, password, age } = req.body;

    const user = await createUser({ login, password, age });
    res.json(user).status(200);
});

userRouter.put('/', validator.body(userUpdateSchema), async (req, res) => {
    const {  id, login, password, age } = req.body;

    const user = await updateUser({  id, login, password, age });    
    res.json(user).status(200);
});

userRouter.delete('/', validator.body(userIdSchema), async (req, res) => {
    const { id } = req.body;

    await removeUser(id);
    res.json({ deletedId: id}).status(200);
});

module.exports = {
    userRouter
}