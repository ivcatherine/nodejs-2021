export {}
const express = require("express");
const loginRouter = express.Router();
const jwt = require('jsonwebtoken');
const { loginUser } = require("../services/userService")

loginRouter.post('/', async (req, res, next) => {
    const { login, password } = req.body;
    
    try{
        const user = await loginUser(login, password);
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