const { userSchema, userIdSchema, userSearchSchema } = require('./utils/validation');
const joiValidator = require('express-joi-validation');
const { createUser, getUserById, getUserListByLogin, removeUser, updateUser } = require('./services/userService');
const express = require('express');

const validator = joiValidator.createValidator({passError: true});
export const app = express();

app.use(express.json());

app.get('/user', validator.query(userIdSchema), async (req, res) => {
    const { id } = req.query;

    const user = await getUserById(id);
    if (!user) {
        res.status(404).json({errors: ['user not found']})
    }
    res.status(200).json(user);
});

// REWRITE TO DB
app.get('/user/search', validator.query(userSearchSchema), (req, res) => {
    const { starts_with, limits } = req.query;

    const userList = getUserListByLogin(starts_with, limits);
    res.status(200).json(userList);
});

app.post('/user', validator.body(userSchema), async (req, res) => {
    const { id, login, password, age } = req.body;

    const user = await getUserById(id);
    if (!user) {
        await createUser({ id, login, password, age, isDeleted: false });
    }
    res.sendStatus(200);
});

app.put('/user', validator.body(userSchema), async (req, res) => {
    const {  id, login, password, age } = req.body;

    await updateUser({  id, login, password, age, isDeleted: false });
    res.sendStatus(200);
});

app.delete('/user', validator.body(userIdSchema), async (req, res) => {
    const { id } = req.body;

    await removeUser(id);
    res.sendStatus(200);
});

app.use((err, req, res, next) => {
    const { details } = err.error;
    const errorMessages = details.map(item => item.message)
    
    res.status(400).json({"errors": errorMessages})
});