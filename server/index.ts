const bodyParser = require('body-parser');
import { usersCollection } from "./db";
import { createUser, getUserById, getUserListByLogin, removeUser, updateUser } from "./service";

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

app.get('/', function(req, res){
    res.json({ ok: true });
});

app.get('/user', function(req, res){
    const { id } = req.query;
    
    if (id) {
        const user = getUserById(id);
        res.status(200).json(user);
    } else {
        res.status(200).json(usersCollection);
    }
});

app.get('/user/search', function(req, res){
    const { starts_with, limits } = req.query;
    const userList = getUserListByLogin(starts_with, limits)
    res.status(200).json(userList)
});

app.post('/user', function(req, res){
    const { id, login, password, age } = req.body;

    const user = getUserById(id)
    if (!user) { 
        createUser({ id, login, password, age, isDeleted: false});
    }
    res.sendStatus(200);
});

app.put('/user', function(req, res){
    const {  id, login, password, age } = req.body;

    updateUser({  id, login, password, age, isDeleted: false });
    res.sendStatus(200);
});

app.delete('/user', function(req, res){
    const { id } = req.body;

    removeUser(id);
    res.sendStatus(200);
});
