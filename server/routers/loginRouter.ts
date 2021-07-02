export {}
const express = require("express");
const loginRouter = express.Router();
const { UserModel } = require('../models/user.model');
const { UserGroupModel } = require('../models/userGroup.model');
const UserService = require('../services/userService');
const userService = new UserService(UserModel, UserGroupModel);
const jwt = require('jsonwebtoken');

loginRouter.post('/', async (req, res, next) => {
    const { login, password } = req.body;
    
    try{
        const user = await userService.loginUser(login, password);
        if (user) {
            const token = jwt.sign({ login }, 'secret', { expiresIn: 180 });
            res.send(token);
        } else {
            next({ status: 403, messages: ['Invalid login or/and password']})
        }
    } catch(err) {
        next(err)
    }

});


module.exports = {
    loginRouter
}