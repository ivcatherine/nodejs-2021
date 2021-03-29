const { userSchema, userIdSchema, userSearchSchema } = require("./utils/validation");
const bodyParser = require('body-parser');
const validator = require('express-joi-validation').createValidator({passError: true});
const { usersCollection } = require('./db');
const { createUser, getUserById, getUserListByLogin, removeUser, updateUser } = require('./service');

const PORT = 3000;
const express = require('express');
const app = express();

app.use(bodyParser.json());

app.listen(PORT, err => {
    if (err) {
        return console.error(err);
    }
    return console.log(`server is listening on ${PORT}`);
});

app.get('/', (req, res) => {
    res.json({ ok: true });
});

app.get('/user', validator.query(userIdSchema),(req, res) => {
    const { id } = req.query;

    const user = getUserById(id);
    res.status(200).json(user);
});

app.get('/user/search', validator.query(userSearchSchema), (req, res) => {
    const { starts_with, limits } = req.query;

    const userList = getUserListByLogin(starts_with, limits);
    res.status(200).json(userList);
});

app.post('/user', validator.body(userSchema), (req, res) => {
    const { id, login, password, age } = req.body;

    const user = getUserById(id);
    if (!user) {
        createUser({ id, login, password, age, isDeleted: false });
    }
    res.sendStatus(200);
});

app.put('/user', validator.body(userSchema), (req, res) => {
    const {  id, login, password, age } = req.body;

    updateUser({  id, login, password, age, isDeleted: false });
    res.sendStatus(200);
});

app.delete('/user', validator.body(userIdSchema), (req, res) => {
    const { id } = req.body;

    removeUser(id);
    res.sendStatus(200);
});

app.use((err, req, res, next) => {
    const { details } = err.error;
    const errorMessages = details.map(item => item.message)
    
    res.status(400).json({"errors": errorMessages})
})